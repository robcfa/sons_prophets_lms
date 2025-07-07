import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, Save, User, Phone, MapPin, Globe, Heart, Award } from 'lucide-react';
import profileService from '../../utils/profileService';

const UserProfile = () => {
  const { user, userProfile, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
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
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        bio: userProfile.bio || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        website: userProfile.website || '',
        ministry_focus: userProfile.ministry_focus || '',
        spiritual_gifts: userProfile.spiritual_gifts || [],
        years_experience: userProfile.years_experience || 0,
        is_available_for_coaching: userProfile.is_available_for_coaching || false,
        coaching_rate: userProfile.coaching_rate || '',
        coaching_bio: userProfile.coaching_bio || '',
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSpiritualGiftsChange = (e) => {
    const gifts = e.target.value.split(',').map(gift => gift.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      spiritual_gifts: gifts,
    }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target?.files?.[0];
    if (!file || !user?.id) return;

    setUploadingAvatar(true);
    try {
      const result = await profileService.uploadAvatar(user.id, file);
      if (result?.success) {
        await updateProfile({ avatar_url: result.data });
      } else {
        setErrors({ avatar: result?.error || 'Failed to upload avatar' });
      }
    } catch (error) {
      setErrors({ avatar: 'Error uploading avatar' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      const result = await updateProfile(formData);
      if (result?.success) {
        setIsEditing(false);
      } else {
        setErrors({ submit: result?.error || 'Failed to update profile' });
      }
    } catch (error) {
      setErrors({ submit: 'Error updating profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Avatar Section */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              {userProfile?.avatar_url ? (
                <img
                  src={userProfile.avatar_url}
                  alt={userProfile?.full_name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  disabled={uploadingAvatar}
                />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {userProfile?.full_name || 'No name set'}
            </h2>
            <p className="text-gray-600 capitalize">
              {userProfile?.role || 'member'} • {userProfile?.status || 'active'}
            </p>
            {userProfile?.ministry_focus && (
              <p className="text-blue-600 font-medium">{userProfile.ministry_focus}</p>
            )}
          </div>
        </div>

        {uploadingAvatar && (
          <div className="mb-4 text-blue-600">
            <p>Uploading avatar...</p>
          </div>
        )}

        {errors?.avatar && (
          <div className="mb-4 text-red-600">
            <p>{errors.avatar}</p>
          </div>
        )}
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              placeholder="Tell others about yourself..."
            />
          </div>

          {/* Ministry Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Heart className="w-5 h-5 inline mr-2" />
              Ministry Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ministry Focus
                </label>
                <input
                  type="text"
                  name="ministry_focus"
                  value={formData.ministry_focus}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  placeholder="e.g., Youth Ministry, Worship, Teaching"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Award className="w-4 h-4 inline mr-1" />
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="years_experience"
                  value={formData.years_experience}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spiritual Gifts (comma-separated)
              </label>
              <input
                type="text"
                value={formData.spiritual_gifts?.join(', ') || ''}
                onChange={handleSpiritualGiftsChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                placeholder="e.g., Teaching, Prophecy, Healing, Leadership"
              />
            </div>
          </div>

          {/* Coaching Section - Only for coaches */}
          {(userProfile?.role === 'coach' || formData.is_available_for_coaching) && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Coaching Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_available_for_coaching"
                    checked={formData.is_available_for_coaching}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Available for coaching
                  </label>
                </div>

                {formData.is_available_for_coaching && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coaching Rate (per session)
                      </label>
                      <input
                        type="number"
                        name="coaching_rate"
                        value={formData.coaching_rate}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coaching Bio
                      </label>
                      <textarea
                        name="coaching_bio"
                        value={formData.coaching_bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        placeholder="Describe your coaching style and expertise..."
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Save Button */}
          {isEditing && (
            <div className="border-t pt-6">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          )}

          {errors?.submit && (
            <div className="text-red-600 text-sm">{errors.submit}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;