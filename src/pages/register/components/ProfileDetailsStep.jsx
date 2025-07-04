import React from 'react';

import Icon from '../../../components/AppIcon';

const ProfileDetailsStep = ({ formData, onFormChange, errors }) => {
  const educationLevels = [
    { value: 'high-school', label: 'High School' },
    { value: 'some-college', label: 'Some College' },
    { value: 'bachelors', label: "Bachelor\'s Degree" },
    { value: 'masters', label: "Master\'s Degree" },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'seminary', label: 'Seminary Training' },
    { value: 'other', label: 'Other' }
  ];

  const theologicalInterests = [
    { id: 'old-testament', label: 'Old Testament Studies' },
    { id: 'new-testament', label: 'New Testament Studies' },
    { id: 'systematic-theology', label: 'Systematic Theology' },
    { id: 'biblical-hermeneutics', label: 'Biblical Hermeneutics' },
    { id: 'church-history', label: 'Church History' },
    { id: 'practical-theology', label: 'Practical Theology' },
    { id: 'apologetics', label: 'Apologetics' },
    { id: 'biblical-languages', label: 'Biblical Languages' },
    { id: 'prophecy', label: 'Prophecy & Eschatology' },
    { id: 'worship', label: 'Worship & Liturgy' }
  ];

  const learningPaces = [
    { value: 'self-paced', label: 'Self-Paced', description: 'Learn at your own speed with flexible scheduling' },
    { value: 'structured', label: 'Structured', description: 'Follow a set schedule with deadlines and milestones' },
    { value: 'intensive', label: 'Intensive', description: 'Accelerated learning with frequent sessions' }
  ];

  const handleInterestToggle = (interestId) => {
    const currentInterests = formData.theologicalInterests || [];
    const updatedInterests = currentInterests.includes(interestId)
      ? currentInterests.filter(id => id !== interestId)
      : [...currentInterests, interestId];
    onFormChange('theologicalInterests', updatedInterests);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Complete Your Profile
        </h2>
        <p className="text-text-secondary font-body">
          Help us personalize your learning experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Educational Background */}
        <div>
          <label className="block text-sm font-body font-semibold text-text-primary mb-2">
            Educational Background *
          </label>
          <select
            value={formData.educationLevel}
            onChange={(e) => onFormChange('educationLevel', e.target.value)}
            className={`
              w-full px-4 py-3 border rounded-lg font-body text-text-primary bg-background
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-color ${errors.educationLevel ? 'border-error' : 'border-border'}
            `}
          >
            <option value="">Select your education level</option>
            {educationLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {errors.educationLevel && (
            <p className="mt-1 text-sm text-error font-body flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.educationLevel}
            </p>
          )}
        </div>

        {/* Theological Interests */}
        <div>
          <label className="block text-sm font-body font-semibold text-text-primary mb-3">
            Theological Interests *
          </label>
          <p className="text-sm text-text-secondary font-body mb-4">
            Select areas you're interested in studying (choose at least 2)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {theologicalInterests.map((interest) => {
              const isSelected = (formData.theologicalInterests || []).includes(interest.id);
              return (
                <div
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all duration-200 hover-lift
                    ${isSelected 
                      ? 'border-primary bg-primary-50 text-primary' :'border-border bg-background hover:border-primary hover:bg-primary-50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center
                      ${isSelected ? 'border-primary bg-primary' : 'border-border'}
                    `}>
                      {isSelected && <Icon name="Check" size={14} color="white" />}
                    </div>
                    <span className="text-sm font-body">
                      {interest.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.theologicalInterests && (
            <p className="mt-2 text-sm text-error font-body flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.theologicalInterests}
            </p>
          )}
        </div>

        {/* Learning Pace */}
        <div>
          <label className="block text-sm font-body font-semibold text-text-primary mb-3">
            Preferred Learning Pace *
          </label>
          <div className="space-y-3">
            {learningPaces.map((pace) => {
              const isSelected = formData.learningPace === pace.value;
              return (
                <div
                  key={pace.value}
                  onClick={() => onFormChange('learningPace', pace.value)}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-all duration-200 hover-lift
                    ${isSelected 
                      ? 'border-primary bg-primary-50' :'border-border bg-background hover:border-primary hover:bg-primary-50'
                    }
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5
                      ${isSelected ? 'border-primary' : 'border-border'}
                    `}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div>
                      <h4 className={`font-body font-semibold ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                        {pace.label}
                      </h4>
                      <p className="text-sm text-text-secondary font-body mt-1">
                        {pace.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.learningPace && (
            <p className="mt-2 text-sm text-error font-body flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.learningPace}
            </p>
          )}
        </div>

        {/* Optional Bio */}
        <div>
          <label className="block text-sm font-body font-semibold text-text-primary mb-2">
            Brief Introduction (Optional)
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => onFormChange('bio', e.target.value)}
            placeholder="Tell us a bit about yourself and your theological journey..."
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg font-body text-text-primary bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-color resize-none"
            maxLength={500}
          />
          <div className="mt-1 text-xs text-text-muted font-caption text-right">
            {(formData.bio || '').length}/500 characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsStep;