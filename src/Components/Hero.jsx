    import React,{useState, useEffect} from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import { Fade, Slide} from "react-awesome-reveal";

    // Slider images with object positions
    const heroImages = [
    { src: "/luxury1.jpg", position: "center top" },
    { src: "/luxury2.jpg", position: "center" },
    { src: "/luxury3.jpg", position: "center" },
    { src: "/luxury4.jpg", position: "center" },
    ];

    // Floating property cards
    const propertyCards = [
    { img: "/property1.jpg", title: "4 Bed Apartment" },
    { img: "/property2.jpg", title: "Modern Villa" },
    { img: "/property3.jpg", title: "Luxury Penthouse" },
    ];

    const Hero = () => {

    const whatsappMessage = encodeURIComponent(
        "Hello, I’m interested in scheduling a private viewing of your luxury property listings. Please provide more details. Thank you!"
    );
    
    const [currentImage, setCurrentImage] = useState(0);

    // Automatic slider
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 7000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero" id="home">
        <div className="hero-slider">
            <AnimatePresence>
            {heroImages.map(
                (img, index) =>
                index === currentImage && (
                    <motion.img
                    key={img.src}
                    src={img.src}
                    alt={`Luxury Property ${index + 1}`}
                    style={{ objectPosition: img.position }}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 2 }}
                    />
                )
            )}
            </AnimatePresence>
        </div>


        <div className="hero-overlay">
            <Slide direction="up" delay={100}>
                <div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}>
            <h1>Experience Luxury Living</h1>
            <p>Premium homes in the most exclusive locations.</p>
            <motion.a
                href={`https://wa.me/2347035864586?text=${whatsappMessage}`}
                className="hero-cta"
                whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(212,175,55,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
            >
                Contact Us
            </motion.a>
            </div>
            </Slide>

            
            <div className="hero-cards">
            {propertyCards.map((card, index) => (
                
                <motion.div
                key={card.img}
                className="hero-card"
                animate={{
                    y: [0, -10, 0], 
                }}
                transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                >
                <img src={card.img} alt={card.title} />
                <span>{card.title}</span>
                </motion.div>
            ))}
            </div>
        </div>
    </section>
    );
};

    export default Hero;
