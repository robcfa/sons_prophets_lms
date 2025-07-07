import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Award, DollarSign, Calendar } from 'lucide-react';

const CoachCard = ({ 
  coach, 
  showBookButton = true, 
  onBook,
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/coach/${coach?.id}`);
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    onBook?.(coach);
  };

  if (!coach) {
    return null;
  }

  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={handleViewProfile}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              {coach?.avatar_url ? (
                <img
                  src={coach.avatar_url}
                  alt={coach?.full_name || 'Coach'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {coach?.full_name || 'Coach Name'}
            </h3>
            <p className="text-blue-600 font-medium text-sm">
              {coach?.ministry_focus || 'Spiritual Coach'}
            </p>
            
            {/* Location and Experience */}
            <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
              {coach?.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{coach.location}</span>
                </div>
              )}
              {coach?.years_experience > 0 && (
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>{coach.years_experience} yrs</span>
                </div>
              )}
            </div>
          </div>

          {/* Rate */}
          {coach?.coaching_rate && (
            <div className="flex-shrink-0 text-right">
              <div className="flex items-center text-green-600 font-semibold">
                <DollarSign className="w-4 h-4" />
                <span>{coach.coaching_rate}</span>
              </div>
              <div className="text-xs text-gray-500">per session</div>
            </div>
          )}
        </div>

        {/* Bio */}
        {coach?.bio && (
          <p className="mt-4 text-gray-600 text-sm line-clamp-3">
            {coach.bio}
          </p>
        )}

        {/* Spiritual Gifts */}
        {coach?.spiritual_gifts && coach.spiritual_gifts.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {coach.spiritual_gifts.slice(0, 3).map((gift, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {gift}
                </span>
              ))}
              {coach.spiritual_gifts.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  +{coach.spiritual_gifts.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between">
          <button
            onClick={handleViewProfile}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            View Profile
          </button>
          
          {showBookButton && coach?.is_available_for_coaching && (
            <button
              onClick={handleBookClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1"
            >
              <Calendar className="w-4 h-4" />
              <span>Book</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachCard;