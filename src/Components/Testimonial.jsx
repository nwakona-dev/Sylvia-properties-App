    import { Fade, Slide } from "react-awesome-reveal";
    import { Star } from "lucide-react";

    const testimonials = [
    {
        id: 1,
        name: "Olivia Johnson",
        position: "CEO, Elite Investments",
        message:
        "Sylvia made the process of acquiring my duplex seamless and private. Her expertise in luxury properties is unmatched.",
        avatar: "/Mask group.svg",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Adewale",
        position: "Entrepreneur",
        message:
        "I’ve never experienced such personal attention. The property I purchased exceeded all expectations.",
        avatar: "/Mask group (2).svg",
        rating: 5,
    },
    {
        id: 3,
        name: "Sophia Clarke",
        position: "Investor",
        message:
        "From the first call to closing, Sylvia guided me with professionalism, discretion, and deep market knowledge.",
        avatar: "Mask group (1).svg",
        rating: 5,
    },
    ];

    const TestimonialSection = () => {
    return (
        <section id="testimonials" className="lux-testimonials">
        <Slide direction="up" triggerOnce>
            <div className="lux-testimonials-header">
            <span className="lux-testimonials-eyebrow">What Clients Say</span>
            <h2 className="lux-testimonials-title">
                Trusted By Elite Investors
            </h2>
            <p className="lux-testimonials-subtitle">
                My clients trust me with high-value properties, and their feedback
                reflects the luxury, discretion, and excellence I provide.
            </p>
            </div>
        </Slide>

        <div className="lux-testimonials-grid">
            {testimonials.map((testimonial, index) => (
            <Fade key={testimonial.id} delay={index * 200} duration={800}>
                <div className="lux-testimonial-card">
                
                <div className="lux-testimonial-content">
                    <p className="lux-testimonial-message">"{testimonial.message}"</p>
                    <div className="lux-testimonial-rating">
                    {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                        <Star key={i} size={16} color="#d4af37" />
                        ))}
                    </div>
                    <div className="lux-testimonial-author">
                        <div className="lux-testimonial-avatar">
                            <img src={testimonial.avatar} alt={testimonial.name} />
                        </div>

                        <div>
                            <h4 className="lux-testimonial-name">{testimonial.name}</h4>
                            <span className="lux-testimonial-position">{testimonial.position}</span>
                        </div>
                    
                    </div>
                    
                    
                </div>
                </div>
            </Fade>
            ))}
        </div>
        </section>
    );
    };

    export default TestimonialSection;
