import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import logoImage from '../assets/logo.svg';
import i18n from '../i18n'; // adjust the path if needed

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-r from-slate-700 to-cyan-600 text-white py-6 shadow-md">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-8"
        >
          <img src={logoImage} alt="The Club Vault Logo" className="h-48" />
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('app.title')}</h1>
            <p className="text-lg text-cyan-100">{t('app.subtitle')}</p>
            <motion.h1
  key={i18n.language}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="text-xl font-bold text-center text-[#F2F2F2] mt-2"
>
  {t('app.welcome')}
</motion.h1>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;