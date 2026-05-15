import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

const LuxuryCTA = () => {
  const whatsappMessage = encodeURIComponent(
    "Hello, I’m interested in scheduling a private viewing of your luxury property listings. Please provide more details. Thank you!"
  );

  return (
    <section id="contact" className="lux-cta">
      <motion.div
        className="lux-cta-box"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <span className="lux-cta-eyebrow">Private Viewings</span>

        <h2 className="lux-cta-title">
          Ready to Own a <span>Luxury Property</span>?
        </h2>

        <p className="lux-cta-text">
          Whether it’s a premium duplex or a multi-storey investment property, 
          I’ll personally guide you through inspections, negotiations, and secure ownership.
        </p>

        <div className="lux-cta-actions">
          <motion.a
            href={`https://wa.me/2347035864586?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-cta-btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Inspection <ArrowRight size={18} />
          </motion.a>

          <motion.a
            href="tel:+2347035864586"
            className="lux-cta-btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PhoneCall size={18} /> Call Now
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default LuxuryCTA;