interface InteractiveOdontogramProps {
  selectedTeeth: string[];
  onToggleTooth: (toothId: string) => void;
}

const upperTeeth = [
  { id: '18', type: 'molar', label: '8' }, { id: '17', type: 'molar', label: '7' }, { id: '16', type: 'molar', label: '6' }, { id: '15', type: 'premolar', label: '5' }, { id: '14', type: 'premolar', label: '4' }, { id: '13', type: 'canine', label: '3' }, { id: '12', type: 'incisor', label: '2' }, { id: '11', type: 'incisor', label: '1' },
  { id: '21', type: 'incisor', label: '1' }, { id: '22', type: 'incisor', label: '2' }, { id: '23', type: 'canine', label: '3' }, { id: '24', type: 'premolar', label: '4' }, { id: '25', type: 'premolar', label: '5' }, { id: '26', type: 'molar', label: '6' }, { id: '27', type: 'molar', label: '7' }, { id: '28', type: 'molar', label: '8' }
];

const lowerTeeth = [
  { id: '48', type: 'molar', label: '8' }, { id: '47', type: 'molar', label: '7' }, { id: '46', type: 'molar', label: '6' }, { id: '45', type: 'premolar', label: '5' }, { id: '44', type: 'premolar', label: '4' }, { id: '43', type: 'canine', label: '3' }, { id: '42', type: 'incisor', label: '2' }, { id: '41', type: 'incisor', label: '1' },
  { id: '31', type: 'incisor', label: '1' }, { id: '32', type: 'incisor', label: '2' }, { id: '33', type: 'canine', label: '3' }, { id: '34', type: 'premolar', label: '4' }, { id: '35', type: 'premolar', label: '5' }, { id: '36', type: 'molar', label: '6' }, { id: '37', type: 'molar', label: '7' }, { id: '38', type: 'molar', label: '8' }
];

export default function InteractiveOdontogram({ selectedTeeth, onToggleTooth }: InteractiveOdontogramProps) {
  
  const getToothClasses = (id: string, type: string, isUpper: boolean) => {
    const isSelected = selectedTeeth.includes(id);
    let base = "relative flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden border backdrop-blur-md ";
    
    // Shape logic
    if (type === 'molar') base += "w-8 h-12 sm:w-10 sm:h-14 rounded-md ";
    if (type === 'premolar') base += "w-7 h-10 sm:w-8 sm:h-12 rounded-lg ";
    if (type === 'canine') base += "w-6 h-10 sm:w-7 sm:h-12 rounded-full ";
    if (type === 'incisor') base += "w-6 h-10 sm:w-7 sm:h-12 " + (isUpper ? "rounded-b-full rounded-t-sm" : "rounded-t-full rounded-b-sm") + " ";

    // Color logic (Glassy HUD style matching OSCORP)
    if (isSelected) {
      base += "bg-primary/90 border-primary shadow-[0_0_20px_rgba(76,107,34,0.5)] scale-110 z-10 text-white font-bold";
    } else {
      base += "bg-white/40 border-white/50 hover:border-primary hover:bg-white/70 text-emerald-950/80 font-medium hover:text-emerald-950 hover:scale-105";
    }
    
    return base;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-8 relative">
      
      {/* Upper Jaw */}
      <div className="mb-4 text-center w-full relative">
        <h3 className="text-emerald-950/30 text-[10px] font-bold tracking-[0.4em] uppercase mb-10 pointer-events-none">Upper Jaw</h3>
        
        {/* Curving arch container */}
        <div className="flex justify-center items-end gap-1 sm:gap-2 h-32 relative px-4">
          {upperTeeth.map((tooth, idx) => {
             const distFromCenter = Math.abs(idx - 7.5);
             const translateY = Math.pow(distFromCenter, 1.8) * 2.5; 
             const rotate = (idx - 7.5) * 5;

             return (
               <div 
                 key={tooth.id}
                 onClick={() => onToggleTooth(tooth.id)}
                 className={getToothClasses(tooth.id, tooth.type, true)}
                 style={{ transform: `translateY(${translateY}px) rotate(${rotate}deg)` }}
                 title={`Tooth ${tooth.id}`}
               >
                 <span className="text-[10px] sm:text-xs z-10">{tooth.id}</span>
               </div>
             )
          })}
        </div>
      </div>

      <div className="h-[2px] w-1/4 bg-primary/20 my-16 relative rounded-full"></div>

      {/* Lower Jaw */}
      <div className="mt-4 text-center w-full relative">
        <div className="flex justify-center items-start gap-1 sm:gap-2 h-32 relative px-4">
          {lowerTeeth.map((tooth, idx) => {
             const distFromCenter = Math.abs(idx - 7.5);
             const translateY = -(Math.pow(distFromCenter, 1.8) * 2.5); 
             const rotate = -(idx - 7.5) * 5;

             return (
               <div 
                 key={tooth.id}
                 onClick={() => onToggleTooth(tooth.id)}
                 className={getToothClasses(tooth.id, tooth.type, false)}
                 style={{ transform: `translateY(${translateY}px) rotate(${rotate}deg)` }}
                 title={`Tooth ${tooth.id}`}
               >
                 <span className="text-[10px] sm:text-xs z-10">{tooth.id}</span>
               </div>
             )
          })}
        </div>
        <h3 className="text-emerald-950/30 text-[10px] font-bold tracking-[0.4em] uppercase mt-10 pointer-events-none">Lower Jaw</h3>
      </div>

    </div>
  );
}
