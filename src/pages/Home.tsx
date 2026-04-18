import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function Home() {
  const { t } = useTranslation();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "OSCORP Klinika",
    "image": "https://oscorp.az/logo.png",
    "url": "https://oscorp.az",
    "telephone": "+994000000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Baku",
      "addressCountry": "AZ"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00"
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
        staggerChildren: 0.15
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
        title={t('seo.home.title')} 
        description={t('seo.home.desc')} 
        canonical="/" 
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <main className="pt-16 lg:pt-0">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full object-cover object-[85%_center] lg:object-[60%_center]" 
              data-alt="Ultra-modern clinical interior" 
              src="/hero-banner.svg"
              alt="OSCORP Exterior"
            />
            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-surface via-surface/80 lg:via-surface/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 w-full">
            <motion.div 
              className="max-w-5xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants as any}
            >
              <motion.span 
                variants={itemVariants}
                className="inline-block text-sm md:text-base text-primary font-semibold tracking-[0.2em] uppercase mb-4"
              >
                {t('home.heroLabel')}
              </motion.span>
              <motion.h1 
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-on-surface mb-8 leading-[1.1] break-words"
              >
                {t('home.heroTitle1')} <span className="text-primary-container">{t('home.heroTitle2')}</span> {t('home.heroTitle3')}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed font-body"
              >
                {t('home.heroDesc')}
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('oscorp-open-popup'))}
                  className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-bold text-sm md:text-base uppercase tracking-[0.2em] hover:bg-primary/90 transition-all active:scale-95 shadow-2xl shadow-primary/20"
                >
                  {t('home.freeConsultation')}
                </button>
                <Link to="/innovation">
                  <button className="bg-surface/10 backdrop-blur-md border border-outline-variant/30 text-on-surface px-8 lg:px-10 py-6 rounded-full font-semibold hover:bg-surface-container-low transition-all font-label text-sm md:text-base uppercase tracking-widest leading-tight active:scale-95">
                    {t('home.ourTechnology')}
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Bento Grid */}
        <section className="py-24 bg-surface">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6"
            >
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl mb-4 font-headline font-bold text-emerald-950">{t('home.servicesTitle')}</h2>
                <p className="text-on-surface-variant font-body text-lg leading-relaxed">{t('home.servicesDesc')}</p>
              </div>
              <Link to="/services" className="text-primary font-semibold border-b-2 border-primary/20 pb-2 hover:border-primary transition-all font-headline uppercase tracking-widest text-sm">
                {t('home.proceduresLink')}
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t('home.implantTitle'), desc: t('home.implantDesc'), icon: 'dentistry' },
                { title: t('home.treatmentTitle'), desc: t('home.treatmentDesc'), icon: 'biotech' },
                { title: t('home.orthoTitle'), desc: t('home.orthoDesc'), icon: 'orthopedics' },
                { title: t('home.orthopedicsTitle'), desc: t('home.orthopedicsDesc'), icon: 'architecture' }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group p-8 bg-surface-container-low rounded-[2rem] transition-all duration-300 hover:bg-surface-container-highest border border-outline-variant/10 hover:shadow-2xl hover:shadow-primary/5 active:scale-95"
                >
                  <div className="mb-12 w-12 h-12 flex items-center justify-center rounded-2xl bg-primary-container/10 text-primary transition-all group-hover:bg-primary group-hover:text-on-primary group-hover:rotate-12">
                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-3 text-emerald-950">{service.title}</h3>
                  <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-body font-medium">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Laser Section */}
        <section className="py-24 bg-primary text-on-primary overflow-hidden">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-container/30 blur-[100px] rounded-full"></div>
              <img 
                className="relative z-10 rounded-xl shadow-2xl w-full" 
                data-alt="Alexandrit Candela Machine" 
                src="/candela-machine.jpg"
                alt="Candela Laser"
              />
              <div className="absolute bottom-6 right-6 z-20 bg-primary-container/80 backdrop-blur-md p-6 rounded-lg max-w-xs border border-white/10">
                <p className="text-sm font-label uppercase tracking-widest text-on-primary-container mb-2 font-bold">{t('home.coolingLabel')}</p>
                <p className="text-sm md:text-base font-body">{t('home.coolingDesc')}</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl mb-8">{t('home.laserTitle')}</h2>
              <p className="text-lg text-primary-fixed-dim mb-10 leading-relaxed font-body">
                {t('home.laserDesc')}
              </p>
              <ul className="space-y-6 mb-10">
                {[t('home.laserPoint1'), t('home.laserPoint2'), t('home.laserPoint3')].map((point, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary-fixed">check_circle</span>
                    <span className="font-body text-surface">{point}</span>
                  </li>
                ))}
              </ul>
              <Link to="/laser-hub">
                <button className="bg-surface text-primary px-8 py-4 rounded-full font-bold hover:bg-surface-container-low transition-all font-label text-sm uppercase tracking-widest">
                  {t('home.laserButton')}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Philosophy - Squeezing in the Brandbook intent */}
        <section className="py-24 bg-surface border-y border-outline-variant/10">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center max-w-4xl mx-auto"
            >
              <span className="text-xs font-bold font-headline uppercase tracking-[0.3em] text-primary mb-6">
                {t('home.brandPhilosophyLabel')}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 tracking-tight text-emerald-950">
                {t('home.brandPhilosophyTitle')}
              </h2>
              <div className="w-24 h-[1px] bg-primary/30 mb-10"></div>
              <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed font-body font-light italic">
                "{t('home.brandPhilosophyDesc')}"
              </p>
            </motion.div>
          </div>
        </section>

        {/* Innovation Hub */}
        <section className="py-32 bg-surface-container-lowest">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-black mb-6">{t('home.innovationTitle')}</h2>
              <p className="text-on-surface-variant text-lg font-body">{t('home.innovationDesc')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold font-headline text-primary-container mb-6">3D</div>
                <h3 className="text-xl font-bold mb-4 font-headline">{t('home.printTitle')}</h3>
                <p className="text-on-surface-variant leading-relaxed font-body">{t('home.printDesc')}</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold font-headline text-primary-container mb-6">CAD</div>
                <h3 className="text-xl font-bold mb-4 font-headline">{t('home.sculptTitle')}</h3>
                <p className="text-on-surface-variant leading-relaxed font-body">{t('home.sculptDesc')}</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold font-headline text-primary-container mb-6">Ceram</div>
                <h3 className="text-xl font-bold mb-4 font-headline">{t('home.ovenTitle')}</h3>
                <p className="text-on-surface-variant leading-relaxed font-body">{t('home.ovenDesc')}</p>
              </div>
            </div>

            <div className="mt-20 h-[500px] w-full rounded-2xl overflow-hidden relative group">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                data-alt="Digital Lab Interior" 
                src="/lab-hub.jpg"
                alt="In House Lab"
              />
              <div className="absolute inset-0 bg-primary-container/20 flex items-center justify-center p-6">
                <div className="bg-surface/90 backdrop-blur-xl p-8 rounded-xl max-w-lg text-center shadow-2xl">
                  <h4 className="font-headline text-2xl font-bold mb-4">{t('home.labTitle')}</h4>
                  <p className="text-on-surface-variant mb-6 font-body">{t('home.labDesc')}</p>
                  <Link to="/innovation" className="text-primary font-bold inline-flex items-center gap-2 hover:gap-4 transition-all font-label text-sm uppercase tracking-widest">
                    {t('home.labButton')} <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
