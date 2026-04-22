import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import CustomSelect from '../components/CustomSelect';
import PhoneInput from '../components/PhoneInput';
import { supabase } from '../lib/supabase';
export default function Promo() {
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [notes, setNotes] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 400);
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500;
      setShowScrollDown(!isAtBottom);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreement) {
      setError("Пожалуйста, подтвердите согласие на обработку данных");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      if (!supabase) throw new Error("Database connection error");

      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name, 
            phone, 
            service: selectedService || 'Promo Lead', 
            notes 
          }
        ]);

      if (submitError) throw submitError;

      setIsSuccess(true);
      setName("");
      setPhone("");
      setNotes("");
      setSelectedService("");
      setAgreement(false);
    } catch (err: any) {
      setError(err.message || "Ошибка отправки. Попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const beforeAfterData = [
    { type: "Эстетическая реставрация", desc: "Премиальные керамические виниры", before: "/6002405646332005597.jpg", after: "/6000257995180281018.jpg", rotate: false },
    { type: "Голливудская Улыбка", desc: "Прецизионная установка виниров", before: "/6002548230656298160.jpg", after: "/6000206906544295119.jpg", rotate: true },
    { type: "Комплексная имплантация", desc: "Система All-on-4 / All-on-6", before: "/westdent-before-after-all-on-4-6_result-2.jpg", after: "/westdent-before-after-all-on-4-6_result-1.jpg", rotate: false },
    { type: "Полное протезирование", desc: "Восстановление функциональности и эстетики", before: "/telegram-cloud-photo.jpg", after: "/telegram-cloud-photo.jpg", rotate: false, isSplit: true }
  ];

  return (
    <>
      <SEO 
        title="Премиальная Стоматология | Доктор Ширхан Заргаров" 
        description="Хирургия и имплантация экспертного уровня. Бескомипромиссное качество и эстетика." 
        canonical="/promo" 
      />
      <main className="font-body bg-surface-container-lowest text-emerald-950 overflow-hidden">
        
        {/* 1. THE EXPERT (AUTHORITY & TRUST) - Now the Hero Section */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 px-6 lg:px-12 bg-surface-container-low border-b border-outline-variant/10 overflow-hidden">
          {/* Landing Page Mini Header */}
          <div className="absolute top-0 left-0 w-full px-6 py-6 lg:px-12 lg:py-8 z-50 flex items-center gap-3">
            <img src="/logo.svg" alt="OSCORP Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain" />
            <span className="font-headline font-bold text-[16px] leading-tight md:text-xl text-emerald-950 mt-1 max-w-[200px] md:max-w-none">Мы создаём идеальные улыбки!</span>
          </div>

          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-full h-full md:w-1/2 bg-primary/5 rounded-bl-[100%] blur-3xl -z-0 pointer-events-none"></div>

          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
            
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] transform -rotate-3 z-0"></div>
              <img 
                src="/popup-dr-photo.JPG" 
                alt="Доктор Ширхан Заргаров" 
                className="w-full h-auto aspect-[3/4] object-cover rounded-[2rem] shadow-xl relative z-10 transition-all duration-700"
              />
              <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-primary text-white p-6 md:p-8 rounded-2xl shadow-2xl z-20 max-w-[240px]">
                <p className="font-headline text-4xl font-black block mb-1">20+</p>
                <p className="font-bold text-sm opacity-90 leading-tight">лет успешной клинической практики</p>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <h2 className="text-sm font-headline font-bold text-primary uppercase tracking-[0.2em] mb-4">Главный Врач</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl/tight font-headline font-black text-emerald-950 mb-8 tracking-tight">
                В основе работы — <br className="hidden md:block" />
                <span className="text-outline-variant/50">рациональный минимализм</span> <br className="hidden lg:block"/>
                и предсказуемый результат
              </h3>
              
              <div className="text-lg text-on-surface-variant space-y-6 leading-relaxed font-medium mb-10">
                <p>
                  <strong className="text-emerald-950">Меня зовут Ширхан Заргаров</strong> — стоматолог-хирург, имплантолог с более чем 20-летним опытом клинической практики.
                </p>
                <p>
                  Мой профессиональный путь начался в Казани, где я окончил Казанский государственный медицинский университет. С первых лет работы я сосредоточился на хирургической стоматологии и имплантологии, последовательно углубляя экспертизу и внедряя современные международные подходы в лечение.
                </p>
                <p>
                  Сегодня я практикую в Баку и являюсь руководителем «Oscorp Clinic» — пространства эстетической медицины, где медицинская точность сочетается с деликатным подходом к естественной красоте. В основе нашей работы — безопасность, прогнозируемость результата и безупречное качество на каждом этапе лечения.
                </p>
                <p>
                  Я специализируюсь на полном спектре хирургических вмешательств: от атравматичного удаления зубов до сложных костно-пластических и имплантологических операций. В своей практике придерживаюсь принципа рационального минимализма — только необходимые вмешательства, выверенные решения и максимально щадящие методики.
                </p>
                <div className="bg-white p-6 rounded-xl border-l-4 border-primary shadow-sm">
                  <p className="italic text-emerald-950 font-medium whitespace-pre-wrap">
                    «Для меня важно не просто провести лечение, а создать результат, который будет выглядеть естественно, сохранять функциональность и соответствовать высоким эстетическим ожиданиям пациента».
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <button 
                  onClick={scrollToForm}
                  className="w-full sm:w-auto bg-primary hover:bg-[#1a2417] text-white py-5 px-10 rounded-xl font-headline font-bold text-sm text-center uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                  Получить план лечения
                </button>
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-variant flex justify-center items-center overflow-hidden"><span className="material-symbols-outlined text-outline">verified</span></div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary/20 flex justify-center items-center text-xs font-bold text-primary">+1k</div>
                </div>
                <span className="text-xs font-bold text-outline-variant uppercase tracking-widest ml-2">Довольных<br/>пациентов</span>
              </div>
            </div>

          </div>
        </section>

        {/* 3. VISUAL PROOF (DESIRE) */}
        <section className="py-24 bg-surface">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-emerald-950 mb-4">Ювелирная точность в каждой работе</h2>
            <p className="text-on-surface-variant font-medium text-lg mb-16 max-w-2xl mx-auto">
              Мы не просто лечим зубы — мы возвращаем уверенность в себе. Оцените результаты сложных хирургических и эстетических кейсов.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {beforeAfterData.map((item, i) => (
                <div key={i} className="flex flex-col items-center bg-surface-container-low rounded-2xl p-4 shadow-sm border border-outline-variant/10">
                  <div className="flex w-full overflow-hidden rounded-xl bg-surface-container-highest h-48 mb-5 relative group border border-outline-variant/20">
                    <div className="w-1/2 h-full border-r-2 border-white/50 relative bg-surface-dim overflow-hidden">
                        {item.before ? (
                          <img 
                            src={item.before} 
                            alt={`${item.type} — До`} 
                            className={`w-full object-cover transition-transform duration-500 
                              ${item.isSplit ? 'h-[200%] object-top' : 'h-full'} 
                              ${item.rotate ? 'rotate-90 scale-150' : ''}`} 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl opacity-20">face_retouching_off</span>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">До</div>
                    </div>
                    <div className="w-1/2 h-full relative bg-[#d4e8cc] overflow-hidden">
                        {item.after ? (
                          <img 
                            src={item.after} 
                            alt={`${item.type} — После`} 
                            className={`w-full object-cover transition-transform duration-500 
                              ${item.isSplit ? 'h-[200%] object-bottom' : 'h-full'} 
                              ${item.rotate ? 'rotate-90 scale-150' : ''}`} 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-primary opacity-20">face_retouching_natural</span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">После</div>
                    </div>
                  </div>
                  <h3 className="font-headline font-bold text-emerald-950 text-center mb-1">{item.type}</h3>
                  <p className="text-xs text-on-surface-variant font-medium text-center">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
               <button onClick={scrollToForm} className="text-primary font-bold inline-flex items-center gap-2 hover:gap-4 transition-all font-headline text-sm uppercase tracking-widest border-b border-primary pb-1">
                 Хочу такой же результат <span className="material-symbols-outlined text-lg">arrow_forward</span>
               </button>
            </div>
          </div>
        </section>

        {/* 4. MEDICAL TOURISM (REMOVING OBJECTIONS) */}
        <section className="py-20 bg-surface border-t border-outline-variant/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10">
             <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
               <div className="lg:w-1/3 text-center lg:text-left">
                  <h2 className="text-3xl font-headline font-bold text-emerald-950 mb-4">Medical Tourism</h2>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    Планируете прилететь к нам из другой страны? Мы берем на себя все организационные моменты, чтобы ваше медицинское путешествие было максимально комфортным.
                  </p>
               </div>
               
               <div className="lg:w-2/3 flex flex-col sm:flex-row items-center justify-between w-full gap-6">
                 
                 <div className="flex flex-col items-center text-center">
                   <div className="w-20 h-20 rounded-2xl bg-white border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-sm">
                     <span className="material-symbols-outlined text-3xl">flight_takeoff</span>
                   </div>
                   <h4 className="font-bold text-emerald-950 text-sm">Покупка билетов<br/>и Трансфер</h4>
                 </div>
                 
                 <div className="hidden sm:block text-outline-variant">
                   <span className="material-symbols-outlined text-3xl">arrow_right_alt</span>
                 </div>
                 
                 <div className="flex flex-col items-center text-center">
                   <div className="w-20 h-20 rounded-2xl bg-white border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-sm">
                     <span className="material-symbols-outlined text-3xl">hotel</span>
                   </div>
                   <h4 className="font-bold text-emerald-950 text-sm">Размещение<br/>в отеле</h4>
                 </div>

                 <div className="hidden sm:block text-outline-variant">
                   <span className="material-symbols-outlined text-3xl">arrow_right_alt</span>
                 </div>
                 
                 <div className="flex flex-col items-center text-center">
                   <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center mb-4 shadow-xl">
                     <span className="material-symbols-outlined text-3xl">medical_services</span>
                   </div>
                   <h4 className="font-bold text-emerald-950 text-sm">Лечение<br/>и Восстановление</h4>
                 </div>
                 
               </div>
             </div>
          </div>
        </section>

        {/* 5. PRICING OFFERS (LOGIC) */}
        <section className="py-24 bg-surface-container-lowest border-t border-outline-variant/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-emerald-950 mb-4">Прозрачные Пакеты Услуг «Под Ключ»</h2>
              <p className="text-on-surface-variant font-medium text-lg max-w-2xl mx-auto">
                Все этапы лечения спланированы так, чтобы вы чувствовали себя комфортно и уверенно с первого до последнего визита.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              

              {/* Basic */}
              <div className="bg-surface rounded-3xl p-8 border border-outline-variant/20 hover:border-primary/30 transition-all text-center">
                <h3 className="font-headline font-bold text-emerald-950 text-2xl mb-2">Базовый</h3>
                <p className="text-sm text-on-surface-variant mb-8">Надежное лечение и комфортное перемещение по городу.</p>
                <div className="h-px w-full bg-outline-variant/20 mb-8"></div>
                <ul className="space-y-4 text-sm text-emerald-950 font-medium mb-10 text-left">
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary text-xl -mt-0.5">medical_services</span> Полное лечение под ключ</li>
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary text-xl -mt-0.5">directions_car</span> Трансфер (аэропорт-клиника)</li>
                  <li className="flex items-start gap-3 text-outline-variant opacity-70"><span className="material-symbols-outlined text-xl -mt-0.5">close</span> Авиабилеты (самостоятельно)</li>
                  <li className="flex items-start gap-3 text-outline-variant opacity-70"><span className="material-symbols-outlined text-xl -mt-0.5">close</span> Проживание (самостоятельно)</li>
                </ul>
                <button onClick={scrollToForm} className="w-full py-4 rounded-xl border-2 border-outline-variant/30 font-bold hover:border-primary hover:text-primary transition-all">Выбрать пакет</button>
              </div>

              {/* Comfort (Highlight) */}
              <div className="bg-[#b3c6ab] rounded-3xl p-8 shadow-2xl relative transform md:-translate-y-4 text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-md">Хит Выбора</div>
                <h3 className="font-headline font-bold text-emerald-950 text-2xl mb-2">Комфорт</h3>
                <p className="text-sm text-emerald-950/80 mb-8">Всё включено: лечение, отель и поездки.</p>
                <div className="h-px w-full bg-black/10 mb-8"></div>
                <ul className="space-y-4 text-sm text-emerald-950 font-medium mb-10 text-left">
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-fixed-variant text-xl -mt-0.5">medical_services</span> Полный комплекс лечения</li>
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-fixed-variant text-xl -mt-0.5">hotel</span> Проживание в отеле 4*</li>
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary-fixed-variant text-xl -mt-0.5">directions_car</span> Трансфер (аэропорт-отель-клиника)</li>
                  <li className="flex items-start gap-3 text-emerald-950/50"><span className="material-symbols-outlined text-xl -mt-0.5">close</span> Авиабилеты (самостоятельно)</li>
                </ul>
                <button onClick={scrollToForm} className="w-full py-4 rounded-xl font-bold bg-primary text-white hover:bg-[#1a2417] shadow-xl shadow-primary/20 transition-all">Получить консультацию</button>
              </div>

              {/* Premium */}
              <div className="bg-emerald-950 rounded-3xl p-8 shadow-md text-white text-center">
                <h3 className="font-headline font-bold text-white text-2xl mb-2">Premium All-In</h3>
                <p className="text-sm text-outline-variant mb-8">Лечение, билеты и VIP сервис — мы заботимся обо всем.</p>
                <div className="h-px w-full bg-white/10 mb-8"></div>
                <ul className="space-y-4 text-sm text-white font-medium mb-10 text-left">
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-emerald-400 text-xl -mt-0.5">medical_services</span> VIP план лечения (лучшие материалы)</li>
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-emerald-400 text-xl -mt-0.5">flight_takeoff</span> Покупка авиабилетов туда-обратно</li>
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-emerald-400 text-xl -mt-0.5">hotel</span> Размещение в премиум отеле 5*</li>
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-emerald-400 text-xl -mt-0.5">local_taxi</span> Индивидуальный VIP трансфер</li>
                  <li className="flex items-start gap-3"><span className="material-symbols-outlined text-emerald-400 text-xl -mt-0.5">support_agent</span> Личный консьерж 24/7</li>
                </ul>
                <button onClick={scrollToForm} className="w-full py-4 rounded-xl border-2 border-white/20 font-bold hover:bg-white hover:text-emerald-950 transition-all">Оставить запрос</button>
              </div>

            </div>
            
            <p className="text-center text-on-surface-variant font-medium mt-10 max-w-lg mx-auto italic text-sm">
              * Итоговая сумма и план лечения утверждаются только после очной или онлайн консультации и изучения 3D снимка.
            </p>
          </div>
        </section>

        {/* 6. LEAD FORM (ACTION) */}
        <section className="py-24 bg-surface-container-lowest" id="lead-form">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="bg-surface rounded-[2rem] p-8 lg:p-16 shadow-2xl border border-outline-variant/20 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-tertiary/5 rounded-full blur-2xl -z-0 pointer-events-none"></div>
              
              <div className="text-center relative z-10 mb-10 lg:mb-14">
                <span className="material-symbols-outlined text-primary text-4xl mb-4">forum</span>
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-emerald-950 mb-4 tracking-tight">Сделайте шаг к новой улыбке</h2>
                <p className="text-lg text-on-surface-variant font-medium">
                  Оставьте заявку сейчас, и наш координатор свяжется с вами для первичного расчета стоимости и составления плана.
                </p>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 bg-white rounded-2xl border border-primary/10 shadow-sm"
                >
                  <div className="w-20 h-20 bg-[#d4e8cc] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">task_alt</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-emerald-950 mb-3">Заявка успешно принята!</h3>
                  <p className="text-on-surface-variant mb-8 text-lg px-6">Мы уже получили ваши контактные данные. Наш координатор позвонит вам в рабочее время для обсуждения деталей.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-primary font-bold inline-flex items-center gap-2 hover:gap-4 transition-all font-headline text-sm uppercase tracking-widest border-b border-primary pb-1"
                  >
                    Вернуться к форме
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold font-headline uppercase tracking-widest text-primary ml-1">Фамилия Имя Отчество *</label>
                      <input 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary focus:border-transparent text-emerald-950 transition-all placeholder:text-outline-variant/60 font-medium outline-none shadow-sm" 
                        placeholder="Например, Иван Иванов" 
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold font-headline uppercase tracking-widest text-primary ml-1">Контактный Номер *</label>
                      <PhoneInput
                        value={phone}
                        onChange={setPhone}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold font-headline uppercase tracking-widest text-primary ml-1">Что вас интересует? *</label>
                      <CustomSelect 
                        options={[
                          { label: "Имплантация зубов", value: "implants" },
                          { label: "Премиальные Виниры", value: "veneers" },
                          { label: "Сложное удаление/Хирургия", value: "surgery" },
                          { label: "Медицинский туризм", value: "tourism" },
                          { label: "Другое", value: "other" }
                        ]}
                        value={selectedService}
                        onChange={setSelectedService}
                        placeholder="Выберите услугу"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-2">
                    <label className="text-xs font-bold font-headline uppercase tracking-widest text-primary ml-1">Ваш комментарий или вопрос</label>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary focus:border-transparent text-emerald-950 transition-all placeholder:text-outline-variant/60 resize-none font-medium outline-none shadow-sm" 
                      placeholder="Опишите вкратце вашу проблему или прикрепите ссылку на снимок..."
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-4 py-4 bg-primary/5 p-4 rounded-xl mt-2 border border-primary/10">
                    <div className="relative flex items-center mt-0.5">
                      <input 
                        type="checkbox" 
                        id="agreement" 
                        checked={agreement}
                        onChange={(e) => setAgreement(e.target.checked)}
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-outline-variant/50 checked:border-primary checked:bg-primary transition-all bg-white"
                      />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                        <span className="material-symbols-outlined text-[18px] font-bold block">check</span>
                      </div>
                    </div>
                    <label htmlFor="agreement" className="text-sm text-on-surface-variant font-medium cursor-pointer leading-tight select-none">
                      Я даю свое согласие на обработку персональных данных и соглашаюсь с политикой конфиденциальности клиники.
                    </label>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-200 flex items-center gap-3">
                      <span className="material-symbols-outlined">error</span>
                      {error}
                    </p>
                  )}

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-[#1a2417] disabled:bg-primary/50 text-white py-6 px-8 rounded-xl font-headline font-bold text-base md:text-lg uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>Отправка данных...</span>
                        </>
                      ) : (
                        <>
                          <span>Получить план лечения</span>
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </>
                      )}
                    </button>
                    <div className="text-center mt-4 text-xs font-bold text-outline-variant uppercase tracking-widest flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">lock</span> Ваши данные надежно защищены
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] flex flex-col gap-3 pointer-events-none">
          {/* Scroll Up */}
          <div className={`pointer-events-auto transition-all duration-300 transform ${showScrollUp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 shadow-none pointer-events-none'}`}>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 md:w-14 md:h-14 bg-white text-emerald-950 rounded-full shadow-2xl border border-outline-variant/20 flex items-center justify-center hover:bg-surface-variant transition-all hover:scale-110 active:scale-90"
              aria-label="Наверх"
            >
              <span className="material-symbols-outlined font-black text-xl md:text-2xl">arrow_upward</span>
            </button>
          </div>
          
          {/* Scroll Down to Form */}
          <div className={`pointer-events-auto transition-all duration-300 transform ${showScrollDown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 shadow-none pointer-events-none absolute bottom-0 right-0 invisible'}`}>
            <button 
              onClick={scrollToForm}
              className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:bg-[#1a2417] transition-all hover:scale-110 active:scale-90"
              aria-label="Вниз к форме"
            >
              <span className="material-symbols-outlined font-black text-xl md:text-2xl animate-bounce mt-1">arrow_downward</span>
            </button>
          </div>
        </div>

      </main>
    </>
  );
}
