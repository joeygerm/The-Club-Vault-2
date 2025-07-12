import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaCheck } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 hover:text-primary-600 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaGlobe className="mr-1" />
        <span className="hidden md:inline">{t('nav.language')}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="py-1">
           {languages.map(({ code, name, flag }) => (
  <button
    key={code}
    onClick={() => changeLanguage(code)}
    className={`dropdown-item flex items-center justify-between w-full px-4 py-2 rounded text-[#F2F2F2] hover:bg-[#263A4F] ${
      i18n.language === code ? 'bg-[#3399FF]' : 'bg-[#1F1F1F]'
    }`}
  >
    <span className="flex gap-2 items-center">
      <span>{flag}</span>
      <span>{name}</span>
    </span>
    {i18n.language === code && <FaCheck className="text-[#3399FF]" />}
  </button>
))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
