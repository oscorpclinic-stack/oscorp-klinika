import { useState, useRef, useEffect } from 'react';

interface Country {
  code: string;
  dial: string;
}

const countries: Country[] = [
  { code: "az", dial: "+994" },
  { code: "tr", dial: "+90" },
  { code: "ru", dial: "+7" },
  { code: "ge", dial: "+995" },
  { code: "ir", dial: "+98" },
  { code: "kz", dial: "+7" },
  { code: "ua", dial: "+380" },
  { code: "uz", dial: "+998" },
  { code: "de", dial: "+49" },
  { code: "gb", dial: "+44" },
  { code: "us", dial: "+1" },
  { code: "fr", dial: "+33" },
  { code: "it", dial: "+39" },
  { code: "es", dial: "+34" },
  { code: "ae", dial: "+971" },
  { code: "sa", dial: "+966" },
  { code: "il", dial: "+972" },
  { code: "cn", dial: "+86" },
  { code: "in", dial: "+91" },
  { code: "by", dial: "+375" },
];

function FlagImg({ code, size = 20 }: { code: string; size?: number }) {
  return (
    <img
      src={`https://flagcdn.com/w${size}/${code}.png`}
      srcSet={`https://flagcdn.com/w${size * 2}/${code}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={code.toUpperCase()}
      className="inline-block rounded-sm object-cover"
      style={{ minWidth: size }}
    />
  );
}

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

  const getLocalNumber = () => {
    if (value.startsWith(selected.dial)) {
      return value.slice(selected.dial.length).trimStart();
    }
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
  const text = "text-base";

  return (
    <div className={`relative flex ${className}`} ref={dropdownRef}>
      {/* Country Code Selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${py} px-3 bg-surface-container-lowest border border-outline-variant/30 border-r-0 rounded-l-xl hover:bg-surface-container-low transition-colors shrink-0`}
      >
        <FlagImg code={selected.code} size={22} />
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
                <FlagImg code={country.code} size={20} />
                <span className="font-bold uppercase">{country.code}</span>
                <span className="opacity-70">{country.dial}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
