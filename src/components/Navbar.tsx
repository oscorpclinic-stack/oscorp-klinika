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
            <span className="hidden lg:flex gap-2 text-stone-500 text-sm font-label tracking-wide uppercase">
              <button onClick={() => changeLanguage('ru')} className={`transition-colors ${i18n.language === 'ru' ? 'text-primary font-bold' : 'hover:text-emerald-800'}`}>RU</button>
              <span>|</span>
              <button onClick={() => changeLanguage('az')} className={`transition-colors ${i18n.language === 'az' ? 'text-primary font-bold' : 'hover:text-emerald-800'}`}>AZ</button>
              <span>|</span>
              <button onClick={() => changeLanguage('en')} className={`transition-colors ${i18n.language === 'en' ? 'text-primary font-bold' : 'hover:text-emerald-800'}`}>EN</button>
            </span>
            
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('oscorp-open-popup'))}
              className="hidden sm:block gradient-button text-on-primary px-6 py-2.5 rounded-full text-sm font-label tracking-tight transition-all duration-300 scale-95 hover:opacity-90 active:scale-[0.98]"
            >
              {t('navbar.freeConsultation')}
            </button>

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
          
          <div className="mt-12 flex flex-col gap-10 pb-12">
            <div className="flex gap-8 text-on-surface-variant font-label text-sm uppercase tracking-widest font-bold">
              <button 
                onClick={() => { changeLanguage('ru'); setIsMobileMenuOpen(false); }} 
                className={`transition-colors ${i18n.language === 'ru' ? 'text-primary border-b-2 border-primary pb-1' : 'hover:text-primary'}`}
              >
                RU
              </button>
              <button 
                onClick={() => { changeLanguage('en'); setIsMobileMenuOpen(false); }} 
                className={`transition-colors ${i18n.language === 'en' ? 'text-primary border-b-2 border-primary pb-1' : 'hover:text-primary'}`}
              >
                EN
              </button>
              <button 
                onClick={() => { changeLanguage('az'); setIsMobileMenuOpen(false); }} 
                className={`transition-colors ${i18n.language === 'az' ? 'text-primary border-b-2 border-primary pb-1' : 'hover:text-primary'}`}
              >
                AZ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
