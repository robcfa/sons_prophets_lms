import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentAchievements = ({ achievements = [] }) => {
  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) {
      return 'Unknown date';
    }
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getBadgeColor = (type) => {
    const colorMap = {
      course_completion: 'from-success to-success-600',
      streak: 'from-warning to-warning-600',
      participation: 'from-secondary to-secondary-600',
      mastery: 'from-accent to-accent-600',
      milestone: 'from-primary to-primary-600'
    };
    return colorMap[type] || 'from-text-muted to-text-secondary';
  };

  const getBadgeIcon = (type) => {
    const iconMap = {
      course_completion: 'BookOpen',
      streak: 'Zap',
      participation: 'MessageSquare',
      mastery: 'Award',
      milestone: 'Target'
    };
    return iconMap[type] || 'Award';
  };

  // Ensure achievements is always an array
  const safeAchievements = Array.isArray(achievements) ? achievements : [];

  return (
    <div className="bg-card rounded-xl shadow-soft-md border border-subtle p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
          Recent Achievements
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-accent" />
          <span className="text-sm font-data text-accent font-bold">
            {safeAchievements.length} earned
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {safeAchievements.map((achievement) => (
          <div 
            key={achievement?.id || Math.random()} 
            className="group relative bg-surface rounded-lg p-4 hover:shadow-soft-sm transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${getBadgeColor(achievement?.type)} flex items-center justify-center shadow-soft-sm group-hover:scale-110 transition-transform duration-200`}>
                <Icon 
                  name={getBadgeIcon(achievement?.type)} 
                  size={20} 
                  className="text-white" 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-body-semibold text-text-primary mb-1 group-hover:text-primary transition-color">
                  {achievement?.name || 'Unnamed Achievement'}
                </h3>
                <p className="text-sm font-body text-text-secondary mb-2 line-clamp-2">
                  {achievement?.description || 'No description available'}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-caption text-text-muted">
                    Earned {formatDate(achievement?.earnedDate)}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={12} className="text-accent" />
                    <span className="text-xs font-data text-accent font-bold">
                      +{achievement?.xpReward || 0} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {achievement?.isNew && (
              <div className="absolute -top-2 -right-2 bg-error text-white text-xs font-caption px-2 py-1 rounded-full shadow-soft-sm">
                New!
              </div>
            )}
          </div>
        ))}
      </div>

      {safeAchievements.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Award" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary font-body mb-2">No achievements yet</p>
          <p className="text-sm text-text-muted font-body">
            Complete courses and participate in discussions to earn badges
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentAchievements;