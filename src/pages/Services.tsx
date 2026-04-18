import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function Services() {
  const { t } = useTranslation();

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
        title={t('seo.services.title')} 
        description={t('seo.services.desc')} 
        canonical="/services" 
      />
      <main className="pt-16 lg:pt-48 pb-24 overflow-hidden">
        {/* Hero Section: Editorial Header */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16 md:mb-32">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants as any}
            className="flex flex-col md:flex-row items-start justify-between border-b border-outline-variant/20 pb-12"
          >
            <div className="max-w-3xl">
              <motion.span variants={itemVariants} className="uppercase tracking-[0.2em] text-base font-semibold text-primary/60 mb-6 block font-label">{t('services.label')}</motion.span>
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl text-primary leading-[0.9] font-headline font-bold" dangerouslySetInnerHTML={{ __html: t('services.title') }}>
              </motion.h1>
            </div>
            <motion.div variants={itemVariants} className="max-w-xs text-right mt-12 md:mt-0">
              <p className="text-on-surface-variant text-lg leading-relaxed font-body font-medium">
                  {t('services.desc')}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Services Bento Grid */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="editorial-grid">
            {/* Service 1: Dental Implants (Primary Feature) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="col-span-12 md:col-span-8 bg-surface-container-low rounded-[2rem] overflow-hidden group relative flex flex-col justify-end p-8 md:p-12 min-h-[400px] md:min-h-[600px] shadow-sm border border-outline-variant/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent z-10 opacity-70 transition-opacity group-hover:opacity-80"></div>
              <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" data-alt="Implants" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiP-hh788lRk5Ymuup4k1Ub5-cU-ePzRLv0TwcKrCND6ovLLIyDCotQPFXI0Oq7mqY3qpBw4rde0E7ARuxxYV5-o08DtdWNCDSJ6wZ7re8YVMr5TW11WUAEx-_ArTgywzZrcbSRlcRzuhm-H0xToiizYP8WhWxwjEWoGqBFC6ecVb2FCDY9J1whlIQPZ82eTi1Dp_CflspJTA7mVCAyTKkDz1FMtUlUSkBfxZ2is4Rpn3fyCLf-jdhTIXOvrpD8lbNKF1zHOV_Zzp9" alt="Implants" />
              <div className="relative z-20">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-surface-container-lowest text-4xl">precision_manufacturing</span>
                  <h2 className="text-3xl md:text-4xl text-surface-bright font-headline font-bold">{t('services.implants')}</h2>
                </div>
                <p className="text-surface-variant/90 max-w-lg mb-8 leading-relaxed font-body">
                    {t('services.implantsDesc')}
                </p>
                <button className="flex items-center gap-2 text-surface-bright uppercase tracking-widest text-sm font-bold group-hover:gap-4 transition-all">
                    {t('services.learnMore')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </motion.div>

            {/* Service 2: Aesthetics (Vertical Sidebar Style) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="col-span-12 md:col-span-4 bg-surface-container-highest rounded-[2rem] p-8 md:p-10 flex flex-col justify-between border border-outline-variant/10 group hover:shadow-2xl transition-all"
            >
              <div>
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-8 text-on-primary shadow-lg transition-transform group-hover:rotate-12">
                  <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                </div>
                <h2 className="text-2xl font-headline font-bold text-emerald-950 mb-6">{t('services.aesthetics')}</h2>
                <p className="text-on-surface-variant font-body text-lg leading-relaxed mb-6 font-medium">
                    {t('services.aestheticsDesc')}
                </p>
                <ul className="space-y-4 mb-12">
                  {[t('services.dsd'), t('services.emax'), t('services.laserContouring')].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-primary/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full border border-outline-variant/20 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all duration-300">
                  {t('services.exploreArtistry')}
              </button>
            </motion.div>

            {/* Service 3: Orthodontics (Wide Secondary) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="col-span-12 md:col-span-6 bg-tertiary-container rounded-[2rem] p-8 md:p-12 text-on-tertiary-container relative overflow-hidden group"
            >
              <div className="absolute -right-20 -bottom-20 opacity-10 transition-transform group-hover:scale-110 duration-1000">
                <span className="material-symbols-outlined text-[300px]">architecture</span>
              </div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl mb-8">align_items_stretch</span>
                <h2 className="text-3xl mb-4 font-headline font-bold">{t('services.ortho')}</h2>
                <p className="text-on-tertiary-container/70 mb-10 text-lg leading-relaxed max-w-sm font-medium">
                    {t('services.orthoDesc')}
                </p>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('oscorp-open-popup'))}
                  className="inline-flex items-center gap-2 border-b border-on-tertiary-container/30 pb-1 text-base font-bold uppercase tracking-widest hover:border-on-tertiary-container transition-all"
                >
                    {t('services.viewPathway')}
                </button>
              </div>
            </motion.div>

            {/* Service 4: Diagnostics (Detailed Box) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="col-span-12 md:col-span-6 bg-surface-container-low rounded-[2rem] p-8 md:p-12 flex items-center border border-outline-variant/10 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                <div className="aspect-square bg-surface rounded-2xl flex items-center justify-center p-8 border border-outline-variant/10 shadow-inner overflow-hidden">
                  <img className="w-full h-full object-cover opacity-80 rounded-xl hover:scale-110 transition-transform duration-1000" data-alt="Diagnostics" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwLvRutV0Ra9A5SyoNMNYrjRruk848yqVGhKy0tREur4_6lxCSrhRh_S5LrV891tMchVY2KTpG_0S4LBzqGemPZNWb6UF9rNdIYL3cn50s2HjBaS3Rm_vwhRWqaqw4opi5CZLJA-bxAaQlzZgbzxsLFIHmIyX7e60LT3LJxYwuXKFoAExxKOmeWyo-KMVOeVb_wZ9AiCtompmG7Qxqzv_DdVc_NQfEcvxoO7HofR9jGVWQoeFqcF_llw-Q8IrG7ksYA2YwWHNC5HWY" alt="Scan" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm uppercase tracking-[0.3em] font-bold text-primary/50 mb-2 font-label">{t('services.techCore')}</span>
                  <h2 className="text-2xl text-emerald-950 font-headline font-bold mb-4">{t('services.diagnostics')}</h2>
                  <p className="text-on-surface-variant font-body text-lg leading-loose mb-6 font-medium">
                      {t('services.diagnosticsDesc')}
                  </p>
                  <button className="text-primary text-base font-extrabold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                      {t('services.dataSheets')} <span className="material-symbols-outlined text-base">open_in_new</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technical Excellence Section */}
        <section className="mt-20 md:mt-40 bg-emerald-950 text-on-primary py-24 md:py-32 overflow-hidden relative">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-12 leading-tight text-surface-bright">{t('services.frameworkTitle')}</h3>
              <div className="space-y-12">
                {[
                  { num: '01', title: t('services.molAnalysis'), desc: t('services.molDesc') },
                  { num: '02', title: t('services.robotic'), desc: t('services.roboticDesc') },
                  { num: '03', title: t('services.serenity'), desc: t('services.serenityDesc') }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <span className="text-primary/30 font-headline font-extrabold text-4xl group-hover:text-primary transition-colors">{item.num}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2 font-headline">{item.title}</h4>
                      <p className="text-on-primary-container/80 text-sm leading-relaxed font-body font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
              <img className="rounded-[2.5rem] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover" data-alt="Laser" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4w28QotDWWj-9hoNFqBZki48RUJWJ4oxm0nv4Jc-tKUsQwYsc91DJm0uR6lo1NfEoY4DSPi-85Yjd9xRE6Wst_B1kRGWTnd0h8S_HyS0O1mmEQtsBrSU7jUr23IajeaUDnQij7-pGmyAH_frN7x-xkQA9cP24Q3w9tjnvdy7rztP7vp1-567A20lhMo4Mcrq0g84Z5pwij3B1TC6wsGI6hmh8UfDdADwyXv7L1H5hni5vy9DonIxhzKLmc9zmTKJ071ZoBF3125EH" alt="Laser tool" />
              <div className="absolute bottom-12 -left-4 md:-left-12 bg-surface-bright text-primary p-10 rounded-[2rem] shadow-2xl z-20 max-w-[260px] border border-primary/10">
                <span className="material-symbols-outlined text-4xl mb-4">biotech</span>
                <p className="text-[10px] font-bold leading-relaxed uppercase tracking-[0.2em]">{t('services.proprietary')}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-40 text-center max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl text-primary mb-12 font-headline font-bold">{t('services.ctaTitle')}</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('oscorp-open-popup'))}
                className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-bold text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all active:scale-95 shadow-2xl shadow-primary/20"
              >
                {t('services.requestAudit')}
              </button>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
