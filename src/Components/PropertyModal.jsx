    import React from "react";
    import { IoLogoWhatsapp } from "react-icons/io5";
    import { X, Bed, Bath, Home, MapPin, Ruler } from "lucide-react";
    import "../Styles/propertyModal.css";
    import "../App.css";

    const PropertyModal = ({ property, isOpen, onClose }) => {
        const handleWhatsAppInquiry = () => {
        const phoneNumber = "+2347035864586"; // Replace with Admin number
        const message = `✨ *New Property Inquiry* ✨%0A%0A` +
                        `Hello! I am interested in this luxury listing:%0A` +
                        `*Property:* ${property.title}%0A` +
                        `*Location:* ${property.city}%0A` +
                        `*Price:* ₦${property.price?.toLocaleString()}%0A%0A` +
                        `Can I get more details or schedule a viewing?%0A`;
        
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    if (!isOpen || !property) return null;

    // Separate the first image for the hero section
    const [heroImage, ...otherImages] = property.image_urls || [];

    return (
        <div className="pm-overlay" onClick={onClose}>
        <div className="pm-container" onClick={(e) => e.stopPropagation()}>
            <button className="pm-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
            </button>

            {/* 1. Hero Image - The first thing they see */}
            <div className="pm-hero-container">
            {heroImage && (
                <img src={heroImage} alt={property.title} className="pm-hero-image" />
            )}
            <div className="pm-hero-overlay">
                {property.status && <div className="property-sold-badge">{property.status}</div>}
                <div className="pm-price-tag">₦{property.price?.toLocaleString()}</div>
            </div>
            </div>

            {/* 2. Content Section */}
            <div className="pm-content-body">
            <header className="pm-header">
                <h2 className="pm-title-main">{property.title}</h2>
                <div className="pm-location-row">
                <MapPin size={16} />
                <span>{property.address}, {property.city}</span>
                </div>
            </header>

            <div className="pm-info-grid">
                <div className="pm-info-card">
                <Home size={20} />
                <div>
                    <small>Type</small>
                    <span>{property.type}</span>
                </div>
                </div>
                <div className="pm-info-card">
                <Bed size={20} />
                <div>
                    <small>Bedrooms</small>
                    <span>{property.bedroom} Units</span>
                </div>
                </div>
                <div className="pm-info-card">
                <Bath size={20} />
                <div>
                    <small>Bathrooms</small>
                    <span>{property.bathroom} Units</span>
                </div>
                </div>
                <div className="pm-info-card">
                <Ruler size={20} />
                <div>
                    <small>Total Area</small>
                    <span>{property.size}</span>
                </div>
                </div>
            </div>

            <div className="pm-description-box">
                <h3 className="pm-sub-title">Description</h3>
                <p className="pm-description">{property.description}</p>
            </div>

            {/* 3. Secondary Gallery */}
            {otherImages.length > 0 && (
                <div className="pm-gallery-section">
                <h3 className="pm-sub-title">Property Gallery</h3>
                <div className="pm-gallery-grid">
                    {otherImages.map((url, i) => (
                    <img key={i} src={url} alt={`Gallery ${i}`} className="pm-gallery-item" loading="lazy" />
                    ))}
                </div>
                </div>
            )}
            </div>

            <div className="pm-cta-section">
                <div className="pm-cta-glass">
                <div className="pm-cta-text">
                    <h4>Interested in this Masterpiece?</h4>
                    <p>Our private consultants are available for a personal tour.</p>
                </div>
                <button className="pm-whatsapp-btn" onClick={handleWhatsAppInquiry}>
                    <div className="btn-glow"></div>
                    <span>Secure Listing</span>
                    <IoLogoWhatsapp size={28} color="#25D366" />
                    
                </button>
                </div>
            </div>
        </div>
        </div>
    );
    };

    export default PropertyModal;