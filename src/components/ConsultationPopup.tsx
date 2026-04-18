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
    const hasSeenPopup = localStorage.getItem('oscorp_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-emerald-950/40 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-surface-bright rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
          >
            <div className="p-8 md:p-12">
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-emerald-950/40 hover:text-emerald-950 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">sparkles</span>
                </div>
                <h2 className="text-3xl md:text-4xl text-emerald-950 font-headline font-bold mb-4 leading-tight">
                  {t('popup.title')}
                </h2>
                <p className="text-stone-500 text-lg leading-relaxed">
                  {t('popup.desc')}
                </p>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 text-center"
                >
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-950 mb-2">{t('contact.successTitle')}</h3>
                  <p className="text-stone-500">{t('contact.successDesc')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-headline font-bold uppercase tracking-widest text-primary block ml-1">{t('contact.name')}</label>
                      <input 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl py-5 px-8 focus:ring-1 focus:ring-primary outline-none transition-all text-xl"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-headline font-bold uppercase tracking-widest text-primary block ml-1">{t('contact.email')}</label>
                      <input 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl py-5 px-8 focus:ring-1 focus:ring-primary outline-none transition-all text-xl"
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
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl py-5 px-8 focus:ring-1 focus:ring-primary outline-none transition-all text-xl"
                        placeholder="+994 -- --- -- --"
                      />
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

                  {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                  <div className="pt-4 flex flex-col gap-4">
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
