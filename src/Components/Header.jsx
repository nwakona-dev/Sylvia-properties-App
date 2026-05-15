    import React from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import { Menu, X } from "lucide-react";
    import { useHeader } from "./headerLogic";

    const Header = () => {
    const whatsappMessage = encodeURIComponent(
        "Hello, I’m interested in scheduling a private viewing of your luxury property listings. Please provide more details. Thank you!"
    );

    const { isOpen, setIsOpen, scrollToSection } = useHeader();

    return (
        <>
        <header className="header">
            <div className="nav-container">
            <div
                className="logo"
                onClick={() => scrollToSection("home")}
                style={{ cursor: "pointer" }}
            >
                <img src="/sylvia-logo1.png" alt="Sylvia Properties" />
            </div>

            <nav className="nav-links">
                <a onClick={() => scrollToSection("home")}>Home</a>
                <a onClick={() => scrollToSection("properties")}>
                Properties
                </a>
                <a onClick={() => scrollToSection("about")}>About</a>
                <a onClick={() => scrollToSection("contact")}>Contact</a>
            </nav>

            <div className="header-right">
                {/* DESKTOP CTA */}
                <a
                href={`https://wa.me/2347035864586?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
                >
                Book Consultation
                </a>

                {/* MOBILE TOGGLE */}
                <button
                className="mobile-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>
            </div>
        </header>

        {/* MOBILE MENU */}
        <AnimatePresence>
            {isOpen && (
            <motion.div
                className="mobile-menu"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            >
                <a onClick={() => scrollToSection("home")}>Home</a>

                <a onClick={() => scrollToSection("properties")}>
                Properties
                </a>

                <a onClick={() => scrollToSection("about")}>About</a>

                <a onClick={() => scrollToSection("contact")}>Contact</a>

                <motion.a
                href={`https://wa.me/2347035864586?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-cta"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                >
                Book Consultation
                </motion.a>
            </motion.div>
            )}
        </AnimatePresence>
        </>
    );
    };

    export default Header;