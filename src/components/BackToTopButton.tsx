import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed z-[55] bottom-[90px] right-6 md:bottom-28 md:right-10 bg-surface-container-high/80 backdrop-blur-md text-emerald-950 p-4 rounded-full shadow-lg border border-outline-variant/30 hover:bg-surface-container-highest hover:scale-105 active:scale-95 transition-all outline-none"
          aria-label="Scroll to top"
        >
          <span className="material-symbols-outlined text-xl leading-none block">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
