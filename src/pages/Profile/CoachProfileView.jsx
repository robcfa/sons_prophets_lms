import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Globe, 
  Heart, 
  Award, 
  DollarSign, 
  Calendar,
  Star,
  Eye,
  Phone,
  Mail
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import profileService from '../../utils/profileService';
import { safeGet } from '../../utils/safeObjectUtils';

const CoachProfileView = () => {
  const { coachId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewsCount, setViewsCount] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    loadCoachProfile();
  }, [coachId]);

  const loadCoachProfile = async () => {
    // Validate coachId is a valid UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    
    if (!coachId) {
      setError('Coach ID not provided');
      setLoading(false);
      return;
    }

    if (!uuidRegex.test(coachId)) {
      setError('Invalid coach ID format. Please check the URL.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const result = await profileService.getProfile(coachId);
      
      if (result?.success) {
        setCoach(result.data);
        
        // Record view if user is authenticated and viewing someone else's profile
        if (user?.id && user.id !== coachId) {
          await profileService.recordProfileView(coachId, user.id);
        }
        
        // Get views count
        const viewsResult = await profileService.getProfileViewsCount(coachId);
        if (viewsResult?.success) {
          setViewsCount(viewsResult.data || 0);
        }
      } else {
        setError(result?.error || 'Failed to load coach profile');
      }
    } catch (error) {
      console.error('Error loading coach profile:', error);
      setError('Error loading profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setBookingModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!coach) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">Coach profile not found.</p>
          <button
            onClick={() => navigate('/coaches')}
            className="mt-2 text-yellow-600 hover:text-yellow-800 underline"
          >
            View all coaches
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cover/Banner Area */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6 -mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            {/* Avatar */}
            <div className="relative mb-4 md:mb-0">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white p-2 shadow-lg">
                {safeGet(coach, 'avatar_url') ? (
                  <img
                    src={coach.avatar_url}
                    alt={safeGet(coach, 'full_name', 'Coach')}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              {safeGet(coach, 'status') === 'active' && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            {/* Name and Title */}
            <div className="flex-1 md:mt-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {safeGet(coach, 'full_name', 'Coach Name')}
              </h1>
              <p className="text-lg text-blue-600 font-medium mb-2">
                {safeGet(coach, 'ministry_focus', 'Spiritual Coach')}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {safeGet(coach, 'location') && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{coach.location}</span>
                  </div>
                )}
                {safeGet(coach, 'years_experience', 0) > 0 && (
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{coach.years_experience} years experience</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{viewsCount} views</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 md:mt-8">
              {safeGet(coach, 'is_available_for_coaching') && (
                <button
                  onClick={handleBookingClick}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book with Me</span>
                </button>
              )}
              {safeGet(coach, 'coaching_rate') && (
                <div className="text-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 inline" />
                  ${coach.coaching_rate}/session
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      {safeGet(coach, 'bio') && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">{coach.bio}</p>
        </div>
      )}

      {/* Coaching Information */}
      {safeGet(coach, 'coaching_bio') && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            <Heart className="w-5 h-5 inline mr-2" />
            Coaching Approach
          </h2>
          <p className="text-gray-700 leading-relaxed">{coach.coaching_bio}</p>
        </div>
      )}

      {/* Spiritual Gifts & Ministry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spiritual Gifts */}
        {safeGet(coach, 'spiritual_gifts') && Array.isArray(coach.spiritual_gifts) && coach.spiritual_gifts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Star className="w-5 h-5 inline mr-2" />
              Spiritual Gifts
            </h3>
            <div className="flex flex-wrap gap-2">
              {coach.spiritual_gifts.map((gift, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {gift}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Connect
          </h3>
          <div className="space-y-3">
            {safeGet(coach, 'website') && (
              <a
                href={coach.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Website</span>
              </a>
            )}
            {safeGet(coach, 'email') && (
              <a
                href={`mailto:${coach.email}`}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>
            )}
            {safeGet(coach, 'phone') && (
              <a
                href={`tel:${coach.phone}`}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Book a Session with {safeGet(coach, 'full_name', 'Coach')}
            </h3>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Session Rate: ${safeGet(coach, 'coaching_rate', 0)}
              </p>
              <p className="text-sm text-gray-500">
                This feature will be available soon. Please contact the coach directly using their contact information.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setBookingModalOpen(false);
                  const coachEmail = safeGet(coach, 'email');
                  if (coachEmail) {
                    window.location.href = `mailto:${coachEmail}?subject=Coaching Session Request`;
                  }
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Coach
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachProfileView;