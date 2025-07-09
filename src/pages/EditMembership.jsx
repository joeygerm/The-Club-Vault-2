import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMemberships } from '../context/MembershipContext';

const EditMembership = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMembership, updateMembership, deleteMembership } = useMemberships();
  
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    type: 'airline',
    tier: '',
    notes: '',
    website: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const membership = getMembership(id);
    if (membership) {
      setFormData(membership);
    } else {
      navigate('/');
    }
    setIsLoading(false);
  }, [id, getMembership, navigate]);
  
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
      
      // Update the membership
      updateMembership(id, {
        ...formData,
        website
      });
      
      // Navigate back to the view page
      navigate(`/view/${id}`);
    }
  };
  
  const handleDelete = () => {
    deleteMembership(id);
    navigate('/');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">{t('membership.edit')}</h1>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            {t('membership.delete')}
          </button>
        </div>
        
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
              onClick={() => navigate(`/view/${id}`)}
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
        
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md mx-4"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-3">{t('membership.deleteConfirm')}</h3>
              <p className="text-gray-500 mb-5">
                This action cannot be undone. This will permanently delete the membership.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  {t('membership.deleteNo')}
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  {t('membership.deleteYes')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EditMembership;
