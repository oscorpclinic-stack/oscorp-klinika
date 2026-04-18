import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const { t } = useTranslation();
  const isContactPage = location.pathname === '/contact';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Global Sticky CTA */}
      {!isContactPage && (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60]">
          <Link to="/contact#booking-form">
            <button className="bg-emerald-950 text-white shadow-2xl rounded-full px-6 py-4 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all group border border-white/20">
              <span className="material-symbols-outlined fill-icon group-hover:rotate-12 transition-transform">calendar_month</span>
              <span className="font-bold text-xs md:text-sm font-headline uppercase tracking-widest">{t('home.bookConsultation')}</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
