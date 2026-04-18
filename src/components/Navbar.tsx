import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isActive = (path: string) => location.pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isMobileMenuOpen ? 'bg-surface' : 'bg-surface/90 backdrop-blur-xl'} shadow-sm dark:shadow-none`}
      >
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1920px] mx-auto relative z-50">
          <Link to="/" className="block" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.svg" alt="OSCORP Klinika" className="h-14 md:h-16 w-auto object-contain" />
          </Link>
        
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center font-headline tracking-tight font-semibold">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-emerald-900 border-b-2 border-emerald-900' : 'text-stone-500 hover:text-emerald-800'} dark:text-emerald-400 pb-1 hover:opacity-80 transition-all duration-300`}
            >
              {t('navbar.home')}
            </Link>
            <Link 
              to="/services" 
              className={`${isActive('/services') ? 'text-emerald-900 border-b-2 border-emerald-900' : 'text-stone-500 hover:text-emerald-800'} dark:text-emerald-400 pb-1 hover:opacity-80 transition-all duration-300`}
            >
              {t('navbar.services')}
            </Link>
            <Link 
              to="/laser-hub" 
              className={`${isActive('/laser-hub') ? 'text-emerald-900 border-b-2 border-emerald-900' : 'text-stone-500 hover:text-emerald-800'} dark:text-stone-400 pb-1 hover:opacity-80 transition-all duration-300`}
            >
              {t('navbar.laserHub')}
            </Link>
            <Link 
              to="/innovation" 
              className={`${isActive('/innovation') ? 'text-emerald-900 border-b-2 border-emerald-900' : 'text-stone-500 hover:text-emerald-800'} dark:text-stone-400 pb-1 hover:opacity-80 transition-all duration-300`}
            >
              {t('navbar.innovation')}
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact') ? 'text-emerald-900 border-b-2 border-emerald-900' : 'text-stone-500 hover:text-emerald-800'} dark:text-stone-400 pb-1 hover:opacity-80 transition-all duration-300`}
            >
              {t('navbar.contact')}
            </Link>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-4 md:gap-6">
            <span className="flex gap-2 items-center text-stone-500 text-sm font-label tracking-wide uppercase mr-1 md:mr-0">
              <button onClick={() => changeLanguage('ru')} className={`px-1.5 py-2 transition-colors ${i18n.language === 'ru' ? 'text-primary font-bold' : 'hover:text-emerald-800'}`}>RU</button>
              <span className="opacity-50 font-light">|</span>
              <button onClick={() => changeLanguage('az')} className={`px-1.5 py-2 transition-colors ${i18n.language === 'az' ? 'text-primary font-bold' : 'hover:text-emerald-800'}`}>AZ</button>
              <span className="opacity-50 font-light">|</span>
              <button onClick={() => changeLanguage('en')} className={`px-1.5 py-2 transition-colors ${i18n.language === 'en' ? 'text-primary font-bold' : 'hover:text-emerald-800'}`}>EN</button>
            </span>
            

            {/* Mobile Menu Toggle Button */}
            <button 
              className="md:hidden flex items-center justify-center p-2 text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Moved outside nav to avoid backdrop-blur containing block bug */}
      <div 
        className={`fixed inset-0 bg-surface z-40 transition-transform duration-500 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col h-full pt-36 px-8 pb-12 overflow-y-auto w-full">
          <div className="flex flex-col gap-8 text-3xl font-headline font-bold">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive('/') ? 'text-primary' : 'text-on-surface-variant'} transition-colors`}
            >
              {t('navbar.home')}
            </Link>
            <Link 
              to="/services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive('/services') ? 'text-primary' : 'text-on-surface-variant'} transition-colors`}
            >
              {t('navbar.services')}
            </Link>
            <Link 
              to="/laser-hub" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive('/laser-hub') ? 'text-primary' : 'text-on-surface-variant'} transition-colors`}
            >
              {t('navbar.laserHub')}
            </Link>
            <Link 
              to="/innovation" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive('/innovation') ? 'text-primary' : 'text-on-surface-variant'} transition-colors`}
            >
              {t('navbar.innovation')}
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${isActive('/contact') ? 'text-primary' : 'text-on-surface-variant'} transition-colors`}
            >
              {t('navbar.contact')}
            </Link>
          </div>
          
          <div className="mt-12 flex flex-col gap-6 pt-10 border-t border-outline-variant/10">
            <div>
              <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant/60 mb-1">{t('contact.phoneLabel')}</p>
              <a href="tel:+994775666555" className="text-2xl font-headline font-bold text-primary">{t('contact.phoneNumber')}</a>
            </div>
            <div>
              <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant/60 mb-1">{t('contact.principal')}</p>
              <p className="text-base font-body text-on-surface-variant leading-relaxed">{t('contact.avenue')}<br/>{t('contact.city')}</p>
            </div>
          </div>
          
          <div className="mt-10 flex gap-6 pb-12 font-label text-sm uppercase tracking-widest">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </>
  );
}
