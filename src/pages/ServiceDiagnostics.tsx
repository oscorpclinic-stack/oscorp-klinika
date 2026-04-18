import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function ServiceDiagnostics() {
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
        title={`${t('services.diagnostics')} | OSCORP Klinika`} 
        description={t('services.diagnosticsDesc')} 
        canonical="/services/diagnostics" 
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
              {t('services.techCore')}
            </motion.span>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl text-primary leading-[1.1] font-headline font-bold mb-8 max-w-4xl">
              {t('services.diagnostics')}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-body font-medium max-w-2xl">
              {t('services.diagnosticsDesc')}
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
            <img className="w-full h-full object-cover zoom-effect" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwLvRutV0Ra9A5SyoNMNYrjRruk848yqVGhKy0tREur4_6lxCSrhRh_S5LrV891tMchVY2KTpG_0S4LBzqGemPZNWb6UF9rNdIYL3cn50s2HjBaS3Rm_vwhRWqaqw4opi5CZLJA-bxAaQlzZgbzxsLFIHmIyX7e60LT3LJxYwuXKFoAExxKOmeWyo-KMVOeVb_wZ9AiCtompmG7Qxqzv_DdVc_NQfEcvxoO7HofR9jGVWQoeFqcF_llw-Q8IrG7ksYA2YwWHNC5HWY" alt="CBCT Diagnostics" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-emerald-950">
                Техническое Ядро
              </h2>
              <p className="text-on-surface-variant font-body text-lg leading-relaxed">
                Высокоточная диагностика — это основа предсказуемого лечения. Использование искусственного интеллекта и протоколов КЛКТ позволяет обнаружить малейшие патологии на самых ранних стадиях.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary mt-1">monitor_heart</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">ИИ Обнаружение</h3>
                    <p className="text-on-surface-variant/80 text-sm">Программное обеспечение на базе ИИ автоматически размечает скрытые кариесы и воспаления.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary mt-1">center_focus_strong</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Сверхнизкая Доза (Ultra-Low Dose)</h3>
                    <p className="text-on-surface-variant/80 text-sm">Максимальное качество снимков при минимальном лучевом воздействии на организм.</p>
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
                <span className="material-symbols-outlined text-4xl text-primary mb-6">view_in_ar</span>
                <h3 className="text-2xl font-bold font-headline mb-4">Детальный Скрининг</h3>
                <p className="text-on-surface-variant mb-8">
                  Запишитесь на первичный скрининг для получения полной цифровой картины состояния полости рта.
                </p>
              </div>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('oscorp-open-popup'))}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
              >
                ЗАПРОСИТЬ ДАННЫЕ
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
