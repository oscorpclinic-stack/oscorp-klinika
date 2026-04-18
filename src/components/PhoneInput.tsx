import { useState, useRef, useEffect } from 'react';

interface Country {
  code: string;
  dial: string;
  flag: string;
}

const countries: Country[] = [
  { code: "AZ", dial: "+994", flag: "🇦🇿" },
  { code: "TR", dial: "+90", flag: "🇹🇷" },
  { code: "RU", dial: "+7", flag: "🇷🇺" },
  { code: "GE", dial: "+995", flag: "🇬🇪" },
  { code: "IR", dial: "+98", flag: "🇮🇷" },
  { code: "KZ", dial: "+7", flag: "🇰🇿" },
  { code: "UA", dial: "+380", flag: "🇺🇦" },
  { code: "UZ", dial: "+998", flag: "🇺🇿" },
  { code: "DE", dial: "+49", flag: "🇩🇪" },
  { code: "GB", dial: "+44", flag: "🇬🇧" },
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "FR", dial: "+33", flag: "🇫🇷" },
  { code: "IT", dial: "+39", flag: "🇮🇹" },
  { code: "ES", dial: "+34", flag: "🇪🇸" },
  { code: "AE", dial: "+971", flag: "🇦🇪" },
  { code: "SA", dial: "+966", flag: "🇸🇦" },
  { code: "IL", dial: "+972", flag: "🇮🇱" },
  { code: "CN", dial: "+86", flag: "🇨🇳" },
  { code: "IN", dial: "+91", flag: "🇮🇳" },
  { code: "BY", dial: "+375", flag: "🇧🇾" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  compact?: boolean;
}

export default function PhoneInput({ value, onChange, className = "", required, compact }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Country>(countries[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract the local number (everything after the dial code)
  const getLocalNumber = () => {
    if (value.startsWith(selected.dial)) {
      return value.slice(selected.dial.length).trimStart();
    }
    // Check if value starts with any known dial code
    for (const c of countries) {
      if (value.startsWith(c.dial)) {
        setSelected(c);
        return value.slice(c.dial.length).trimStart();
      }
    }
    return value.replace(/^\+\d+\s*/, '');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelected(country);
    const localNum = getLocalNumber();
    onChange(`${country.dial} ${localNum}`);
    setIsOpen(false);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localNum = e.target.value;
    onChange(`${selected.dial} ${localNum}`);
  };

  const py = compact ? "py-3" : "py-4.5";
  const text = compact ? "text-base" : "text-base";

  return (
    <div className={`relative flex ${className}`} ref={dropdownRef}>
      {/* Country Code Selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 ${py} px-3 bg-surface-container-lowest border border-outline-variant/30 border-r-0 rounded-l-xl hover:bg-surface-container-low transition-colors shrink-0`}
      >
        <span className="text-lg leading-none">{selected.flag}</span>
        <span className={`${text} font-medium text-emerald-950 whitespace-nowrap`}>{selected.dial}</span>
        <span className={`material-symbols-outlined text-outline-variant text-sm transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Phone Number Input */}
      <input
        required={required}
        value={getLocalNumber()}
        onChange={handleNumberChange}
        className={`w-full bg-surface-container-lowest border border-outline-variant/30 rounded-r-xl ${py} px-4 focus:ring-1 focus:ring-primary outline-none transition-all ${text} font-medium`}
        placeholder="-- --- -- --"
        type="tel"
      />

      {/* Country Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-64 mt-1 bg-surface-container-highest border border-outline-variant/20 rounded-xl shadow-2xl z-[200] overflow-hidden backdrop-blur-md">
          <ul className="max-h-52 overflow-y-auto">
            {countries.map((country) => (
              <li
                key={`${country.code}-${country.dial}`}
                className={`px-4 py-3 cursor-pointer text-sm transition-all duration-200 flex items-center gap-3 ${
                  selected.code === country.code && selected.dial === country.dial
                    ? 'bg-primary text-on-primary font-bold'
                    : 'hover:bg-surface-variant text-on-surface font-medium'
                }`}
                onClick={() => handleCountrySelect(country)}
              >
                <span className="text-lg">{country.flag}</span>
                <span className="font-bold">{country.code}</span>
                <span className="opacity-70">{country.dial}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
