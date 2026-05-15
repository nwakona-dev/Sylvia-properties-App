    import { Slide, Fade } from "react-awesome-reveal";
    import { User, Star, Heart } from "lucide-react";

    const AboutSection = () => {
    return (
        <section id="about"  className="lux-about-section">
        <Slide direction="up">
            <div className="lux-about-header">
            <span className="lux-about-eyebrow">About Me</span>
            <h2 className="lux-about-title">Your Personal Luxury Agent</h2>
            <p className="lux-about-description">
                I specialize in connecting clients with Nigeria’s most exclusive properties. With personalized attention and market expertise, I ensure every transaction is seamless, private, and exceptional.
            </p>
            </div>
        </Slide>

        <div className="lux-about-body">
            <Slide direction="up">
            <div className="blob">
                <img src="/sylvia-pic.png" alt="Agent Portrait" />
            </div>
            </Slide>

            <Slide direction="up">
            <div className="lux-agent-details">
                <h3 className="lux-agent-name">Hello, I’m Sylvia</h3>
                <p className="lux-agent-bio">
                CEO of Sylvia properties with  years of experience in the luxury real estate market, helping high-net-worth clients find their dream homes across Lagos and beyond. Every client receives personal guidance, discretion, and access to exclusive listings.
                </p>

                <div className="lux-agent-highlights">
                <div className="lux-highlight-card">
                    <User size={24} />
                    <p>Personalized Service</p>
                </div>
                <div className="lux-highlight-card">
                    <Star size={24} />
                    <p>Exclusive Listings</p>
                </div>
                <div className="lux-highlight-card">
                    <Heart size={24} />
                    <p>Client Satisfaction</p>
                </div>
                </div>
            </div>
            </Slide>
        </div>
        </section>
    );
    };

    export default AboutSection;
