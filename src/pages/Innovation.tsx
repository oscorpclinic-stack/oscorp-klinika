import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function Innovation() {
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
      <SEO 
        title={t('seo.innovation.title')} 
        description={t('seo.innovation.desc')} 
        canonical="/innovation" 
      />
      <main className="pt-16 lg:pt-44">
        {/* Hero Section: Editorial Asymmetry */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-32">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-7">
              <motion.span 
                variants={itemVariants}
                className="text-label text-lg uppercase tracking-[0.2em] text-primary-container mb-6 block font-bold"
              >
                {t('innovation.label')}
              </motion.span>
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl text-emerald-950 leading-none mb-8 font-headline font-bold"
              >
                {t('innovation.title')}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-body text-xl text-on-surface-variant max-w-xl leading-relaxed font-light"
              >
                {t('innovation.desc')}
              </motion.p>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-5 relative mt-12 lg:mt-0"
            >
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-[2rem] relative shadow-2xl">
                <img 
                  alt="high-tech dental lab" 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105" 
                  data-alt="Modern dental lab" 
                  src="/internal-lab.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
              </div>
              
              {/* Tolerance Overlay */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-8 -left-0 md:-left-8 bg-surface p-8 max-w-xs shadow-2xl border border-outline-variant/10 z-10 rounded-2xl"
              >
                <span className="text-4xl font-headline font-bold text-primary block mb-2">0.01mm</span>
                <p className="text-label text-sm uppercase tracking-widest text-on-surface-variant font-bold leading-tight">
                  {t('innovation.tolerance')}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Process Bento Grid */}
        <section className="bg-surface-container-low py-32 px-6 md:px-12 mt-12">
          <div className="max-w-[1440px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <h2 className="text-4xl md:text-5xl text-emerald-950 font-headline font-bold">
                {t('innovation.ecoTitle')}
              </h2>
              <div className="w-24 h-1 bg-primary mt-4"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* 3D Scanning */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="md:col-span-2 md:row-span-2 bg-surface p-8 md:p-12 flex flex-col justify-between group hover:bg-surface-bright transition-all duration-500 rounded-3xl shadow-sm border border-outline-variant/10"
              >
                <div>
                  <span className="material-symbols-outlined text-4xl text-primary mb-8">clinical_notes</span>
                  <h3 className="text-headline text-3xl font-bold mb-4 text-emerald-950">{t('innovation.scan')}</h3>
                  <p className="text-body text-on-surface-variant leading-relaxed mb-8">
                    {t('innovation.scanDesc')}
                  </p>
                </div>
                <div className="aspect-video bg-surface-container overflow-hidden rounded-lg relative">
                  <img 
                    alt="3d scanning" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                    data-alt="Digital dental scanner" 
                    src="/vnutrirotovoe-scanirovanie.jpg"
                  />
                </div>
              </motion.div>

              {/* 3D Printing */}
              <div className="bg-surface-container-highest p-8 flex flex-col justify-between rounded-xl">
                <div>
                  <span className="material-symbols-outlined text-3xl text-primary mb-4">precision_manufacturing</span>
                  <h3 className="text-headline text-xl font-bold mb-2 text-emerald-950">{t('innovation.print')}</h3>
                  <p className="text-body text-lg text-on-surface-variant leading-relaxed font-bold">
                    {t('innovation.printDesc')}
                  </p>
                </div>
              </div>

              {/* CAD/CAM */}
              <div className="bg-primary-container p-8 flex flex-col justify-between text-on-primary-container rounded-xl">
                <div>
                  <span className="material-symbols-outlined text-3xl text-on-primary-container mb-4">computer</span>
                  <h3 className="text-headline text-xl font-bold mb-2">{t('innovation.mill')}</h3>
                  <p className="text-body text-lg opacity-80 leading-relaxed font-medium">
                    {t('innovation.millDesc')}
                  </p>
                </div>
              </div>

              {/* Ceramic Oven */}
              <div className="md:col-span-2 bg-surface p-8 flex flex-col md:flex-row gap-8 items-center border border-outline-variant/10 rounded-xl">
                <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-square overflow-hidden rounded-lg bg-surface-container-low">
                  <img src="/vita.jpg" alt="VITA Ceramic Ovens" className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-headline text-2xl font-bold mb-2 text-emerald-950">{t('innovation.oven')}</h3>
                  <p className="text-body text-lg text-on-surface-variant leading-relaxed font-bold tracking-tight">
                    {t('innovation.ovenDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Speed & Quality Banner */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mt-12">
          <div>
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="text-primary font-headline text-5xl font-black">01</div>
                <div>
                  <h4 className="text-headline text-xl font-bold mb-2 uppercase tracking-wide text-emerald-950">{t('innovation.sameDay')}</h4>
                  <p className="text-body text-lg text-on-surface-variant leading-relaxed">{t('innovation.sameDayDesc')}</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="text-primary font-headline text-5xl font-black">02</div>
                <div>
                  <h4 className="text-headline text-xl font-bold mb-2 uppercase tracking-wide text-emerald-950">{t('innovation.shade')}</h4>
                  <p className="text-body text-lg text-on-surface-variant leading-relaxed">{t('innovation.shadeDesc')}</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="text-primary font-headline text-5xl font-black">03</div>
                <div>
                  <h4 className="text-headline text-xl font-bold mb-2 uppercase tracking-wide text-emerald-950">{t('innovation.perfectFit')}</h4>
                  <p className="text-body text-lg text-on-surface-variant leading-relaxed">{t('innovation.perfectFitDesc')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-primary aspect-video rounded-xl overflow-hidden relative group">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                data-alt="Dental technician" 
                src="/dr-tooth.PNG"
                alt="OSCORP Internal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <span className="text-surface-bright text-label text-base uppercase tracking-widest mb-2 block font-bold">
                  {t('innovation.qa')}
                </span>
                <p className="text-surface-bright font-headline text-2xl font-bold">
                  {t('innovation.qaDesc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-on-primary py-32 md:py-48 overflow-hidden relative px-6 md:px-12 mt-12">
          <div className="max-w-[1440px] mx-auto relative z-10 text-center">
            <h2 className="text-4xl md:text-7xl mb-8 leading-tight">
              {t('innovation.ctaTitle')}
            </h2>
            <p className="text-body text-lg md:text-xl opacity-70 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t('innovation.ctaDesc')}
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('oscorp-open-popup'))}
                className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-bold text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all active:scale-95 shadow-2xl shadow-primary/20"
              >
                {t('innovation.schedule')}
              </button>
              <button className="border border-surface-bright/30 text-surface-bright rounded-full px-12 py-6 font-label text-sm uppercase tracking-widest font-bold hover:bg-surface-bright/10 transition-all leading-tight">
                {t('innovation.viewTech')}
              </button>
            </div>
          </div>
          
          {/* Decorative gradient orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container rounded-full blur-[120px] opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-surface-tint rounded-full blur-[120px] opacity-20 animate-pulse delay-700"></div>
        </section>
      </main>
    </>
  );
}
