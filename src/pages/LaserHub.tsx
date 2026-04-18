import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LaserHub() {
  const { t } = useTranslation();

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
      <main className="pt-28 lg:pt-44">
        {/* Hero Section: Editorial Asymmetry */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden px-6 md:px-12 py-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
          >
            <div className="md:col-span-12 lg:col-span-7 z-10">
              <motion.span 
                variants={itemVariants}
                className="inline-block font-label text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-6"
              >
                {t('laserHub.heroLabel')}
              </motion.span>
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-emerald-950 mb-8 font-headline font-bold"
              >
                {t('laserHub.title')} <br/> 
                <span className="text-outline-variant/30">{t('laserHub.heroTitleSpan')}</span>
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed mb-10 font-light"
              >
                {t('laserHub.desc')}
              </motion.p>
              <motion.div variants={itemVariants} className="flex items-center gap-6 flex-wrap">
                <Link to="/contact">
                  <button className="bg-primary text-on-primary font-label text-sm uppercase tracking-widest px-10 py-6 rounded-full shadow-lg hover:shadow-primary/20 transition-all font-bold leading-tight active:scale-95">
                    {t('home.freeConsultation')}
                  </button>
                </Link>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <span className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary transition-colors">
                    <span className="material-symbols-outlined group-hover:text-on-primary font-bold">play_arrow</span>
                  </span>
                  <span className="font-label text-xs uppercase tracking-widest font-bold text-primary">
                    {t('laserHub.watchTech')}
                  </span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="md:col-span-12 lg:col-span-5 relative mt-12 lg:mt-0"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface-container-high relative shadow-2xl">
                <img 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105" 
                  data-alt="Laser handpiece" 
                  src="/laser-hero.jpg"
                  alt="Candela Handle"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
              </div>
              
              {/* Tech Overlay */}
              <div className="absolute -bottom-8 -left-0 md:-left-8 bg-surface p-8 shadow-2xl rounded-lg max-w-[280px] border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary mb-4">precision_manufacturing</span>
                <h4 className="font-headline font-bold text-xl mb-2 text-emerald-950">{t('laserHub.precisionTitle')}</h4>
                <p className="font-body text-[10px] text-on-surface-variant leading-relaxed uppercase tracking-tighter font-bold">
                  {t('laserHub.precisionDesc')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* The Precision Ecosystem: Bento Grid */}
        <section className="bg-surface-container-low py-32 px-6 md:px-12 mt-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl text-emerald-950 mb-4">{t('laserHub.protocolTitle')}</h2>
                <p className="font-body text-on-surface-variant">{t('laserHub.protocolDesc')}</p>
              </div>
              <div className="hidden md:block">
                <span className="font-label text-xs uppercase tracking-[0.5em] opacity-30 [writing-mode:vertical-rl] h-32 text-primary font-bold">
                  EST. 2024 / OSCORP
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
              {/* Laser Hair Removal */}
              <div className="md:col-span-2 md:row-span-2 bg-surface p-8 md:p-12 flex flex-col justify-between group hover:bg-primary transition-all duration-500 rounded-xl shadow-sm">
                <div>
                  <span className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary mb-8 transition-colors">face_retouching_natural</span>
                  <h3 className="font-headline text-3xl font-bold mb-4 group-hover:text-on-primary">{t('laserHub.hairTitle')}</h3>
                  <p className="font-body text-on-surface-variant group-hover:text-on-primary/70 leading-relaxed">
                    {t('laserHub.hairDesc')}
                  </p>
                </div>
                <div className="mt-20">
                  <ul className="space-y-4 mb-10">
                    {[t('laserHub.hairPoint1'), t('laserHub.hairPoint2'), t('laserHub.hairPoint3')].map((point, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold group-hover:text-on-primary">
                        <span className="w-1.5 h-1.5 bg-primary group-hover:bg-on-primary rounded-full"></span> 
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link className="font-label text-xs uppercase tracking-widest border-b border-primary group-hover:border-on-primary group-hover:text-on-primary transition-all pb-1" to="/contact">
                    {t('home.discover')}
                  </Link>
                </div>
              </div>

              {/* Skin Rejuvenation */}
              <div className="md:col-span-2 bg-secondary-container p-8 md:p-12 flex items-center gap-8 relative overflow-hidden rounded-xl group">
                <div className="relative z-10 max-w-[60%]">
                  <h3 className="font-headline text-2xl font-bold mb-4 text-emerald-950">{t('laserHub.skinTitle')}</h3>
                  <p className="font-body text-sm text-on-secondary-container">{t('laserHub.skinDesc')}</p>
                </div>
                <div className="absolute right-0 top-0 w-1/3 h-full">
                  <img 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                    data-alt="Skin rejuvenation treatment" 
                    src="/skin-rejuvenation.jpg"
                    alt="Skin Texture"
                  />
                </div>
              </div>

              {/* Vascular Treatments */}
              <div className="md:col-span-1 bg-tertiary-container p-8 flex flex-col justify-between rounded-xl">
                <span className="material-symbols-outlined text-on-tertiary-container text-3xl mb-4">monitor_heart</span>
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-tertiary-container">{t('laserHub.vascularTitle')}</h3>
                  <p className="font-body text-[10px] text-on-tertiary-container/80 mt-4 leading-relaxed font-bold">
                    {t('laserHub.vascularDesc')}
                  </p>
                </div>
              </div>

              {/* Precision Tooling */}
              <div className="md:col-span-1 bg-surface-container-highest p-8 flex flex-col justify-between rounded-xl">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">adjust</span>
                <div>
                  <h3 className="font-headline text-lg font-bold text-emerald-950">{t('laserHub.spotTitle')}</h3>
                  <p className="font-body text-[10px] text-on-surface-variant mt-4 leading-relaxed font-bold uppercase">
                    {t('laserHub.spotDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cryogenic Cooling Feature */}
        <section className="py-32 bg-primary text-on-primary overflow-hidden px-6 md:px-12 mt-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 text-[10rem] font-headline font-black text-white/5 select-none leading-none hidden lg:block">CRY-O</div>
                <h2 className="text-5xl mb-8 relative z-10 leading-tight">
                  {t('laserHub.comfortTitle')}
                </h2>
                <div className="space-y-12 relative z-10">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-on-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined">ac_unit</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold mb-2">{t('laserHub.zimmerTitle')}</h4>
                      <p className="font-body text-surface/70 max-w-sm">{t('laserHub.zimmerDesc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-on-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold mb-2">{t('laserHub.epidermalTitle')}</h4>
                      <p className="font-body text-surface/70 max-w-sm">{t('laserHub.epidermalDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-primary-container rounded-full opacity-20 scale-110 blur-3xl"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                    data-alt="Cooling tech" 
                    src="/zimmer-tech.jpg"
                    alt="Cooling Tech"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="font-label text-xs font-bold uppercase tracking-[0.4em] text-primary mb-8 block">
              {t('laserHub.label')}
            </span>
            <h2 className="text-4xl md:text-6xl mb-12 text-emerald-950">
              {t('laserHub.scheduleTitle')}
            </h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/contact#booking-form">
                <button className="bg-primary text-on-primary px-12 py-5 rounded-full font-headline font-bold text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all active:scale-95 shadow-2xl shadow-primary/20">
                  {t('laserHub.bookNow')}
                </button>
              </Link>
              <button className="border border-outline-variant text-primary px-12 py-6 rounded-full font-label tracking-widest text-sm uppercase font-bold hover:bg-surface-container-low transition-all leading-tight">
                {t('laserHub.priceGuide')}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
