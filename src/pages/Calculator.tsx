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
    <div className="min-h-screen bg-[#f1f5f9] font-body selection:bg-cyan-500/30">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-8 max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-cyan-600 font-bold tracking-widest text-sm uppercase mb-3">Интерактивный Калькулятор</h3>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-800 mb-4">Спланируйте свою идеальную улыбку</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            Оцените примерную стоимость и сроки лечения на основе ваших целей. Интерактивно. Бесплатно. Персонально.
          </p>
        </div>

        {/* The Calculator Main Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a] rounded-[2.5rem] p-4 lg:p-8 shadow-2xl relative overflow-hidden flex flex-col xl:flex-row gap-6 border border-slate-700/50"
        >
          {/* subtle glowing background blob inside widget */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          {/* COLUMN 1: Inputs */}
          <div className="w-full xl:w-[280px] flex flex-col gap-6 relative z-10">
            
            {/* Box 1: Goals */}
            <div className="bg-[#1e293b] rounded-2xl p-5 border border-slate-600/30 shadow-lg">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2"><span className="text-cyan-400">01.</span> Выберите цели</h4>
              <div className="space-y-3">
                {GOALS.map(g => (
                  <label key={g.id} className="flex items-start gap-3 cursor-pointer group" onClick={() => toggleGoal(g.id)}>
                    <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all mt-0.5 ${selectedGoals.includes(g.id) ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-800 border-slate-500 group-hover:border-cyan-400'}`}>
                      {selectedGoals.includes(g.id) && <span className="material-symbols-outlined text-[14px] text-white font-bold">check</span>}
                    </div>
                    <span className={`text-sm transition-colors ${selectedGoals.includes(g.id) ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{g.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Box 2: Method */}
            <div className="bg-[#1e293b] rounded-2xl p-5 border border-slate-600/30 shadow-lg">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2"><span className="text-cyan-400">02.</span> Метод лечения</h4>
              <div className="flex flex-wrap gap-2">
                {METHODS.map(m => (
                  <button 
                    key={m.id}
                    onClick={() => setPreferredMethod(m.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${preferredMethod === m.id ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Box 3: Loyalty */}
            <div className="bg-[#1e293b] rounded-2xl p-5 border border-slate-600/30 shadow-lg">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2"><span className="text-cyan-400">03.</span> Статус пациента</h4>
              <div className="space-y-3">
                {LOYALTY.map(l => (
                  <label key={l.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => setLoyalty(l.id)}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${loyalty === l.id ? 'border-cyan-400' : 'border-slate-500 group-hover:border-cyan-400'}`}>
                      {loyalty === l.id && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>}
                    </div>
                    <span className={`text-sm transition-colors ${loyalty === l.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{l.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 2: The Interactive Jaw */}
          <div className="flex-1 bg-[#1e293b]/50 rounded-[2rem] border border-cyan-500/20 shadow-inner relative flex flex-col overflow-hidden min-h-[500px]">
            <div className="p-6 flex items-center justify-between z-10 w-full">
              <h4 className="text-white font-bold flex items-center gap-2"><span className="text-cyan-400">04.</span> Выберите зубы на схеме</h4>
              <div className="flex gap-4 items-center">
                 <span className="text-slate-400 text-xs">Выбрано: <strong className="text-cyan-400 text-sm">{selectedTeeth.length}</strong></span>
                 <button onClick={selectAllTeeth} className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded bg-slate-700/50 hover:bg-cyan-500/20 transition-all">Все зубы</button>
                 <button onClick={() => setSelectedTeeth([])} className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded bg-slate-700/50 hover:bg-red-500/20 transition-all">Сброс</button>
              </div>
            </div>
            
            {/* 3D-like container */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-0 mt-4 overflow-y-auto overflow-x-hidden">
               <InteractiveOdontogram 
                 selectedTeeth={selectedTeeth} 
                 onToggleTooth={toggleTooth} 
               />
               <div className="mt-8 text-center">
                 <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 text-[10px] uppercase font-bold tracking-widest bg-[#0f172a]/50 backdrop-blur-sm shadow-[0_0_10px_rgba(6,182,212,0.2)]">360° Интерактивная Панель</span>
               </div>
            </div>
          </div>

          {/* COLUMN 3: Results Panel */}
          <div className="w-full xl:w-[320px] flex flex-col gap-6 relative z-10">
            <h4 className="text-white font-bold flex items-center gap-2 px-1"><span className="text-cyan-400">05.</span> Результат</h4>
            
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-600/30 shadow-lg flex-1 flex flex-col gap-8">
              
              {/* Complexity */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">Сложность лечения</span>
                </div>
                {/* Custom half-circle gauge or simple bar */}
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
                   <div 
                     className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                     style={{ width: `${results.complexity}%` }}
                   ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">
                  <span>Низкая</span>
                  <span className="text-cyan-400">{results.complexity}%</span>
                  <span>Высокая</span>
                </div>
              </div>

              {/* Time */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">Срок лечения (примерно)</span>
                </div>
                <div className="flex gap-1 h-3">
                  {[...Array(10)].map((_, i) => {
                     const activeBlocks = Math.ceil((results.complexity / 100) * 10);
                     return (
                       <div key={i} className={`flex-1 rounded-sm transition-colors duration-500 ${i < activeBlocks ? 'bg-cyan-500' : 'bg-slate-800'}`}></div>
                     )
                  })}
                </div>
                <div className="text-right mt-1">
                  <span className="text-cyan-400 font-bold text-sm">{results.time}</span>
                  <p className="text-[10px] text-slate-500">* Зависит от первичного осмотра</p>
                </div>
              </div>

              {/* Specialists */}
              <div>
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-3">Рекомендуемые специалисты</span>
                <div className="flex items-center gap-3 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border border-slate-600">
                    <img src="https://ui-avatars.com/api/?name=Zargarov+S&background=0284c7&color=fff" alt="Doctor" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold leading-tight">Dr. Shirhan Zargarov</h5>
                    <span className="text-cyan-500 text-[10px] font-medium tracking-wide">Главный хирург-имплантолог</span>
                  </div>
                </div>
              </div>

              {/* Cost Range */}
              <div className="mt-auto pt-6 border-t border-slate-700/50">
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-2">Ориентировочная стоимость</span>
                <div className="flex items-end justify-between">
                   {selectedGoals.length === 0 && selectedTeeth.length === 0 ? (
                     <div className="text-slate-500 text-sm">Выберите параметры для расчета</div>
                   ) : (
                     <>
                        <div className="text-3xl font-headline font-bold text-white tracking-tight">
                          ${results.minCost} - ${results.maxCost}*
                        </div>
                     </>
                   )}
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-tight">
                  * Данный расчет является предварительным и не заменяет очную консультацию. Итоговая стоимость фиксируется только после 3D компьютерной томографии.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/contact" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all transform hover:-translate-y-1">
             Записаться на полную диагностику
          </Link>
          <Link to="/promo" className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-full font-bold shadow-sm transition-all text-center">
             Узнать больше о пакетах
          </Link>
        </div>

      </main>
    </div>
  );
}
