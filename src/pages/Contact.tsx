import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomSelect from '../components/CustomSelect';
import SEO from '../components/SEO';

import { supabase } from '../lib/supabase';

export default function Contact() {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hash === '#booking-form') {
      const element = document.getElementById('booking-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!supabase) {
        throw new Error("Supabase connection is not configured on the server.");
      }

      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name, 
            email, 
            phone, 
            service: selectedService, 
            notes 
          }
        ]);

      if (submitError) throw submitError;

      setIsSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setSelectedService("");
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <>
      <SEO 
        title={t('seo.contact.title')} 
        description={t('seo.contact.desc')} 
        canonical="/contact" 
      />
      <main className="pt-16 lg:pt-48 pb-24 overflow-hidden">
        {/* Hero Section */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span 
              variants={itemVariants}
              className="uppercase tracking-[0.2em] text-primary font-semibold text-xs font-label block"
            >
              {t('contact.label')}
            </motion.span>
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[0.9] text-emerald-950 font-headline font-bold"
            >
              <span className="block mb-2">{t('contact.title1')}</span>
              <span className="text-outline-variant/30">{t('contact.title2')}</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-on-surface-variant max-w-md text-lg leading-relaxed font-light"
            >
              {t('contact.desc')}
            </motion.p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="h-64 md:h-[400px] bg-surface-container-low rounded-xl overflow-hidden relative shadow-2xl"
          >
            <img 
              className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-700" 
              data-alt="Clinic interior" 
              src="/dr-room.JPG"
              alt="OSCORP Internal"
            />
            <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
          </motion.div>
        </section>

        {/* Main Interaction Section */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Information Panel */}
          <div className="lg:col-span-5 space-y-16">
            {/* Location */}
            <div className="group">
              <h3 className="font-headline font-bold text-2xl mb-8 tracking-tight border-b border-outline-variant/20 pb-4 text-emerald-950">
                {t('contact.principal')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                  <div>
                    <p className="text-emerald-950 font-medium text-lg leading-tight mb-1">{t('contact.avenue')}</p>
                    <p className="text-on-surface-variant font-bold">{t('contact.city')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <h3 className="font-headline font-bold text-2xl mb-8 tracking-tight border-b border-outline-variant/20 pb-4 text-emerald-950">
                {t('contact.hours')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-medium">{t('contact.weekdays')}</span>
                  <span className="text-primary font-bold">09:00 — 20:00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-medium">{t('contact.saturday')}</span>
                  <span className="text-primary font-bold">10:00 — 18:00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-medium">{t('contact.sunday')}</span>
                  <span className="text-tertiary font-bold italic">{t('contact.appointment')}</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="font-headline font-bold text-2xl mb-8 tracking-tight border-b border-outline-variant/20 pb-4 text-emerald-950">
                {t('contact.channels')}
              </h3>
              <div className="space-y-6">
                <a className="flex items-center gap-4 group" href={`tel:${t('contact.phoneNumber').replace(/\s/g, '')}`}>
                  <span className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </span>
                  <span className="text-lg font-bold text-emerald-950">{t('contact.phoneNumber')}</span>
                </a>
                <a className="flex items-center gap-4 group" href="mailto:concierge@oscorp.az">
                  <span className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </span>
                  <span className="text-lg font-bold text-emerald-950">concierge@oscorp.az</span>
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-8 flex gap-4 flex-wrap">
              <a className="px-6 py-2 border border-outline-variant/30 rounded-full text-xs font-headline font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors text-primary" href="#">
                {t('contact.instagram')}
              </a>
              <a className="px-6 py-2 border border-outline-variant/30 rounded-full text-xs font-headline font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors text-primary" href="#">
                {t('contact.linkedin')}
              </a>
            </div>
          </div>

          {/* Booking Form Card */}
          <div className="lg:col-span-7" id="booking-form">
            <div className="bg-surface-container-low p-8 md:p-16 rounded-xl relative overflow-hidden shadow-sm">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <h2 className="text-3xl text-emerald-950 mb-2">{t('contact.request')}</h2>
              <p className="text-on-surface-variant mb-12 text-sm max-w-md">
                {t('contact.requestDesc')}
              </p>
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-container-lowest border border-primary/10 p-10 md:p-20 rounded-xl text-center shadow-sm"
                >
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-emerald-950 mb-4">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="text-on-surface-variant mb-10 text-lg leading-relaxed max-w-sm mx-auto">
                    {t('contact.successDesc')}
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="bg-primary text-on-primary px-8 py-3 rounded-full font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-sm font-headline font-bold uppercase tracking-widest text-primary mb-1 block">{t('contact.name')}</label>
                      <input 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-4.5 px-6 focus:ring-1 focus:ring-primary text-emerald-950 transition-all placeholder:text-outline-variant/30 font-medium outline-none text-base" 
                        placeholder="John Doe" 
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-headline font-bold uppercase tracking-widest text-primary mb-1 block">{t('contact.email')}</label>
                      <input 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-4.5 px-6 focus:ring-1 focus:ring-primary text-emerald-950 transition-all placeholder:text-outline-variant/30 font-medium outline-none text-base" 
                        placeholder="email@address.com" 
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-sm font-headline font-bold uppercase tracking-widest text-primary mb-1 block">{t('contact.phoneLabel')}</label>
                      <input 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-4.5 px-6 focus:ring-1 focus:ring-primary text-emerald-950 transition-all placeholder:text-outline-variant/30 font-medium outline-none text-base" 
                        placeholder="+994 -- --- -- --" 
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-headline font-bold uppercase tracking-widest text-primary mb-1 block">{t('contact.interest')}</label>
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

                  <div className="space-y-2">
                    <label className="text-sm font-headline font-bold uppercase tracking-widest text-primary mb-1 block">{t('contact.notes')}</label>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-4.5 px-6 focus:ring-1 focus:ring-primary text-emerald-950 transition-all placeholder:text-outline-variant/30 resize-none font-medium outline-none text-base" 
                      placeholder={t('contact.notesPlaceholder')}
                      rows={4}
                    ></textarea>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-lg border border-red-100 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {error}
                    </p>
                  )}

                  <div className="pt-8">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary disabled:bg-primary/50 text-on-primary py-6 px-8 rounded-full font-headline font-bold text-sm uppercase tracking-[0.2em] hover:shadow-2xl transition-all active:scale-[0.98] leading-tight flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>{t('contact.sending') || "Processing..."}</span>
                        </>
                      ) : (
                        t('contact.submit')
                      )}
                    </button>
                    <p className="text-center mt-6 text-sm text-outline-variant uppercase tracking-widest font-bold">
                      {t('contact.encrypted')}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Asymmetric Map Section */}
        <section className="mt-32 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
            <div className="lg:col-span-2 bg-primary p-12 md:p-16 flex flex-col justify-center text-on-primary">
              <h3 className="text-3xl font-headline font-bold mb-6 tracking-tight">{t('contact.hub')}</h3>
              <p className="text-on-primary-container text-lg leading-relaxed mb-8 opacity-90">
                {t('contact.hubDesc')}
              </p>
              <div className="space-y-2">
                <p className="text-sm font-headline font-bold uppercase tracking-widest opacity-60">
                  {t('contact.parking')}
                </p>
                <p className="text-sm opacity-90">
                  {t('contact.parkingDesc')}
                </p>
              </div>
            </div>
            <div className="lg:col-span-3 h-[500px] bg-surface-container-high relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.8031619614344!2d49.93611667588736!3d40.413211171440196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030630001d5d3d1%3A0x2d3080af42073877!2sOSCORP%20Klinika!5e0!3m2!1sen!2saz!4v1776512828652!5m2!1sen!2saz" 
                className="w-full h-full"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
