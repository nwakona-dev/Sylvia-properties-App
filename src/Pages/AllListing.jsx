import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
/* Added CheckCircle to imports */
import { MapPin, Bed, Bath, Ruler, Search, RotateCw, CheckCircle } from "lucide-react";
import { Fade, Slide } from "react-awesome-reveal";
import { supabase } from "../supabaseClient";
import PropertyModal from "../Components/PropertyModal"; 
import "../Styles/allListing.css";

const AllListings = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all"); 
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        setLoading(true);
        let query = supabase
        .from("properties")
        .select("*")
        .eq("is_draft", false);
        
        if (filter !== "all") {
            query = query.eq("status", filter); 
        }

        const { data, error } = await query.order("created_at", { ascending: false });
        if (!error) setProperties(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProperties();
    }, [filter]);

    /* Prevent opening modal if property is sold */
    const openModal = (property) => {
        if (property.is_sold) return; 
        setSelectedProperty(property);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProperty(null);
        setIsModalOpen(false);
    };

    const filteredProperties = properties.filter(
        (prop) =>
        prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatPrice = (price) => price?.toLocaleString();

    const filterOptions = [
        { label: "All", value: "all" },
        { label: "Shortlet", value: "For Rent" },
        { label: "Sale", value: "For Sale" },
    ];

    return (
        <section className="allProperties-section">
            <Slide direction="up" delay={100}>
                <div className="properties-header">
                    <span className="section-eyebrow">All Listings</span>
                    <h2 className="section-title">Browse All Properties</h2>
                    <p className="section-subtitle">
                        Explore our full portfolio of curated luxury properties.
                    </p>

                    <div className="al-search-container">
                        <div className="al-search-box">
                            <Search size={18} className="al-search-icon" />
                            <input
                                type="text"
                                placeholder="Search location or name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="al-filter-group">
                            {filterOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    className={`al-filter-btn ${filter === opt.value ? "active" : ""}`}
                                    onClick={() => setFilter(opt.value)}
                                >
                                    {opt.label}
                                </button>
                            ))}

                            <button 
                                className={`al-refresh-btn ${loading ? "spinning" : ""}`} 
                                onClick={fetchProperties}
                                disabled={loading}
                                title="Refresh Listings"
                            >
                                <RotateCw size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </Slide>

            <div className="properties-grid">
                {loading ? (
                    <div className="loading-state">
                        <RotateCw size={32} className="spinning" />
                        <p>Loading Properties...</p>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <p className="no-results">No properties found.</p>
                ) : (
                    filteredProperties.map((property, index) => (
                        <Fade key={property.id} delay={index * 50} duration={800} triggerOnce={false}>
                            <motion.article
                                className={`property-card ${property.is_sold ? "sold" : ""}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                onClick={() => openModal(property)}
                                style={{ cursor: property.is_sold ? "not-allowed" : "pointer" }}>
                                <div className="property-image">
                                    <img 
                                        src={property.image_urls?.[0]} 
                                        alt={property.title} 
                                        className={property.is_sold ? "grayscale" : ""}
                                    />
                                    <span className="property-price">₦{formatPrice(property.price)}</span>
                                    
                                    {/* SOLD BADGE */}
                                    {property.is_sold && (
                                        <span className="property-sold-badge">
                                            <CheckCircle size={14} /> Sold
                                        </span>
                                    )}

                                    <div className="property-overlay">
                                        <button 
                                            className={`property-cta ${property.is_sold ? "disabled" : ""}`}
                                            disabled={property.is_sold}
                                        >
                                            {property.is_sold ? "Unavailable" : "View Details"}
                                        </button>
                                    </div>
                                </div>

                                <div className="property-content">
                                    <h3 className="property-title">{property.title}</h3>
                                    <div className="property-location">
                                        <MapPin size={16} /> {property.city}, {property.address}
                                    </div>
                                    <div className="property-meta">
                                        <span><Bed size={16} /> {property.bedroom} Beds</span>
                                        <span><Bath size={16} /> {property.bathroom} Baths</span>
                                        <span><Ruler size={16} /> {property.size}</span>
                                    </div>
                                </div>
                            </motion.article>
                        </Fade>
                    ))
                )}
            </div>

            <PropertyModal 
            property={selectedProperty}
            isOpen={isModalOpen} 
            onClose={closeModal} />
        </section>
    );
};

export default AllListings;