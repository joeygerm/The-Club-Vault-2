import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMemberships } from '../context/MembershipContext';

const AddMembership = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addMembership } = useMemberships();
  
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    type: 'airline',
    tier: '',
    notes: '',
    website: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('membership.name') + ' is required';
    }
    
    if (!formData.number.trim()) {
      newErrors.number = t('membership.number') + ' is required';
    }
    
    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidUrl = (url) => {
    try {
      // If URL doesn't have protocol, add https://
      const urlWithProtocol = url.match(/^https?:\/\//) ? url : `https://${url}`;
      new URL(urlWithProtocol);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Format website URL if needed
      let website = formData.website;
      if (website && !website.match(/^https?:\/\//)) {
        website = `https://${website}`;
      }
      
      // Add the membership
      const newMembership = addMembership({
        ...formData,
        website
      });
      
      // Navigate to the view page for the new membership
      navigate(`/view/${newMembership.id}`);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('membership.add')}</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {/* Membership Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('membership.name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            {/* Membership Number */}
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                {t('membership.number')} *
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.number ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.number && <p className="mt-1 text-sm text-red-500">{errors.number}</p>}
            </div>
            
            {/* Membership Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                {t('membership.type')}
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="airline">{t('membership.airline')}</option>
                <option value="hotel">{t('membership.hotel')}</option>
                <option value="cruise">{t('membership.cruise')}</option>
                <option value="other">{t('membership.other')}</option>
              </select>
            </div>
            
            {/* Tier/Status Level */}
            <div>
              <label htmlFor="tier" className="block text-sm font-medium text-gray-700 mb-1">
                {t('membership.tier')}
              </label>
              <input
                type="text"
                id="tier"
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            
            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                {t('membership.website')}
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.website ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
            </div>
            
            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                {t('membership.notes')}
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t('membership.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-slate-700 to-cyan-600 hover:from-slate-800 hover:to-cyan-700 text-white rounded-md"
            >
              {t('membership.save')}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddMembership;
