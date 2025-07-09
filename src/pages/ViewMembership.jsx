import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMemberships } from '../context/MembershipContext';

const ViewMembership = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMembership } = useMemberships();
  
  const [membership, setMembership] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const membershipData = getMembership(id);
    if (membershipData) {
      setMembership(membershipData);
    } else {
      navigate('/');
    }
    setIsLoading(false);
  }, [id, getMembership, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }
  
  if (!membership) {
    return null;
  }
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'airline':
        return 'bg-blue-500';
      case 'hotel':
        return 'bg-green-500';
      case 'cruise':
        return 'bg-purple-500';
      default:
        return 'bg-orange-500';
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
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-slate-600 hover:text-slate-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </Link>
          <Link
            to={`/edit/${id}`}
            className="text-cyan-600 hover:text-cyan-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            {t('membership.edit')}
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className={`h-2 ${getTypeColor(membership.type)}`}></div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-slate-800">{membership.name}</h1>
              <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                {t(`membership.${membership.type}`)}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">{t('membership.number')}</h2>
                <p className="text-lg text-gray-800">{membership.number}</p>
              </div>
              
              {membership.tier && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500">{t('membership.tier')}</h2>
                  <p className="text-lg text-gray-800">{membership.tier}</p>
                </div>
              )}
              
              {membership.website && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500">{t('membership.website')}</h2>
                  <a
                    href={membership.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 hover:text-cyan-800 hover:underline"
                  >
                    {membership.website}
                  </a>
                </div>
              )}
              
              {membership.notes && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500">{t('membership.notes')}</h2>
                  <p className="text-gray-800 whitespace-pre-line">{membership.notes}</p>
                </div>
              )}
              
              {membership.createdAt && (
                <div className="pt-4 mt-4 border-t border-gray-100 text-sm text-gray-500">
                  Added on {new Date(membership.createdAt).toLocaleDateString()}
                  {membership.updatedAt && ` • Last updated on ${new Date(membership.updatedAt).toLocaleDateString()}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewMembership;
