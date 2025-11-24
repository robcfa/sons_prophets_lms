import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import { AlertCircle } from 'lucide-react';

const RoleSelectionStep = ({ onNext, onBack, initialData }) => {
  const [selectedRole, setSelectedRole] = useState(initialData?.role || null);
  const [error, setError] = useState('');

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialData || {}
  });

  const onSubmit = async () => {
    if (!selectedRole) {
      setError('Please select a role to continue');
      return;
    }

    setError('');
    onNext({ role: selectedRole });
  };
  const roles = [
    {
      id: 'member',
      name: 'Learner',
      icon: 'BookOpen',
      title: 'Student & Seeker',
      description: 'Access courses, participate in discussions, track your progress, and engage with the community.',
      features: [
        'Enroll in theology courses',
        'Track learning progress',
        'Participate in forums',
        'Earn badges and XP',
        'Access Bible study tools'
      ],
      color: 'primary'
    },
    {
      id: 'coach',
      name: 'Coach',
      icon: 'Users',
      title: 'Mentor & Guide',
      description: 'Guide learners, provide feedback, facilitate discussions, and create educational content.',
      features: [
        'Mentor students',
        'Create study materials',
        'Moderate discussions',
        'Provide feedback',
        'Access coaching tools'
      ],
      color: 'secondary'
    },
    {
      id: 'admin',
      name: 'Admin',
      icon: 'Shield',
      title: 'Platform Manager',
      description: 'Manage the platform, create courses, oversee users, and maintain the learning environment.',
      features: [
        'Manage all content',
        'Create courses with AI',
        'Oversee user accounts',
        'Platform analytics',
        'System administration'
      ],
      color: 'accent'
    }
  ];

  const getColorClasses = (color, isSelected) => {
    const colorMap = {
      primary: {
        border: isSelected ? 'border-primary' : 'border-border hover:border-primary',
        bg: isSelected ? 'bg-primary-50' : 'bg-background hover:bg-primary-50',
        icon: isSelected ? 'text-primary bg-primary-100' : 'text-primary-400 bg-primary-50',
        text: isSelected ? 'text-primary' : 'text-text-primary'
      },
      secondary: {
        border: isSelected ? 'border-secondary' : 'border-border hover:border-secondary',
        bg: isSelected ? 'bg-secondary-50' : 'bg-background hover:bg-secondary-50',
        icon: isSelected ? 'text-secondary bg-secondary-100' : 'text-secondary-400 bg-secondary-50',
        text: isSelected ? 'text-secondary' : 'text-text-primary'
      },
      accent: {
        border: isSelected ? 'border-accent' : 'border-border hover:border-accent',
        bg: isSelected ? 'bg-accent-50' : 'bg-background hover:bg-accent-50',
        icon: isSelected ? 'text-accent bg-accent-100' : 'text-accent-400 bg-accent-50',
        text: isSelected ? 'text-accent' : 'text-text-primary'
      }
    };
    return colorMap[color];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Choose Your Role
        </h2>
        <p className="text-text-secondary font-body">
          Select the role that best describes your purpose on the platform
        </p>
      </div>

      <div className="space-y-4">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          const colors = getColorClasses(role.color, isSelected);

          return (
            <div
              key={role.id}
              onClick={() => {
                setSelectedRole(role.id);
                setError('');
              }}
              className={`
                relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover-lift
                ${colors.border} ${colors.bg}
              `}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} color="white" />
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-4">
                {/* Role Icon */}
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                  ${colors.icon}
                `}>
                  <Icon name={role.icon} size={24} />
                </div>

                {/* Role Details */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`text-lg font-heading font-bold ${colors.text}`}>
                      {role.name}
                    </h3>
                    <span className="text-sm font-caption text-text-muted">
                      {role.title}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary font-body mb-4">
                    {role.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-body font-semibold text-text-primary">
                      What you can do:
                    </h4>
                    <ul className="space-y-1">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-text-secondary font-body">
                          <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          'Continue'
        )}
      </button>
    </form>
  );
};

export default RoleSelectionStep;