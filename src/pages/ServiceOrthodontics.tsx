import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function ServiceOrthodontics() {
  const { t } = useTranslation();

  const containerVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <SEO 
        title={`${t('services.ortho')} | OSCORP Klinika`} 
        description={t('services.orthoDesc')} 
        canonical="/services/orthodontics" 
      />
      <main className="pt-32 lg:pt-48 pb-24 overflow-hidden min-h-screen bg-surface">
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16 md:mb-32">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants as any}
            className="flex flex-col border-b border-outline-variant/20 pb-12"
          >
            <motion.span variants={itemVariants} className="uppercase tracking-[0.2em] text-sm md:text-base font-semibold text-primary/60 mb-6 block font-label">
              OSCORP ORTHODONTICS
            </motion.span>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl text-primary leading-[1.1] font-headline font-bold mb-8 max-w-4xl">
              {t('services.ortho')}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-body font-medium max-w-2xl">
              {t('services.orthoDesc')}
            </motion.p>
          </motion.div>
        </section>

        <section className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full relative rounded-[2rem] overflow-hidden aspect-[16/9] md:aspect-[21/9]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10 mix-blend-multiply"></div>
            <img className="w-full h-full object-cover zoom-effect" src="/clinical_excellence.png" alt="Orthodontics" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-emerald-950">
                Прецизионная Биомеханика
              </h2>
              <p className="text-on-surface-variant font-body text-lg leading-relaxed">
                Мы предлагаем современные незаметные системы выравнивания зубов — элайнеры премиум-класса и сапфировые брекеты. Достижение функционального совершенства с комфортом для пациента.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary mt-1">line_axis</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Невидимые Элайнеры</h3>
                    <p className="text-on-surface-variant/80 text-sm">Прозрачные каппы, которые можно снимать во время еды.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary mt-1">speed</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Ускоренное Лечение</h3>
                    <p className="text-on-surface-variant/80 text-sm">Применение микроимплантов позволяет существенно сократить сроки лечения.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface-container-low rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/10"
            >
              <div>
                <span className="material-symbols-outlined text-4xl text-primary mb-6">360</span>
                <h3 className="text-2xl font-bold font-headline mb-4">Начать Свой Путь</h3>
                <p className="text-on-surface-variant mb-8">
                  Сделайте 3D-сканирование челюсти и узнайте срок, за который ваша улыбка станет совершенной.
                </p>
              </div>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('oscorp-open-popup'))}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
              >
                ЗАПИСАТЬСЯ К ОРТОДОНТУ
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
