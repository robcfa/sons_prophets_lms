import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ isOpen, onClose, onToggle }) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, course, community, achievement
  const [loading, setLoading] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    // Simulate fetching notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'course',
        title: 'New lesson available',
        message: 'Biblical Hermeneutics - Chapter 3: Understanding Context is now available for study.',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        actionUrl: '/course-player/biblical-hermeneutics',
        priority: 'normal'
      },
      {
        id: 2,
        type: 'community',
        title: 'Forum reply',
        message: 'Sarah Johnson replied to your discussion "The Role of Prayer in Daily Life".',
        time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: false,
        actionUrl: '/community-forum/discussion/prayer-daily-life',
        priority: 'normal'
      },
      {
        id: 3,
        type: 'achievement',
        title: 'Achievement unlocked',
        message: 'Congratulations! You completed 5 Bible study sessions this week and earned the "Dedicated Student" badge.',
        time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: true,
        actionUrl: '/learner-dashboard#achievements',
        priority: 'high'
      },
      {
        id: 4,
        type: 'course',
        title: 'Assignment due soon',
        message: 'Your reflection paper for "Old Testament Survey" is due in 2 days.',
        time: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        read: false,
        actionUrl: '/course-player/old-testament-survey/assignments',
        priority: 'high'
      },
      {
        id: 5,
        type: 'community',
        title: 'Upcoming event',
        message: 'Virtual Bible Study Group meets tomorrow at 7:00 PM. Join the discussion on the Book of Romans.',
        time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: true,
        actionUrl: '/events-calendar/bible-study-romans',
        priority: 'normal'
      },
      {
        id: 6,
        type: 'course',
        title: 'Course completion',
        message: 'You have successfully completed "Introduction to Christian Theology". Your certificate is ready for download.',
        time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        read: true,
        actionUrl: '/learner-dashboard#certificates',
        priority: 'high'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    // Handle click outside to close
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const getNotificationIcon = (type, priority) => {
    const iconMap = {
      course: 'BookOpen',
      community: 'MessageCircle',
      achievement: 'Award',
      system: 'Bell'
    };

    return iconMap[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') {
      return 'text-warning';
    }
    
    const colorMap = {
      course: 'text-primary',
      community: 'text-secondary',
      achievement: 'text-accent',
      system: 'text-text-secondary'
    };

    return colorMap[type] || 'text-text-secondary';
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setLoading(true);
    setTimeout(() => {
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      setLoading(false);
    }, 500);
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'course', label: 'Courses', count: notifications.filter(n => n.type === 'course').length },
    { value: 'community', label: 'Community', count: notifications.filter(n => n.type === 'community').length },
    { value: 'achievement', label: 'Achievements', count: notifications.filter(n => n.type === 'achievement').length }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1200 md:relative md:inset-auto">
      {/* Mobile Overlay */}
      <div className="md:hidden fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Notification Panel */}
      <div 
        ref={notificationRef}
        className="fixed inset-x-0 bottom-0 md:absolute md:right-0 md:top-full md:inset-x-auto md:bottom-auto md:w-96 bg-card rounded-t-lg md:rounded-lg shadow-soft-lg border border-subtle md:mt-2 max-h-[80vh] md:max-h-[600px] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-subtle">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="font-heading font-heading-semibold text-text-primary">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-data">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={loading}
                className="text-xs"
              >
                {loading ? (
                  <Icon name="Loader2" size={14} className="animate-spin" />
                ) : (
                  'Mark all read'
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto border-b border-subtle bg-surface">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-body whitespace-nowrap transition-color ${
                filter === option.value
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
              }`}
            >
              <span>{option.label}</span>
              {option.count > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  filter === option.value
                    ? 'bg-primary text-white' :'bg-text-muted text-white'
                }`}>
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-subtle">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-surface transition-color cursor-pointer group ${
                    !notification.read ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => {
                    if (!notification.read) {
                      handleMarkAsRead(notification.id);
                    }
                    // Handle navigation to actionUrl
                    onClose();
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Icon 
                        name={getNotificationIcon(notification.type, notification.priority)} 
                        size={18} 
                        className={getNotificationColor(notification.type, notification.priority)}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-body font-body-semibold text-text-primary">
                          {notification.title}
                        </p>
                        <div className="flex items-center space-x-2 ml-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-error transition-all p-1"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm font-body text-text-secondary mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs font-caption text-text-muted">
                          {formatTime(notification.time)}
                        </p>
                        
                        {notification.priority === 'high' && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-caption bg-warning-100 text-warning-700 rounded-full">
                            <Icon name="AlertCircle" size={12} className="mr-1" />
                            Priority
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Icon name="Bell" size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary font-body mb-2">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </p>
              <p className="text-sm text-text-muted font-body">
                {filter === 'unread' ?'You\'re all caught up!' :'We\'ll notify you when something important happens.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="p-4 border-t border-subtle bg-surface">
            <Button variant="ghost" size="sm" fullWidth>
              View All Notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;