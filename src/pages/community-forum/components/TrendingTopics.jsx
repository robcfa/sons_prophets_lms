import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendingTopics = ({ topics, onTopicClick }) => {
  const getTrendingIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-text-muted' };
  };

  return (
    <div className="bg-card border border-subtle rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TrendingUp" size={20} className="text-primary" />
        <h3 className="font-heading font-heading-semibold text-text-primary">
          Trending Topics
        </h3>
      </div>
      
      <div className="space-y-3">
        {topics.map((topic, index) => {
          const trendingInfo = getTrendingIcon(topic.trend);
          
          return (
            <div
              key={topic.id}
              onClick={() => onTopicClick(topic.tag)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-surface transition-color cursor-pointer group"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <span className="text-sm font-data text-text-muted w-6 text-center">
                  #{index + 1}
                </span>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-body-semibold text-text-primary group-hover:text-primary transition-color line-clamp-1">
                    {topic.name}
                  </p>
                  <p className="text-xs font-caption text-text-muted">
                    {topic.discussionCount} discussions
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon 
                  name={trendingInfo.icon} 
                  size={16} 
                  className={trendingInfo.color}
                />
                <span className={`text-xs font-data ${trendingInfo.color}`}>
                  {topic.trend > 0 ? '+' : ''}{topic.trend}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-subtle">
        <button className="text-sm font-body text-primary hover:text-primary-600 transition-color">
          View All Topics →
        </button>
      </div>
    </div>
  );
};

export default TrendingTopics;