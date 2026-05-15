    import { Slide, Fade } from "react-awesome-reveal";
    import { User, Shield, Star } from "lucide-react"; // Icons for features
    import "../App.css";

    const features = [
    {
        icon: <User size={28} />,
        title: "Expert Agents",
        description: "Our team consists of seasoned professionals specialized in luxury properties.",
    },
    {
        icon: <Shield size={28} />,
        title: "Verified Listings",
        description: "Every property is thoroughly verified to ensure authenticity and premium quality.",
    },
    {
        icon: <Star size={28} />,
        title: "Exclusive Locations",
        description: "We offer homes in Nigeria’s most prestigious and high-demand areas.",
    },
    ];

    const AboutSection = () => {
    return (
        <section className="about-section">
        <Slide direction="up">
            <div className="about-header">
            <span className="section-eyebrow">Why Choose Us</span>
            <h2 className="section-title" >Experience Luxury & Trust</h2>
            <p className="section-subtitle">
                We provide unmatched services in the luxury real estate market with a focus on quality and exclusivity.
            </p>
            </div>
        </Slide>

        {/* Features grid */}
        <div className="about-features">
            {features.map((feature, index) => (
            <Slide direction="up" key={index} delay={index * 100}>
                <div className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
                </div>
            </Slide>
            ))}
        </div>
        </section>
    );
    };

    export default AboutSection;
