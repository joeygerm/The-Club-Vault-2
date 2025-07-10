import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaCheck } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'de', name: 'Deutsch' }
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
  className="flex items-center text-[#F2F2F2] hover:text-[#3399FF] focus:outline-none bg-[#1F1F1F] p-2 rounded-md"
>
  <FaGlobe className="mr-1 text-[#3399FF]" />
  <span className="hidden md:inline">{t('navigation.language')}</span>
</button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="py-1">
            {languages.map((language) => (
              <button
  key={language.code}
  onClick={() => changeLanguage(language.code)}
  className={`dropdown-item flex items-center justify-between w-full px-4 py-2 rounded text-[#F2F2F2] hover:bg-[#263A4F] ${
  i18n.language === language.code ? 'bg-[#3399FF]' : 'bg-[#1F1F1F]'
}`}
>
  {language.name}
  {i18n.language === language.code && (
    <FaCheck className="text-[#3399FF]" />
  )}
</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
