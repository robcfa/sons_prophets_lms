import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadInitialActivities();
  }, []);

  const loadInitialActivities = () => {
    const mockActivities = [
      {
        id: 1,
        type: 'discussion',
        title: 'New discussion: The Role of Prophets in Modern Times',
        author: 'Sarah Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        content: `I've been reflecting on how the prophetic tradition from the Old Testament applies to our contemporary world. What are your thoughts on modern-day prophetic voices?`,timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),replies: 12,likes: 8,category: 'Theology Discussion'
      },
      {
        id: 2,
        type: 'achievement',title: 'Michael Rodriguez earned "Scripture Scholar" badge',author: 'Michael Rodriguez',authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',content: 'Completed advanced study of Isaiah chapters 40-55 with perfect quiz scores!',timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),badgeIcon: 'Award',category: 'Achievement'
      },
      {
        id: 3,
        type: 'study_group',title: 'Weekly Study Group: Book of Daniel',author: 'Pastor David Kim',authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        content: `Join us this Thursday at 7 PM for an in-depth study of Daniel's visions. We'll explore the historical context and prophetic significance.\n\nBring your questions and insights!`,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        attendees: 15,
        maxAttendees: 20,
        category: 'Study Groups'
      },
      {
        id: 4,
        type: 'discussion',title: 'Question about Ezekiel\'s Temple Vision',
        author: 'Emma Thompson',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        content: 'I\'m struggling to understand the architectural details in Ezekiel 40-48. Are these literal blueprints or symbolic representations?',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        replies: 7,
        likes: 5,
        category: 'Q&A'
      },
      {
        id: 5,
        type: 'course_completion',
        title: 'Course Completed: Introduction to Prophetic Literature',
        author: 'James Wilson',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        content: 'Just finished the foundational course on prophetic literature. The insights into Hebrew poetry and parallelism were particularly enlightening.',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        courseRating: 5,
        category: 'Course Progress'
      },
      {
        id: 6,
        type: 'discussion',
        title: 'Messianic Prophecies in Isaiah',
        author: 'Dr. Rachel Martinez',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        content: `Let's discuss the Messianic prophecies found in Isaiah. Which passages do you find most compelling and why?\n\nI'll start with Isaiah 53 - the Suffering Servant passage.`,
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
        replies: 23,
        likes: 18,
        category: 'Theology Discussion'
      }
    ];

    setActivities(mockActivities);
  };

  const loadMoreActivities = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const additionalActivities = [
        {
          id: 7,
          type: 'discussion',
          title: 'Understanding Apocalyptic Literature',
          author: 'Thomas Anderson',
          authorAvatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150',
          content: 'How do we properly interpret apocalyptic passages in Daniel and Ezekiel? What hermeneutical principles should we apply?',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          replies: 9,
          likes: 6,
          category: 'Biblical Interpretation'
        }
      ];
      
      setActivities(prev => [...prev, ...additionalActivities]);
      setLoading(false);
      setHasMore(false);
    }, 1000);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      discussion: 'MessageSquare',
      achievement: 'Award',
      study_group: 'Users',
      course_completion: 'BookOpen',
      question: 'HelpCircle'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      discussion: 'text-primary',
      achievement: 'text-accent',
      study_group: 'text-secondary',
      course_completion: 'text-success',
      question: 'text-warning'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  return (
    <div className="bg-card rounded-xl shadow-soft-md border border-subtle p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
          Community Activity
        </h2>
        <Link to="/community-forum">
          <Button variant="ghost" size="sm">
            View All
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="border-l-4 border-primary-100 pl-4 pb-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface">
                  <img
                    src={activity.authorAvatar}
                    alt={activity.author}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={16} 
                    className={getActivityColor(activity.type)} 
                  />
                  <span className="text-xs font-caption text-text-muted bg-surface px-2 py-1 rounded-full">
                    {activity.category}
                  </span>
                  <span className="text-xs font-caption text-text-muted">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                
                <h3 className="font-body font-body-semibold text-text-primary mb-1">
                  {activity.title}
                </h3>
                
                <p className="text-sm font-body text-text-secondary mb-2 line-clamp-2">
                  {activity.content}
                </p>
                
                <div className="flex items-center space-x-4 text-xs font-caption text-text-muted">
                  <span className="font-body-semibold text-text-secondary">
                    {activity.author}
                  </span>
                  
                  {activity.replies && (
                    <span className="flex items-center">
                      <Icon name="MessageCircle" size={12} className="mr-1" />
                      {activity.replies} replies
                    </span>
                  )}
                  
                  {activity.likes && (
                    <span className="flex items-center">
                      <Icon name="Heart" size={12} className="mr-1" />
                      {activity.likes} likes
                    </span>
                  )}
                  
                  {activity.attendees && (
                    <span className="flex items-center">
                      <Icon name="Users" size={12} className="mr-1" />
                      {activity.attendees}/{activity.maxAttendees} attending
                    </span>
                  )}
                  
                  {activity.courseRating && (
                    <span className="flex items-center">
                      <Icon name="Star" size={12} className="mr-1 text-warning" />
                      {activity.courseRating}/5 rating
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-4 text-center">
          <Button 
            variant="ghost" 
            onClick={loadMoreActivities}
            disabled={loading}
            fullWidth
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} className="mr-2" />
                Load More Activity
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommunityActivityFeed;