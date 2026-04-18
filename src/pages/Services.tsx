import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <main className="pt-32 pb-24">
        {/* Hero Section: Editorial Header */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16 md:mb-32">
          <div className="flex flex-col md:flex-row items-end justify-between border-b border-outline-variant/20 pb-12">
            <div className="max-w-3xl">
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-primary/60 mb-6 block font-label">{t('services.label')}</span>
              <h1 className="text-5xl md:text-7xl text-primary leading-[0.9]" dangerouslySetInnerHTML={{ __html: t('services.title') }}>
              </h1>
            </div>
            <div className="max-w-xs text-right mt-12 md:mt-0">
              <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t('services.desc')}
              </p>
            </div>
          </div>
        </section>

        {/* Services Bento Grid */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="editorial-grid">
            {/* Service 1: Dental Implants (Primary Feature) */}
            <div className="col-span-12 md:col-span-8 bg-surface-container-low rounded-xl overflow-hidden group relative flex flex-col justify-end p-8 md:p-12 min-h-[400px] md:min-h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10 opacity-60"></div>
              <img className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" data-alt="Implants" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiP-hh788lRk5Ymuup4k1Ub5-cU-ePzRLv0TwcKrCND6ovLLIyDCotQPFXI0Oq7mqY3qpBw4rde0E7ARuxxYV5-o08DtdWNCDSJ6wZ7re8YVMr5TW11WUAEx-_ArTgywzZrcbSRlcRzuhm-H0xToiizYP8WhWxwjEWoGqBFC6ecVb2FCDY9J1whlIQPZ82eTi1Dp_CflspJTA7mVCAyTKkDz1FMtUlUSkBfxZ2is4Rpn3fyCLf-jdhTIXOvrpD8lbNKF1zHOV_Zzp9" alt="Implants" />
              <div className="relative z-20">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-surface-container-lowest text-4xl">precision_manufacturing</span>
                  <h2 className="text-3xl md:text-4xl text-surface-bright">{t('services.implants')}</h2>
                </div>
                <p className="text-surface-variant/80 max-w-lg mb-8 leading-relaxed">
                    {t('services.implantsDesc')}
                </p>
                <button className="flex items-center gap-2 text-surface-bright uppercase tracking-widest text-xs font-bold group-hover:gap-4 transition-all">
                    {t('services.learnMore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Service 2: Aesthetics (Vertical Sidebar Style) */}
            <div className="col-span-12 md:col-span-4 bg-surface-container-highest rounded-xl p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-3xl mb-8">auto_awesome</span>
                <h2 className="text-2xl font-bold text-primary mb-6">{t('services.aesthetics')}</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    {t('services.aestheticsDesc')}
                </p>
                <ul className="space-y-4 mb-12">
                  <li className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-primary/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span> {t('services.dsd')}
                  </li>
                  <li className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-primary/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span> {t('services.emax')}
                  </li>
                  <li className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-primary/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span> {t('services.laserContouring')}
                  </li>
                </ul>
              </div>
              <button className="w-full border border-outline-variant/20 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300">
                  {t('services.exploreArtistry')}
              </button>
            </div>

            {/* Service 3: Orthodontics (Wide Secondary) */}
            <div className="col-span-12 md:col-span-6 bg-tertiary-container rounded-xl p-8 md:p-12 text-on-tertiary-container relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 opacity-10">
                <span className="material-symbols-outlined text-[300px]">architecture</span>
              </div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-3xl mb-8">align_items_stretch</span>
                <h2 className="text-3xl mb-4">{t('services.ortho')}</h2>
                <p className="text-on-tertiary-container/70 mb-10 text-sm leading-relaxed max-w-sm">
                    {t('services.orthoDesc')}
                </p>
                <Link className="inline-flex items-center gap-2 border-b border-on-tertiary-container/30 pb-1 text-sm font-semibold hover:border-on-tertiary-container transition-all" to="/contact">
                    {t('services.viewPathway')}
                </Link>
              </div>
            </div>

            {/* Service 4: Diagnostics (Detailed Box) */}
            <div className="col-span-12 md:col-span-6 bg-surface-container-low rounded-xl p-8 md:p-12 flex items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                <div className="aspect-square bg-surface rounded-lg flex items-center justify-center p-8 border border-outline-variant/10">
                  <img className="w-full h-full object-cover opacity-80 rounded-lg" data-alt="Diagnostics" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwLvRutV0Ra9A5SyoNMNYrjRruk848yqVGhKy0tREur4_6lxCSrhRh_S5LrV891tMchVY2KTpG_0S4LBzqGemPZNWb6UF9rNdIYL3cn50s2HjBaS3Rm_vwhRWqaqw4opi5CZLJA-bxAaQlzZgbzxsLFIHmIyX7e60LT3LJxYwuXKFoAExxKOmeWyo-KMVOeVb_wZ9AiCtompmG7Qxqzv_DdVc_NQfEcvxoO7HofR9jGVWQoeFqcF_llw-Q8IrG7ksYA2YwWHNC5HWY" alt="Scan" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/50 mb-2">{t('services.techCore')}</span>
                  <h2 className="text-2xl text-primary mb-4">{t('services.diagnostics')}</h2>
                  <p className="text-on-surface-variant text-xs leading-loose mb-6">
                      {t('services.diagnosticsDesc')}
                  </p>
                  <button className="text-primary text-xs font-extrabold uppercase tracking-widest flex items-center gap-2">
                      {t('services.dataSheets')} <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Excellence Section */}
        <section className="mt-20 md:mt-40 bg-primary text-on-primary py-24 md:py-32 overflow-hidden relative">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-12 leading-tight">{t('services.frameworkTitle')}</h3>
              <div className="space-y-12">
                <div className="flex gap-8">
                  <span className="text-primary-fixed-dim font-headline font-extrabold text-4xl">01</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t('services.molAnalysis')}</h4>
                    <p className="text-on-primary-container text-sm leading-relaxed">{t('services.molDesc')}</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <span className="text-primary-fixed-dim font-headline font-extrabold text-4xl">02</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t('services.robotic')}</h4>
                    <p className="text-on-primary-container text-sm leading-relaxed">{t('services.roboticDesc')}</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <span className="text-primary-fixed-dim font-headline font-extrabold text-4xl">03</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t('services.serenity')}</h4>
                    <p className="text-on-primary-container text-sm leading-relaxed">{t('services.serenityDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-surface-tint/10 blur-[100px] rounded-full"></div>
              <img className="rounded-2xl shadow-2xl relative z-10 w-full aspect-[4/5] object-cover" data-alt="Laser" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4w28QotDWWj-9hoNFqBZki48RUJWJ4oxm0nv4Jc-tKUsQwYsc91DJm0uR6lo1NfEoY4DSPi-85Yjd9xRE6Wst_B1kRGWTnd0h8S_HyS0O1mmEQtsBrSU7jUr23IajeaUDnQij7-pGmyAH_frN7x-xkQA9cP24Q3w9tjnvdy7rztP7vp1-567A20lhMo4Mcrq0g84Z5pwij3B1TC6wsGI6hmh8UfDdADwyXv7L1H5hni5vy9DonIxhzKLmc9zmTKJ071ZoBF3125EH" alt="Laser tool" />
              <div className="absolute bottom-12 -left-4 md:-left-12 bg-surface-bright text-primary p-8 rounded-xl shadow-xl z-20 max-w-[240px]">
                <span className="material-symbols-outlined text-4xl mb-4">biotech</span>
                <p className="text-xs font-bold leading-relaxed uppercase tracking-wider">{t('services.proprietary')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-40 text-center max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl text-primary mb-12">{t('services.ctaTitle')}</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/contact">
              <button className="bg-primary text-on-primary px-12 py-6 w-full md:w-auto rounded-full font-label text-sm font-bold tracking-widest uppercase hover:bg-primary-container transition-all leading-tight">
                  {t('services.requestAudit')}
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
