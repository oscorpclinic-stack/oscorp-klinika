import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InteractiveOdontogram from '../components/InteractiveOdontogram';

const GOALS = [
  { id: 'straighten', label: 'Выравнивание зубов (Брекеты/Элайнеры)' },
  { id: 'replace', label: 'Восстановление отсутствующих зубов' },
  { id: 'whiten', label: 'Отбеливание и чистка' },
  { id: 'makeover', label: 'Полная эстетическая реставрация' }
];

const METHODS = [
  { id: 'aligners', label: 'Элайнеры' },
  { id: 'veneers', label: 'Виниры' },
  { id: 'implants', label: 'Импланты' }
];

const LOYALTY = [
  { id: 'primary', label: 'Первичное обращение' },
  { id: 'returning', label: 'Повторный пациент (Скидка 10%)' }
];

export default function Calculator() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [preferredMethod, setPreferredMethod] = useState<string>('implants');
  const [loyalty, setLoyalty] = useState<string>('primary');
  const [selectedTeeth, setSelectedTeeth] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleTooth = (id: string) => {
    setSelectedTeeth(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const selectAllTeeth = () => {
    // Generate all 32 IDs
    const upper = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
    const lower = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
    setSelectedTeeth([...upper, ...lower].map(String));
  };

  // --- Dynamic Business Logic Demostration ---
  const results = useMemo(() => {
    let complexity = 10;
    let timeWeeks = 1;
    let minCost = 50; // Initial consult
    let maxCost = 150;

    // Goals multipliers
    if (selectedGoals.includes('straighten')) { complexity += 40; timeWeeks += 52; minCost += 1500; maxCost += 3500; }
    if (selectedGoals.includes('replace')) { complexity += 20; timeWeeks += 12; }
    if (selectedGoals.includes('whiten')) { complexity += 5; timeWeeks += 1; minCost += 200; maxCost += 400; }
    if (selectedGoals.includes('makeover')) { complexity += 50; timeWeeks += 16; minCost += 4000; maxCost += 12000; }

    // Logic strictly based on teeth count
    const count = selectedTeeth.length;
    if (count > 0) {
      if (preferredMethod === 'implants') {
        minCost += count * 800;
        maxCost += count * 1500;
        timeWeeks += count * 2; // Time to heal
        complexity += count * 5;
      }
      if (preferredMethod === 'veneers') {
        minCost += count * 400;
        maxCost += count * 900;
        timeWeeks += 3;
        complexity += count * 2;
      }
      if (preferredMethod === 'aligners') {
        minCost += 2000; // Flat base
        maxCost += 4000;
        complexity += 30; // Constant regardless of teeth clicked usually, just for demo
      }
    }

    if (complexity > 100) complexity = 100;
    
    // Loyalty discount
    if (loyalty === 'returning') {
      minCost = Math.round(minCost * 0.9);
      maxCost = Math.round(maxCost * 0.9);
    }

    return {
      complexity,
      time: timeWeeks > 52 ? `${Math.floor(timeWeeks/52)} год${timeWeeks%52 > 0 ? '+' : ''}` : `${timeWeeks} нед.`,
      minCost: minCost.toLocaleString(),
      maxCost: maxCost.toLocaleString()
    };
  }, [selectedGoals, preferredMethod, loyalty, selectedTeeth]);

  return (
    <div className="min-h-screen bg-surface-container-lowest font-body selection:bg-primary/30">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-8 max-w-[1440px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-primary font-bold tracking-widest text-sm uppercase mb-3">Интерактивный Калькулятор</h3>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-emerald-950 mb-4">Спланируйте свою идеальную улыбку</h1>
          <p className="text-on-surface-variant font-medium max-w-2xl mx-auto">
            Оцените примерную стоимость и сроки лечения на основе ваших целей. Интерактивно. Бесплатно. Персонально.
          </p>
        </div>

        {/* The Calculator Main Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-[2.5rem] p-4 lg:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col xl:flex-row gap-6 border border-outline-variant/20"
        >
          {/* subtle glowing background blob inside widget */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* COLUMN 1: Inputs */}
          <div className="w-full xl:w-[300px] flex flex-col gap-6 relative z-10">
            
            {/* Box 1: Goals */}
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
              <h4 className="text-emerald-950 font-bold mb-5 flex items-center gap-2"><span className="text-primary">01.</span> Выберите цели</h4>
              <div className="space-y-4">
                {GOALS.map(g => (
                  <label key={g.id} className="flex items-start gap-3 cursor-pointer group" onClick={() => toggleGoal(g.id)}>
                    <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all mt-0.5 ${selectedGoals.includes(g.id) ? 'bg-primary border-primary' : 'bg-white border-outline-variant/50 group-hover:border-primary'}`}>
                      {selectedGoals.includes(g.id) && <span className="material-symbols-outlined text-[14px] text-white font-bold">check</span>}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${selectedGoals.includes(g.id) ? 'text-emerald-950' : 'text-on-surface-variant group-hover:text-emerald-950'}`}>{g.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Box 2: Method */}
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
              <h4 className="text-emerald-950 font-bold mb-5 flex items-center gap-2"><span className="text-primary">02.</span> Метод лечения</h4>
              <div className="flex flex-col sm:flex-row xl:flex-col gap-3">
                {METHODS.map(m => (
                  <button 
                    key={m.id}
                    onClick={() => setPreferredMethod(m.id)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all border ${preferredMethod === m.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-surface border-outline-variant/30 text-on-surface-variant hover:text-emerald-950 hover:border-primary/50'}`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Box 3: Loyalty */}
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
              <h4 className="text-emerald-950 font-bold mb-5 flex items-center gap-2"><span className="text-primary">03.</span> Статус пациента</h4>
              <div className="space-y-4">
                {LOYALTY.map(l => (
                  <label key={l.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => setLoyalty(l.id)}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${loyalty === l.id ? 'border-primary' : 'border-outline-variant/50 group-hover:border-primary'}`}>
                      {loyalty === l.id && <div className="w-3 h-3 rounded-full bg-primary shadow-sm"></div>}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${loyalty === l.id ? 'text-emerald-950' : 'text-on-surface-variant group-hover:text-emerald-950'}`}>{l.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 2: The Interactive Jaw */}
          <div className="flex-1 bg-surface-container-lowest rounded-[2rem] border border-outline-variant/30 shadow-inner relative flex flex-col overflow-hidden min-h-[500px]">
            <div className="p-6 flex items-center justify-between z-10 w-full bg-white/40 backdrop-blur-md border-b border-outline-variant/20">
              <h4 className="text-emerald-950 font-bold flex items-center gap-2"><span className="text-primary">04.</span> Выбор на 3D схеме</h4>
              <div className="flex gap-4 items-center">
                 <span className="text-on-surface-variant/80 text-xs font-medium">Выбрано: <strong className="text-primary text-sm">{selectedTeeth.length}</strong></span>
                 <button onClick={selectAllTeeth} className="text-xs font-bold text-emerald-950 hover:text-primary px-4 py-2 rounded-lg bg-surface border border-outline-variant/30 hover:border-primary/30 transition-all">Все зубы</button>
                 <button onClick={() => setSelectedTeeth([])} className="text-xs font-bold text-red-600 hover:text-red-700 px-4 py-2 rounded-lg bg-red-50 border border-red-100 hover:border-red-300 transition-all">Сброс</button>
              </div>
            </div>
            
            {/* 3D-like container */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-0 mt-4 overflow-y-auto overflow-x-hidden">
               {/* 3D Image Overaly BG */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-20 pointer-events-none rounded-[3rem] overflow-hidden mix-blend-multiply">
                 <img src="/images/tech-jaw.png" alt="3D Dental Jaw Model" className="w-full h-full object-contain filter drop-shadow-2xl" />
               </div>

               <div className="relative z-10 w-full">
                 <InteractiveOdontogram 
                   selectedTeeth={selectedTeeth} 
                   onToggleTooth={toggleTooth} 
                 />
               </div>
               <div className="mt-8 text-center relative z-20">
                 <span className="px-5 py-2 rounded-full border border-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest bg-white shadow-sm flex flex-col items-center gap-1">
                   <span>Ориентир</span>
                   <span className="material-symbols-outlined text-lg opacity-50">Keyboard_double_arrow_up</span>
                 </span>
               </div>
            </div>
          </div>

          {/* COLUMN 3: Results Panel */}
          <div className="w-full xl:w-[340px] flex flex-col gap-6 relative z-10">
            <h4 className="text-emerald-950 font-bold flex items-center gap-2 px-1"><span className="text-primary">05.</span> Результат</h4>
            
            <div className="bg-emerald-950 text-white rounded-2xl p-8 shadow-2xl flex-1 flex flex-col gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>

              {/* Complexity */}
              <div className="relative z-10">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-white/80 font-medium">Сложность лечения</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
                   <div 
                     className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 via-primary to-[#b3c6ab] rounded-full transition-all duration-1000 ease-out"
                     style={{ width: `${results.complexity}%` }}
                   ></div>
                </div>
                <div className="flex justify-between text-[10px] text-white/50 mt-2 uppercase font-bold tracking-wider">
                  <span>Базовая</span>
                  <span className="text-primary-fixed-variant">{results.complexity}%</span>
                  <span>Высокая</span>
                </div>
              </div>

              {/* Time */}
              <div className="relative z-10">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-white/80 font-medium">Срок лечения (примерно)</span>
                </div>
                <div className="flex gap-1 h-3">
                  {[...Array(10)].map((_, i) => {
                     const activeBlocks = Math.ceil((results.complexity / 100) * 10);
                     return (
                       <div key={i} className={`flex-1 rounded-sm transition-colors duration-500 shadow-sm ${i < activeBlocks ? 'bg-primary' : 'bg-white/10'}`}></div>
                     )
                  })}
                </div>
                <div className="text-right mt-2">
                  <span className="text-[#b3c6ab] font-bold text-base">{results.time}</span>
                  <p className="text-[10px] text-white/40 leading-tight mt-1">* Точный срок зависит от осмотра</p>
                </div>
              </div>

              {/* Specialists */}
              <div className="relative z-10">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest block mb-3">Рекомендуемый Эксперт</span>
                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 shrink-0">
                    <img src="https://ui-avatars.com/api/?name=Zargarov+S&background=4c6b22&color=fff" alt="Doctor" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold leading-tight mb-0.5">Dr. Shirhan Zargarov</h5>
                    <span className="text-primary-fixed-variant text-[10px] font-medium tracking-wide">Главный врач, имплантолог</span>
                  </div>
                </div>
              </div>

              {/* Cost Range */}
              <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest block mb-2">Ориентировочная сумма</span>
                <div className="flex items-end justify-between">
                   {selectedGoals.length === 0 && selectedTeeth.length === 0 ? (
                     <div className="text-white/40 text-sm italic">Выберите параметры для расчета</div>
                   ) : (
                     <>
                        <div className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tight flex items-baseline gap-1">
                          ${results.minCost} <span className="text-lg opacity-50 font-normal">до</span> ${results.maxCost}*
                        </div>
                     </>
                   )}
                </div>
                <p className="text-[10px] text-white/40 mt-3 leading-relaxed border-l-2 border-primary/30 pl-2">
                  * Не является офертой. Итоговая стоимость фиксируется только после 3D компьютерной томографии.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-[#1a2417] text-white rounded-full font-bold shadow-xl shadow-primary/20 transition-all transform hover:-translate-y-1 tracking-wide">
             Записаться на полную диагностику
          </Link>
          <Link to="/promo" className="w-full sm:w-auto px-10 py-5 bg-white hover:bg-surface-variant text-emerald-950 border border-outline-variant/30 rounded-full font-bold shadow-sm transition-all text-center tracking-wide">
             Узнать больше о пакетах
          </Link>
        </div>

      </main>
    </div>
  );
}
