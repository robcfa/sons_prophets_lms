import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LiveActivityFeed = ({ isVisible }) => {
  const [activities, setActivities] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection for real-time updates
    const simulateWebSocket = () => {
      setIsConnected(true);
      
      // Initial activities
      const initialActivities = [
        {
          id: 1,
          type: 'new_thread',
          user: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
          action: 'started a new discussion',
          target: 'The Role of Suffering in Prophetic Literature',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          category: 'biblical-interpretation'
        },
        {
          id: 2,
          type: 'reply',
          user: { name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
          action: 'replied to',
          target: 'Understanding Messianic Prophecies',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          category: 'general'
        },
        {
          id: 3,
          type: 'upvote',
          user: { name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
          action: 'upvoted',
          target: 'Prayer and Fasting in the Old Testament',
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          category: 'prayer-requests'
        }
      ];
      
      setActivities(initialActivities);
      
      // Simulate new activities coming in
      const interval = setInterval(() => {
        const newActivity = {
          id: Date.now(),
          type: ['new_thread', 'reply', 'upvote'][Math.floor(Math.random() * 3)],
          user: {
            name: ['David Kim', 'Rachel Thompson', 'James Wilson', 'Lisa Anderson'][Math.floor(Math.random() * 4)],
            avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=150`
          },
          action: ['started a new discussion', 'replied to', 'upvoted'][Math.floor(Math.random() * 3)],
          target: [
            'The Covenant in Jeremiah',
            'Ezekiel\'s Vision Interpretation',
            'Daniel\'s Prophecies Today',
            'Isaiah\'s Servant Songs'
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          category: ['general', 'biblical-interpretation', 'prayer-requests', 'study-groups'][Math.floor(Math.random() * 4)]
        };
        
        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      }, 15000); // New activity every 15 seconds
      
      return () => clearInterval(interval);
    };

    const cleanup = simulateWebSocket();
    
    return () => {
      setIsConnected(false);
      if (cleanup) cleanup();
    };
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'new_thread':
        return 'MessageSquare';
      case 'reply':
        return 'MessageCircle';
      case 'upvote':
        return 'ChevronUp';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'new_thread':
        return 'text-primary';
      case 'reply':
        return 'text-secondary';
      case 'upvote':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (!isVisible) return null;

  return (
    <div className="bg-card border border-subtle rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="font-heading font-heading-semibold text-text-primary">
            Live Activity
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-error'}`}></div>
          <span className="text-xs font-caption text-text-muted">
            {isConnected ? 'Live' : 'Offline'}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-2 rounded-lg hover:bg-surface transition-color cursor-pointer group"
          >
            <Image
              src={activity.user.avatar}
              alt={activity.user.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getActivityIcon(activity.type)} 
                  size={14} 
                  className={getActivityColor(activity.type)}
                />
                <p className="text-sm font-body text-text-primary line-clamp-1">
                  <span className="font-body-semibold">{activity.user.name}</span>
                  {' '}{activity.action}{' '}
                  <span className="text-primary group-hover:underline">
                    {activity.target}
                  </span>
                </p>
              </div>
              
              <p className="text-xs font-caption text-text-muted mt-1">
                {formatTimeAgo(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-6">
          <Icon name="Activity" size={32} className="text-text-muted mx-auto mb-2" />
          <p className="text-sm font-body text-text-secondary">
            No recent activity
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveActivityFeed;