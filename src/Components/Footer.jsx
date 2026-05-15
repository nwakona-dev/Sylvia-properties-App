    import { motion } from "framer-motion";
    import { Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";

    const Footer = () => {
    return (
        <footer className="lux-footer">
        <div className="lux-footer-top">
            <motion.div
            className="lux-footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            >
            <img src="/sylvia-logo1.png" alt="" />
            <p>
                Exclusive luxury properties in Lagos. Personal attention. Trusted service.
            </p>
            </motion.div>

            <motion.div
            className="lux-footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            >
            <div className="lux-footer-column">
                <h4>Quick Links</h4>
                <ul>
                <li><a href="#properties">Properties</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
                </ul>
            </div>

            <div className="lux-footer-column">
                <h4>Contact</h4>
                <ul>
                <li><Mail size={16} /> <a href="mailto:Ujunwamarysylvia06@gmail.com">Ujunwamarysylvia06@gmail.com</a></li>
                <li><Phone size={16} /> <a href="tel:+2347035864586">+234 703 586 4586</a></li>
                </ul>
            </div>

            <div className="lux-footer-column">
                <h4>Follow Me</h4>
                <div className="lux-footer-socials">
                <motion.a whileHover={{ scale: 1.2 }} href="https://www.instagram.com/sylvia_properties/?hl=en"><Instagram size={25} /></motion.a>
                </div>
            </div>
            </motion.div>
        </div>

        <div className="lux-footer-bottom">
            <p>&copy; {new Date().getFullYear()} Sylvia Properties. All rights reserved.</p>
        </div>
        </footer>
    );
    };

    export default Footer;
