import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useMemberships } from '../context/MembershipContext'

const MembershipCard = ({ membership }) => {
  const { deleteMembership } = useMemberships()
  
  const getBadgeClass = (type) => {
    switch (type) {
      case 'airline':
        return 'badge-airline'
      case 'hotel':
        return 'badge-hotel'
      case 'cruise':
        return 'badge-cruise'
      default:
        return 'badge-other'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'airline':
        return 'Airline'
      case 'hotel':
        return 'Hotel'
      case 'cruise':
        return 'Cruise Line'
      default:
        return 'Other'
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to delete ${membership.name}?`)) {
      deleteMembership(membership.id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden"
    >
      <Link to={`/view/${membership.id}`} className="block h-full">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{membership.name}</h3>
              <span className={`badge ${getBadgeClass(membership.type)}`}>
                {getTypeLabel(membership.type)}
              </span>
            </div>
            <div className="flex space-x-2">
              <Link 
                to={`/edit/${membership.id}`} 
                className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaEdit />
              </Link>
              <button 
                onClick={handleDelete}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Member ID:</span> {membership.memberId}
            </p>
            {membership.tierLevel && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Tier/Status:</span> {membership.tierLevel}
              </p>
            )}
          </div>
          
          {membership.notes && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">{membership.notes}</p>
          )}
          
          {membership.websiteUrl && (
            <div className="mt-4">
              <a
                href={membership.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Website <FaExternalLinkAlt className="ml-1" />
              </a>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default MembershipCard
