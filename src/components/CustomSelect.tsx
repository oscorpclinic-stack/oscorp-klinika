import { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 px-0 cursor-pointer flex justify-between items-center transition-all hover:border-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-on-surface" : "text-outline-variant/50"}>
          {value || placeholder}
        </span>
        <span className={`material-symbols-outlined text-outline-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-surface-container-highest border border-outline-variant/20 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-md">
          <ul className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li 
                key={option}
                className={`px-5 py-4 cursor-pointer text-sm transition-all duration-200 ${
                  value === option 
                    ? 'bg-primary text-on-primary font-bold' 
                    : 'hover:bg-surface-variant text-on-surface font-medium'
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
