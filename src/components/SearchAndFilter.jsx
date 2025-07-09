import { useState, useEffect } from 'react'
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemberships } from '../context/MembershipContext'

const SearchAndFilter = () => {
  const { searchTerm, setSearchTerm, filterType, setFilterType } = useMemberships()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleFilterChange = (type) => {
    setFilterType(type)
    setIsFilterOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterOpen && !event.target.closest('.filter-container')) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFilterOpen])

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10 pr-10"
            placeholder="Search memberships..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={clearSearch}
            >
              <FaTimes className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        <div className="relative filter-container">
          <button
            className="btn btn-outline flex items-center"
            onClick={toggleFilter}
          >
            <FaFilter className="mr-2" />
            {filterType === 'all' ? 'All Types' : 
              filterType === 'airline' ? 'Airlines' :
              filterType === 'hotel' ? 'Hotels' :
              filterType === 'cruise' ? 'Cruise Lines' : 'Other'}
          </button>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 overflow-hidden"
              >
                <div className="py-1">
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${
                      filterType === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleFilterChange('all')}
                  >
                    All Types
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${
                      filterType === 'airline' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleFilterChange('airline')}
                  >
                    Airlines
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${
                      filterType === 'hotel' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleFilterChange('hotel')}
                  >
                    Hotels
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${
                      filterType === 'cruise' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleFilterChange('cruise')}
                  >
                    Cruise Lines
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${
                      filterType === 'other' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleFilterChange('other')}
                  >
                    Other
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter
