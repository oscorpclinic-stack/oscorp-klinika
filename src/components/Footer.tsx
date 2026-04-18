import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 py-20 max-w-[1920px] mx-auto">
            <div className="col-span-1 md:col-span-1">
                <div className="mb-6"><img src="/logo.svg" alt="OSCORP Klinika" className="h-10 w-auto opacity-80" /></div>
                <p className="text-stone-400 font-body text-sm leading-relaxed mb-6">
                    {t('footer.description')}
                </p>
            </div>
            
            <div>
                <h5 className="font-headline font-bold text-stone-900 dark:text-stone-100 mb-6">{t('footer.sanctuary')}</h5>
                <ul className="space-y-4">
                    <li><Link to="/laser-hub" className="text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-body text-sm transition-colors">{t('navbar.laserHub')}</Link></li>
                    <li><Link to="/services" className="text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-body text-sm transition-colors">{t('footer.dentalBioMetrics')}</Link></li>
                    <li><Link to="/services" className="text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-body text-sm transition-colors">{t('footer.aestheticSuite')}</Link></li>
                </ul>
            </div>

            <div>
                <h5 className="font-headline font-bold text-stone-900 dark:text-stone-100 mb-6">{t('footer.patientConcierge')}</h5>
                <ul className="space-y-4">
                    <li><Link to="/contact" className="text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-body text-sm transition-colors">{t('footer.patientPortal')}</Link></li>
                    <li><a href="#" className="text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-body text-sm transition-colors">{t('footer.privacyPolicy')}</a></li>
                    <li><a href="#" className="text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-body text-sm transition-colors">{t('footer.termsOfService')}</a></li>
                </ul>
            </div>

            <div>
                <h5 className="font-headline font-bold text-stone-900 dark:text-stone-100 mb-6">{t('footer.newsletter')}</h5>
                <div className="flex border-b border-stone-300 dark:border-stone-700 pb-2">
                    <input 
                        type="email" 
                        placeholder={t('footer.emailPlaceholder')} 
                        className="bg-transparent border-none focus:ring-0 text-sm w-full text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
                    />
                    <button className="text-emerald-900 dark:text-emerald-400 hover:opacity-70 transition-opacity">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
        <div className="border-t border-stone-200 dark:border-stone-800">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-stone-400 font-label text-xs uppercase tracking-widest">
                    {t('footer.copyright')}
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-stone-400 hover:text-emerald-700 transition-colors uppercase font-label text-[10px] tracking-widest">Instagram</a>
                    <a href="#" className="text-stone-400 hover:text-emerald-700 transition-colors uppercase font-label text-[10px] tracking-widest">LinkedIn</a>
                </div>
            </div>
        </div>
    </footer>
  );
}
