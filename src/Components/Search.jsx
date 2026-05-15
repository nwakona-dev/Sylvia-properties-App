    import React, { useState, useEffect } from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import {
    MapPin,
    Home,
    Banknote,
    SlidersHorizontal,
    X,
    ImageOff,
    CheckCircle,
    Bed,
    Bath,
    Square,
    } from "lucide-react";
    import { supabase } from "../supabaseClient"; 
    import PropertyModal from "./PropertyModal";
    import "../App.css";

    const Search = () => {
    const [openFilters, setOpenFilters] = useState(false);

    // Search inputs
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("Any Type");
    const [priceRange, setPriceRange] = useState("Any Price");
    const [bedrooms, setBedrooms] = useState("Any");
    const [bathrooms, setBathrooms] = useState("Any");

    // Results
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Modal state
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Reset results when all inputs are default/empty
    useEffect(() => {
        const isDefault =
        location === "" &&
        propertyType === "Any Type" &&
        priceRange === "Any Price" &&
        bedrooms === "Any" &&
        bathrooms === "Any";

        if (isDefault) {
        setResults([]);
        setHasSearched(false);
        }
    }, [location, propertyType, priceRange, bedrooms, bathrooms]);

    const getPriceFilter = () => {
        switch (priceRange) {
        case "₦100M – ₦300M": return { min: 100_000_000, max: 300_000_000 };
        case "₦300M – ₦1B": return { min: 300_000_000, max: 1_000_000_000 };
        case "₦1B+": return { min: 1_000_000_000, max: null };
        default: return {};
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        setHasSearched(true);
        try {
        let query = supabase.from("properties").select("*");

        if (location) query = query.ilike("city", `%${location}%`);
        if (propertyType !== "Any Type") query = query.eq("type", propertyType);

        const priceFilter = getPriceFilter();
        if (priceFilter.min != null) query = query.gte("price", priceFilter.min);
        if (priceFilter.max != null) query = query.lte("price", priceFilter.max);

        if (bedrooms !== "Any") {
            const b = parseInt(bedrooms);
            if (!isNaN(b)) query = query.gte("bedroom", b);
        }
        if (bathrooms !== "Any") {
            const b = parseInt(bathrooms);
            if (!isNaN(b)) query = query.gte("bathroom", b);
        }

        const { data, error } = await query;
        if (error) throw error;
        setResults(data || []);
        } catch (err) {
        console.error("Search failed:", err.message);
        alert("Something went wrong. Please try again.");
        } finally {
        setLoading(false);
        }
    };

    const openModal = (property) => {
        setSelectedProperty(property);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProperty(null);
        setIsModalOpen(false);
    };

    return (
        <>
        {/* MAIN SEARCH */}
        <motion.section
            className="search"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="search-container">
            <div className="search-box">
                {/* Location */}
                <div className="search-field">
                <label>Location</label>
                <div className="input-wrapper">
                    <MapPin size={18} />
                    <input
                    placeholder="Ikoyi, Lekki, Victoria Island"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                </div>

                {/* Property Type */}
                <div className="search-field">
                <label>Property Type</label>
                <div className="input-wrapper">
                    <Home size={18} />
                    <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    >
                    <option>Any Type</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                    </select>
                </div>
                </div>

                {/* Price */}
                <div className="search-field">
                <label>Price Range</label>
                <div className="input-wrapper">
                    <Banknote size={18} />
                    <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    >
                    <option>Any Price</option>
                    <option>₦100M – ₦300M</option>
                    <option>₦300M – ₦1B</option>
                    <option>₦1B+</option>
                    </select>
                </div>
                </div>

                {/* Actions */}
                <div className="search-actions">
                <button
                    className="filter-btn"
                    onClick={() => setOpenFilters(true)}
                    aria-label="Advanced Filters"
                >
                    <SlidersHorizontal size={18} />
                </button>

                <button className="search-btn" onClick={handleSearch}>
                    {loading ? "Searching..." : "Search Properties"}
                </button>
                </div>
            </div>
            </div>
        </motion.section>

        {/* ADVANCED FILTERS */}
        <AnimatePresence>
            {openFilters && (
            <motion.div
                className="filters-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                className="filters-panel"
                initial={{ y: 140, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 140, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                <div className="filters-top">
                    <h3>Refine Your Search</h3>
                    <button
                    className="close-btn"
                    onClick={() => setOpenFilters(false)}
                    aria-label="Close Filters"
                    >
                    <X size={20} />
                    </button>
                </div>

                <div className="filters-grid">
                    <div className="filter-group">
                    <label>Bedrooms</label>
                    <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                    >
                        <option>Any</option>
                        <option>2+</option>
                        <option>3+</option>
                        <option>4+</option>
                    </select>
                    </div>

                    <div className="filter-group">
                    <label>Bathrooms</label>
                    <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                    >
                        <option>Any</option>
                        <option>2+</option>
                        <option>3+</option>
                    </select>
                    </div>
                </div>

                <button
                    className="apply-filters-btn"
                    onClick={() => {
                    handleSearch();
                    setOpenFilters(false);
                    }}
                >
                    Apply Filters
                </button>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>

        {/* RESULTS */}
        <section className="search-results">
            <div className="properties-grid">
            {results.length > 0 ? (
                results.map((property, index) => (
                <motion.article
                    key={property.id}
                    className={`property-card ${property.is_sold ? "sold" : ""}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                    <div className="property-image">
                    {property.image_urls?.[0] ? (
                        <img
                        src={property.image_urls[0]}
                        alt={property.title}
                        className={property.is_sold ? "grayscale" : ""}
                        />
                    ) : (
                        <div className="image-placeholder">
                        <ImageOff size={20} />
                        </div>
                    )}

                    <span className="property-price">
                        ₦{property.price?.toLocaleString()}
                    </span>

                    {property.is_sold && (
                        <span className="property-sold-badge">
                        <CheckCircle size={14} /> Sold
                        </span>
                    )}

                    <div className="property-overlay">
                        <button
                        className={`property-cta ${property.is_sold ? "disabled" : ""}`}
                        disabled={property.is_sold}
                        onClick={() => openModal(property)}
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
                        <span>
                        <Bed size={16} /> {property.bedroom} Beds
                        </span>
                        <span>
                        <Bath size={16} /> {property.bathroom} Baths
                        </span>
                        <span>
                        <Square size={16} /> {property.size}
                        </span>
                    </div>
                    </div>
                </motion.article>
                ))
            ) : (
                hasSearched && (
                <p className="no-results">
                    {loading ? "Searching..." : "No properties found"}
                </p>
                )
            )}
            </div>
        </section>

        {/* PROPERTY MODAL */}
        {selectedProperty && (
            <PropertyModal
            property={selectedProperty}
            isOpen={isModalOpen}
            onClose={closeModal}
            />
        )}
        </>
    );
    };

    export default Search;