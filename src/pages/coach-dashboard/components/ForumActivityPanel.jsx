import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ForumActivityPanel = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const recentActivity = [
    {
      id: 1,
      type: 'question',
      title: "Understanding Daniel\'s 70 Weeks Prophecy",
      author: "Sarah Johnson",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "I'm struggling to understand the timeline in Daniel 9:24-27. Can someone help explain the different interpretations of the 70 weeks?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      replies: 3,
      needsAttention: true,
      category: "Biblical Interpretation"
    },
    {
      id: 2,
      type: 'discussion',
      title: "The Role of Ezekiel in Babylonian Exile",
      author: "Michael Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Great discussion about Ezekiel\'s prophetic ministry during the exile. The vision of the dry bones really resonates with our current study.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      replies: 8,
      needsAttention: false,
      category: "Historical Context"
    },
    {
      id: 3,
      type: 'question',
      title: "Messianic Prophecies in Isaiah",
      author: "Emily Chen",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "How do we distinguish between prophecies about the immediate historical context versus Messianic prophecies in Isaiah 7-11?",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      replies: 1,
      needsAttention: true,
      category: "Messianic Studies"
    },
    {
      id: 4,
      type: 'answer',
      title: "Re: Symbolic vs Literal Interpretation",
      author: "David Thompson",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Thank you for the detailed explanation about hermeneutical principles. This really helps clarify the different approaches to prophetic literature.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      replies: 0,
      needsAttention: false,
      category: "Hermeneutics"
    }
  ];

  const moderationQueue = [
    {
      id: 1,
      type: 'flagged',
      title: "Inappropriate language in discussion",
      author: "Anonymous User",
      content: "Post contains language that may not be appropriate for theological discussion.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      severity: 'medium'
    },
    {
      id: 2,
      type: 'spam',
      title: "Potential spam content",
      author: "New User",
      content: "Multiple posts with similar content detected from new user account.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      severity: 'low'
    }
  ];

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      question: 'HelpCircle',
      discussion: 'MessageSquare',
      answer: 'CheckCircle',
      flagged: 'Flag',
      spam: 'AlertTriangle'
    };
    return iconMap[type] || 'MessageCircle';
  };

  const getTypeColor = (type) => {
    const colorMap = {
      question: 'text-warning',
      discussion: 'text-primary',
      answer: 'text-success',
      flagged: 'text-error',
      spam: 'text-error'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  const getSeverityColor = (severity) => {
    const colorMap = {
      high: 'bg-error text-white',
      medium: 'bg-warning text-white',
      low: 'bg-accent text-white'
    };
    return colorMap[severity] || 'bg-text-muted text-white';
  };

  return (
    <div className="bg-card rounded-lg border border-subtle">
      <div className="p-6 border-b border-subtle">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-bold text-text-primary">
            Forum Activity
          </h3>
          <Button variant="primary" size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Create Discussion
          </Button>
        </div>

        <div className="flex space-x-1 bg-surface rounded-lg p-1">
          <button
            onClick={() => setActiveTab('recent')}
            className={`flex-1 px-4 py-2 text-sm font-body rounded-md transition-color ${
              activeTab === 'recent' ?'bg-primary text-primary-foreground shadow-soft-sm' :'text-text-secondary hover:text-primary'
            }`}
          >
            Recent Activity
          </button>
          <button
            onClick={() => setActiveTab('moderation')}
            className={`flex-1 px-4 py-2 text-sm font-body rounded-md transition-color relative ${
              activeTab === 'moderation' ?'bg-primary text-primary-foreground shadow-soft-sm' :'text-text-secondary hover:text-primary'
            }`}
          >
            Moderation Queue
            {moderationQueue.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {moderationQueue.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'recent' && (
          <div className="divide-y divide-subtle">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className={`p-4 hover:bg-surface transition-color cursor-pointer ${
                  activity.needsAttention ? 'bg-warning-50 border-l-4 border-warning' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Image
                    src={activity.authorAvatar}
                    alt={activity.author}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon 
                        name={getTypeIcon(activity.type)} 
                        size={14} 
                        className={getTypeColor(activity.type)} 
                      />
                      <span className="text-xs font-caption text-accent bg-accent-50 px-2 py-1 rounded-full">
                        {activity.category}
                      </span>
                      {activity.needsAttention && (
                        <span className="text-xs font-caption text-warning bg-warning-50 px-2 py-1 rounded-full">
                          Needs Attention
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-body font-semibold text-text-primary text-sm mb-1">
                      {activity.title}
                    </h4>
                    
                    <p className="text-sm font-body text-text-secondary mb-2 line-clamp-2">
                      {activity.content}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs font-caption text-text-muted">
                      <span>by {activity.author}</span>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Icon name="MessageCircle" size={12} />
                          <span>{activity.replies}</span>
                        </span>
                        <span>{formatTimestamp(activity.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'moderation' && (
          <div className="divide-y divide-subtle">
            {moderationQueue.length > 0 ? (
              moderationQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-surface transition-color"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getTypeIcon(item.type)} 
                        size={16} 
                        className={getTypeColor(item.type)} 
                      />
                      <h4 className="font-body font-semibold text-text-primary text-sm">
                        {item.title}
                      </h4>
                    </div>
                    <span className={`text-xs font-caption px-2 py-1 rounded-full ${getSeverityColor(item.severity)}`}>
                      {item.severity}
                    </span>
                  </div>
                  
                  <p className="text-sm font-body text-text-secondary mb-3">
                    {item.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-caption text-text-muted">
                      {item.author} • {formatTimestamp(item.timestamp)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="success" size="sm">
                        <Icon name="Check" size={14} className="mr-1" />
                        Approve
                      </Button>
                      <Button variant="danger" size="sm">
                        <Icon name="X" size={14} className="mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <p className="text-text-secondary font-body mb-2">
                  No items in moderation queue
                </p>
                <p className="text-sm text-text-muted font-body">
                  All forum activity is currently approved.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-subtle bg-surface">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm">
            <Icon name="Eye" size={16} className="mr-2" />
            View All Activity
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Forum Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForumActivityPanel;