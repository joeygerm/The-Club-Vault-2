import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMemberships } from '../context/MembershipContext';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const { t } = useTranslation();
  const { memberships, isLoading } = useMemberships();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [filteredMemberships, setFilteredMemberships] = useState([]);

  // Apply search and filter
  useEffect(() => {
    if (memberships) {
      let result = [...memberships];
      
      // Apply type filter
      if (filter !== 'all') {
        result = result.filter(membership => membership.type === filter);
      }
      
      // Apply search
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        result = result.filter(membership => 
          membership.name.toLowerCase().includes(searchLower) || 
          membership.number.toLowerCase().includes(searchLower) ||
          (membership.notes && membership.notes.toLowerCase().includes(searchLower))
        );
      }
      
      // Sort by most recently created
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setFilteredMemberships(result);
    }
  }, [memberships, searchTerm, filter]);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{t('dashboard.title')}</h1>
        <Link
          to="/add"
          className="bg-gradient-to-r from-slate-700 to-cyan-600 hover:from-slate-800 hover:to-cyan-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          {t('membership.add')}
        </Link>
      </div>

      {memberships.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Search and Filter */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('dashboard.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'all'
                    ? 'bg-slate-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('dashboard.filterAll')}
              </button>
              <button
                onClick={() => setFilter('airline')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'airline'
                    ? 'bg-slate-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('dashboard.filterAirline')}
              </button>
              <button
                onClick={() => setFilter('hotel')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'hotel'
                    ? 'bg-slate-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('dashboard.filterHotel')}
              </button>
              <button
                onClick={() => setFilter('cruise')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'cruise'
                    ? 'bg-slate-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('dashboard.filterCruise')}
              </button>
              <button
                onClick={() => setFilter('other')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'other'
                    ? 'bg-slate-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('dashboard.filterOther')}
              </button>
            </div>
          </div>

          {/* Membership Cards */}
          {filteredMemberships.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">{t('dashboard.empty')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMemberships.map((membership) => (
                <motion.div
                  key={membership.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className={`h-2 ${
                    membership.type === 'airline' ? 'bg-blue-500' :
                    membership.type === 'hotel' ? 'bg-green-500' :
                    membership.type === 'cruise' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}></div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 mb-1">{membership.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{membership.number}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {t(`membership.${membership.type}`)}
                      </span>
                    </div>
                    
                    {membership.tier && (
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="font-medium">{t('membership.tier')}:</span> {membership.tier}
                      </p>
                    )}
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                      <Link
                        to={`/view/${membership.id}`}
                        className="text-cyan-600 hover:text-cyan-800 text-sm font-medium"
                      >
                        {t('membership.view')}
                      </Link>
                      <Link
                        to={`/edit/${membership.id}`}
                        className="text-slate-600 hover:text-slate-800 text-sm font-medium"
                      >
                        {t('membership.edit')}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Dashboard;
