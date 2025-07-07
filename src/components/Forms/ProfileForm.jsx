import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { safeGet, safeObjectEntries, safeMerge } from '../../utils/safeObjectUtils';

const ProfileForm = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  loading = false,
  showCoachingFields = false 
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    phone: '',
    location: '',
    website: '',
    ministry_focus: '',
    spiritual_gifts: [],
    years_experience: 0,
    is_available_for_coaching: false,
    coaching_rate: '',
    coaching_bio: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Safely merge initial data with default form data
    const safeInitialData = initialData && typeof initialData === 'object' ? initialData : {};
    setFormData(prev => safeMerge(prev, safeInitialData));
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (safeGet(errors, name)) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSpiritualGiftsChange = (e) => {
    const gifts = (e.target.value || '').split(',').map(gift => gift.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      spiritual_gifts: gifts,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!safeGet(formData, 'full_name', '').trim()) {
      newErrors.full_name = 'Full name is required';
    }

    const website = safeGet(formData, 'website', '');
    if (website && !isValidUrl(website)) {
      newErrors.website = 'Please enter a valid URL';
    }

    const yearsExperience = safeGet(formData, 'years_experience', 0);
    if (yearsExperience < 0) {
      newErrors.years_experience = 'Years of experience cannot be negative';
    }

    const isAvailableForCoaching = safeGet(formData, 'is_available_for_coaching', false);
    const coachingRate = safeGet(formData, 'coaching_rate', '');
    
    if (isAvailableForCoaching && !coachingRate) {
      newErrors.coaching_rate = 'Coaching rate is required when available for coaching';
    }

    if (coachingRate && (isNaN(coachingRate) || parseFloat(coachingRate) < 0)) {
      newErrors.coaching_rate = 'Please enter a valid coaching rate';
    }

    setErrors(newErrors);
    return safeObjectEntries(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Prepare data for submission with safe access
    const submitData = {
      ...formData,
      years_experience: parseInt(safeGet(formData, 'years_experience', 0)) || 0,
      coaching_rate: safeGet(formData, 'coaching_rate') ? parseFloat(formData.coaching_rate) : null,
    };

    onSubmit?.(submitData);
  };

  // Safe access to spiritual gifts array
  const spiritualGifts = safeGet(formData, 'spiritual_gifts', []);
  const spiritualGiftsString = Array.isArray(spiritualGifts) ? spiritualGifts.join(', ') : '';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="full_name"
              value={safeGet(formData, 'full_name', '')}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                safeGet(errors, 'full_name') ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {safeGet(errors, 'full_name') && (
              <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={safeGet(formData, 'phone', '')}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={safeGet(formData, 'location', '')}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City, State"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={safeGet(formData, 'website', '')}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                safeGet(errors, 'website') ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="https://yourwebsite.com"
            />
            {safeGet(errors, 'website') && (
              <p className="mt-1 text-sm text-red-600">{errors.website}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={safeGet(formData, 'bio', '')}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell others about yourself..."
          />
        </div>
      </div>

      {/* Ministry Information */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900">Ministry Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ministry Focus
            </label>
            <input
              type="text"
              name="ministry_focus"
              value={safeGet(formData, 'ministry_focus', '')}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Youth Ministry, Worship, Teaching"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              name="years_experience"
              value={safeGet(formData, 'years_experience', 0)}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                safeGet(errors, 'years_experience') ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {safeGet(errors, 'years_experience') && (
              <p className="mt-1 text-sm text-red-600">{errors.years_experience}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Spiritual Gifts
          </label>
          <input
            type="text"
            value={spiritualGiftsString}
            onChange={handleSpiritualGiftsChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Teaching, Prophecy, Healing, Leadership (comma-separated)"
          />
          <p className="mt-1 text-xs text-gray-500">
            Separate multiple gifts with commas
          </p>
        </div>
      </div>

      {/* Coaching Section */}
      {showCoachingFields && (
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900">Coaching Information</h3>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_available_for_coaching"
              checked={safeGet(formData, 'is_available_for_coaching', false)}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">
              Available for coaching
            </label>
          </div>

          {safeGet(formData, 'is_available_for_coaching', false) && (
            <div className="space-y-4 ml-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coaching Rate (per session) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="coaching_rate"
                    value={safeGet(formData, 'coaching_rate', '')}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      safeGet(errors, 'coaching_rate') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {safeGet(errors, 'coaching_rate') && (
                  <p className="mt-1 text-sm text-red-600">{errors.coaching_rate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coaching Bio
                </label>
                <textarea
                  name="coaching_bio"
                  value={safeGet(formData, 'coaching_bio', '')}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your coaching style and expertise..."
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 border-t pt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;