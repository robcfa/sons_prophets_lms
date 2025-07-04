import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const quickActions = [
    {
      id: 'discussion',
      title: 'Create Discussion',
      description: 'Start a new theological discussion topic',
      icon: 'MessageSquare',
      color: 'primary',
      action: () => setSelectedAction('discussion')
    },
    {
      id: 'announcement',
      title: 'Send Announcement',
      description: 'Broadcast message to all learners',
      icon: 'Megaphone',
      color: 'accent',
      action: () => setSelectedAction('announcement')
    },
    {
      id: 'ai-course',
      title: 'AI Course Creator',
      description: 'Generate course content with AI',
      icon: 'Brain',
      color: 'secondary',
      action: () => setSelectedAction('ai-course')
    },
    {
      id: 'schedule',
      title: 'Schedule Session',
      description: 'Book coaching or group sessions',
      icon: 'Calendar',
      color: 'success',
      action: () => setSelectedAction('schedule')
    },
    {
      id: 'resources',
      title: 'Share Resources',
      description: 'Upload and share study materials',
      icon: 'Upload',
      color: 'warning',
      action: () => setSelectedAction('resources')
    },
    {
      id: 'feedback',
      title: 'Provide Feedback',
      description: 'Review and grade assignments',
      icon: 'CheckCircle',
      color: 'info',
      action: () => setSelectedAction('feedback')
    }
  ];

  const recentActions = [
    {
      id: 1,
      action: 'Created discussion',
      title: 'Understanding Ezekiel\'s Temple Vision',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: 'MessageSquare',
      color: 'primary'
    },
    {
      id: 2,
      action: 'Scheduled session',
      title: 'Bible Study Group - Romans',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      icon: 'Calendar',
      color: 'success'
    },
    {
      id: 3,
      action: 'Sent announcement',
      title: 'New course materials available',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      icon: 'Megaphone',
      color: 'accent'
    },
    {
      id: 4,
      action: 'Provided feedback',
      title: 'Sarah Johnson - Hermeneutics Assignment',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      icon: 'CheckCircle',
      color: 'info'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 text-primary border-primary-200 hover:bg-primary-100',
      accent: 'bg-accent-50 text-accent border-accent-200 hover:bg-accent-100',
      secondary: 'bg-secondary-50 text-secondary border-secondary-200 hover:bg-secondary-100',
      success: 'bg-success-50 text-success border-success-200 hover:bg-success-100',
      warning: 'bg-warning-50 text-warning border-warning-200 hover:bg-warning-100',
      info: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
    };
    return colorMap[color] || colorMap.primary;
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const handleActionClick = (action) => {
    action.action();
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card rounded-lg border border-subtle p-6">
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={`p-4 rounded-lg border transition-all hover-lift ${getColorClasses(action.color)}`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={action.icon} size={20} />
                <h4 className="font-body font-semibold text-left">
                  {action.title}
                </h4>
              </div>
              <p className="text-sm opacity-80 text-left">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Actions */}
      <div className="bg-card rounded-lg border border-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-bold text-text-primary">
            Recent Actions
          </h3>
          <Button variant="ghost" size="sm">
            <Icon name="History" size={16} className="mr-2" />
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentActions.map((action) => (
            <div
              key={action.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface transition-color cursor-pointer"
            >
              <div className={`p-2 rounded-lg ${getColorClasses(action.color)}`}>
                <Icon name={action.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-text-primary text-sm">
                  {action.action}
                </p>
                <p className="text-sm font-body text-text-secondary truncate">
                  {action.title}
                </p>
              </div>
              <span className="text-xs font-caption text-text-muted">
                {formatTimestamp(action.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tools Spotlight */}
      <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg border border-accent-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-accent rounded-lg">
            <Icon name="Sparkles" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold text-text-primary">
              AI-Powered Tools
            </h3>
            <p className="text-sm font-body text-text-secondary">
              Enhance your coaching with artificial intelligence
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-accent-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Brain" size={16} className="text-accent" />
              <h4 className="font-body font-semibold text-text-primary">
                Course Creation Expert
              </h4>
            </div>
            <p className="text-sm font-body text-text-secondary mb-3">
              Generate comprehensive course modules and lessons using AI
            </p>
            <Button variant="accent" size="sm" fullWidth>
              <Icon name="Wand2" size={14} className="mr-2" />
              Launch Creator
            </Button>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-primary-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="FileText" size={16} className="text-primary" />
              <h4 className="font-body font-semibold text-text-primary">
                Note Summary Wizard
              </h4>
            </div>
            <p className="text-sm font-body text-text-secondary mb-3">
              Automatically generate session summaries and action items
            </p>
            <Button variant="primary" size="sm" fullWidth>
              <Icon name="Magic" size={14} className="mr-2" />
              Start Wizard
            </Button>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-1200 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-card rounded-lg border border-subtle w-full max-w-md">
            <div className="p-6 border-b border-subtle">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-bold text-text-primary">
                  {selectedAction && quickActions.find(a => a.id === selectedAction)?.title}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center py-8">
                <Icon name="Construction" size={48} className="text-text-muted mx-auto mb-4" />
                <p className="text-text-secondary font-body mb-2">
                  Feature Coming Soon
                </p>
                <p className="text-sm text-text-muted font-body">
                  This functionality will be available in the next update.
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-subtle">
              <Button variant="primary" fullWidth onClick={() => setShowCreateModal(false)}>
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionsPanel;