import React, { useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import { safeGet } from '../../../utils/safeObjectUtils';

const RecentAchievements = ({ achievements = [] }) => {
  const formatDate = (date) => {
    try {
      if (!date) {
        return 'Unknown date';
      }
      
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) {
        return 'Unknown date';
      }
      
      return dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      console.warn('Error formatting date:', error);
      return 'Unknown date';
    }
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

  // Ensure achievements is always an array with enhanced safety
  const safeAchievements = React.useMemo(() => {
    if (!Array.isArray(achievements)) {
      return [];
    }
    
    return achievements.filter(achievement => achievement && typeof achievement === 'object');
  }, [achievements]);

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
        {safeAchievements.map((achievement, index) => {
          // Safe achievement data access
          const achievementId = safeGet(achievement, 'id') || `achievement-${index}`;
          const achievementName = safeGet(achievement, 'name') || 'Unnamed Achievement';
          const achievementDescription = safeGet(achievement, 'description') || 'No description available';
          const achievementType = safeGet(achievement, 'type') || 'milestone';
          const achievementEarnedDate = safeGet(achievement, 'earnedDate');
          const achievementXpReward = safeGet(achievement, 'xpReward') || 0;
          const achievementIsNew = safeGet(achievement, 'isNew') || false;
          
          return (
            <div 
              key={achievementId}
              className="group relative bg-surface rounded-lg p-4 hover:shadow-soft-sm transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${getBadgeColor(achievementType)} flex items-center justify-center shadow-soft-sm group-hover:scale-110 transition-transform duration-200`}>
                  <Icon 
                    name={getBadgeIcon(achievementType)} 
                    size={20} 
                    className="text-white" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-body-semibold text-text-primary mb-1 group-hover:text-primary transition-color">
                    {achievementName}
                  </h3>
                  <p className="text-sm font-body text-text-secondary mb-2 line-clamp-2">
                    {achievementDescription}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-caption text-text-muted">
                      Earned {formatDate(achievementEarnedDate)}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={12} className="text-accent" />
                      <span className="text-xs font-data text-accent font-bold">
                        +{achievementXpReward} XP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {achievementIsNew && (
                <div className="absolute -top-2 -right-2 bg-error text-white text-xs font-caption px-2 py-1 rounded-full shadow-soft-sm">
                  New!
                </div>
              )}
            </div>
          );
        })}
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