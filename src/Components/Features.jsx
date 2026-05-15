import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
/* Ensure CheckCircle is imported */
import { MapPin, Bed, Bath, Square, CheckCircle } from "lucide-react"; 
import { Fade, Slide } from "react-awesome-reveal";
import { supabase } from "../supabaseClient";
import PropertyModal from "./PropertyModal";

const FeaturedProperties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("is_draft", false)
      .order("created_at", { ascending: false })
      .limit(3);

    if (!error) setProperties(data || []);
  };

  useEffect(() => {
    fetchProperties();
    const interval = setInterval(() => fetchProperties(), 5000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (property) => {
    if (property.is_sold) return; 
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  const formatPrice = (price) => price?.toLocaleString();

  return (
    <section className="properties-section" id="properties">
      <Slide direction="up" delay={100}>
        <div className="properties-header">
          <span className="section-eyebrow">Exclusive Listings</span>
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">
            Handpicked Affordable Comfort homes in Lagos Nigeria’s most prestigious locations.
          </p>
        </div>
      </Slide>

      <div className="properties-grid">
        {properties.map((property, index) => (
          <Fade key={property.id} delay={index * 200} duration={800}>
            <motion.article
              className={`property-card ${property.is_sold ? "sold" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              style={{ cursor: property.is_sold ? "not-allowed" : "pointer" }}
              onClick={() => openModal(property)}
            >
              <div className="property-image">
                <img
                  src={property.image_urls?.[0]}
                  alt={property.title}
                  className={property.is_sold ? "grayscale" : ""}
                />

                <span className="property-price">
                  ₦{formatPrice(property.price)}
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
                  <span><Square size={16} /> {property.size}</span>
                </div>
              </div>
            </motion.article>
          </Fade>
        ))}
      </div>

      <div className="properties-footer">
        <button className="view-all-btn" onClick={() => navigate("/listings")}>
          View All Listings
        </button>
      </div>

      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default FeaturedProperties;