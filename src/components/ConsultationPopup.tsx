import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import CustomSelect from './CustomSelect';

export default function ConsultationPopup() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('oscorp-open-popup', handleOpenEvent);

    const hasSeenPopup = localStorage.getItem('oscorp_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('oscorp-open-popup', handleOpenEvent);
      };
    }
    
    return () => window.removeEventListener('oscorp-open-popup', handleOpenEvent);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('oscorp_popup_seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!supabase) throw new Error("Connection error");

      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([{ 
          name, 
          email,
          phone, 
          service: selectedService,
          notes: "Entry Popup Submission"
        }]);

      if (submitError) throw submitError;

      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-surface-bright rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left Column: Doctor Photo */}
            <div className="hidden md:block md:w-5/12 relative">
              <img 
                src="/popup-dr-photo.JPG" 
                alt="Our Specialist" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-bright/20"></div>
              <div className="absolute bottom-10 left-10 text-white z-10">
                <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-60 mb-2 block">Excellence in Care</span>
                <h4 className="text-2xl font-headline font-bold">OSCORP Specialist</h4>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto">
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-emerald-950/40 hover:text-emerald-950 transition-colors z-20"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">sparkles</span>
                </div>
                <h2 className="text-3xl text-emerald-950 font-headline font-bold mb-3 leading-tight">
                  {t('popup.title')}
                </h2>
                <p className="text-stone-500 text-base leading-relaxed">
                  {t('popup.desc')}
                </p>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-950 mb-2">{t('contact.successTitle')}</h3>
                  <p className="text-stone-500 text-lg">{t('contact.successDesc')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-headline font-bold uppercase tracking-widest text-primary block ml-1">{t('contact.name')}</label>
                      <input 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl py-4 px-6 focus:ring-1 focus:ring-primary outline-none transition-all text-lg"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-headline font-bold uppercase tracking-widest text-primary block ml-1">{t('contact.email')}</label>
                        <input 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl py-4 px-6 focus:ring-1 focus:ring-primary outline-none transition-all text-lg"
                          placeholder="email@address.com"
                          type="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-headline font-bold uppercase tracking-widest text-primary block ml-1">{t('contact.phoneLabel')}</label>
                        <input 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl py-4 px-6 focus:ring-1 focus:ring-primary outline-none transition-all text-lg"
                          placeholder="+994 -- --- -- --"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-headline font-bold uppercase tracking-widest text-primary block ml-1">{t('contact.interest')}</label>
                      <CustomSelect 
                        options={[
                          { label: t('contact.option1'), value: "laser" },
                          { label: t('contact.option2'), value: "diagnostic" },
                          { label: t('contact.option3'), value: "surgical" },
                          { label: t('contact.option4'), value: "general" }
                        ]}
                        value={selectedService}
                        onChange={setSelectedService}
                        placeholder={t('contact.interest')}
                      />
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

                  <div className="pt-2 flex flex-col gap-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-on-primary py-5 rounded-full font-headline font-bold text-sm uppercase tracking-widest hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : t('contact.submit')}
                    </button>
                    <button 
                      type="button"
                      onClick={handleClose}
                      className="text-stone-400 font-label text-sm font-bold uppercase tracking-widest hover:text-emerald-950 transition-colors"
                    >
                      {t('popup.maybeLater')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
