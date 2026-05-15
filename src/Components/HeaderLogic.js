import { useState, useEffect } from "react";

export const useHeader = () => {
  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const headerOffset = 100; // height of fixed header
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    // Close mobile menu after click
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    scrollToSection,
  };
};
