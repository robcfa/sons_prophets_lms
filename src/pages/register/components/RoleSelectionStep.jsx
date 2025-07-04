import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelectionStep = ({ formData, onFormChange, errors }) => {
  const roles = [
    {
      id: 'learner',
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
    <div className="space-y-6">
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
          const isSelected = formData.role === role.id;
          const colors = getColorClasses(role.color, isSelected);
          
          return (
            <div
              key={role.id}
              onClick={() => onFormChange('role', role.id)}
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

      {errors.role && (
        <p className="text-sm text-error font-body flex items-center justify-center">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {errors.role}
        </p>
      )}
    </div>
  );
};

export default RoleSelectionStep;