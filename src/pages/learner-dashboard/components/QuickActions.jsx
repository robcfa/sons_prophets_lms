import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 'continue-course',
      title: 'Continue Learning',
      description: 'Resume your current course',
      icon: 'Play',
      color: 'primary',
      link: '/course-player',
      badge: 'In Progress'
    },
    {
      id: 'browse-courses',
      title: 'Browse Courses',
      description: 'Explore new theological courses',
      icon: 'Library',
      color: 'secondary',
      link: '/course-catalog',
      badge: null
    },
    {
      id: 'bible-study',
      title: 'Bible Study',
      description: 'Interactive scripture exploration',
      icon: 'Book',
      color: 'accent',
      link: '/bible-study-interface',
      badge: 'AI Powered'
    },
    {
      id: 'join-discussion',
      title: 'Join Discussion',
      description: 'Connect with fellow learners',
      icon: 'MessageSquare',
      color: 'success',
      link: '/community-forum',
      badge: '12 Active'
    },
    {
      id: 'upcoming-events',
      title: 'Upcoming Events',
      description: 'View study groups & workshops',
      icon: 'Calendar',
      color: 'warning',
      link: '/events-calendar',
      badge: '3 This Week'
    },
    {
      id: 'achievements',
      title: 'My Achievements',
      description: 'View badges and progress',
      icon: 'Award',
      color: 'info',
      link: '/learner-dashboard#achievements',
      badge: 'New Badge!'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50 hover:bg-primary-100',
        icon: 'text-primary',
        badge: 'bg-primary text-white'
      },
      secondary: {
        bg: 'bg-secondary-50 hover:bg-secondary-100',
        icon: 'text-secondary',
        badge: 'bg-secondary text-white'
      },
      accent: {
        bg: 'bg-accent-50 hover:bg-accent-100',
        icon: 'text-accent',
        badge: 'bg-accent text-white'
      },
      success: {
        bg: 'bg-success-50 hover:bg-success-100',
        icon: 'text-success',
        badge: 'bg-success text-white'
      },
      warning: {
        bg: 'bg-warning-50 hover:bg-warning-100',
        icon: 'text-warning',
        badge: 'bg-warning text-white'
      },
      info: {
        bg: 'bg-blue-50 hover:bg-blue-100',
        icon: 'text-blue-600',
        badge: 'bg-blue-600 text-white'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-card rounded-xl shadow-soft-md border border-subtle p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
          Quick Actions
        </h2>
        <Icon name="Zap" size={20} className="text-accent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const colors = getColorClasses(action.color);
          
          return (
            <Link
              key={action.id}
              to={action.link}
              className={`relative group block p-4 rounded-lg border border-subtle ${colors.bg} transition-all duration-200 hover:shadow-soft-sm hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-white shadow-soft-sm group-hover:scale-110 transition-transform duration-200`}>
                  <Icon 
                    name={action.icon} 
                    size={20} 
                    className={colors.icon} 
                  />
                </div>
                
                {action.badge && (
                  <span className={`text-xs font-caption px-2 py-1 rounded-full ${colors.badge}`}>
                    {action.badge}
                  </span>
                )}
              </div>
              
              <h3 className="font-body font-body-semibold text-text-primary mb-1 group-hover:text-primary transition-color">
                {action.title}
              </h3>
              
              <p className="text-sm font-body text-text-secondary">
                {action.description}
              </p>
              
              <div className="mt-3 flex items-center text-xs font-caption text-text-muted group-hover:text-primary transition-color">
                <span>Get started</span>
                <Icon name="ArrowRight" size={12} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile-specific quick access */}
      <div className="md:hidden mt-6 pt-6 border-t border-subtle">
        <div className="flex items-center justify-between space-x-2">
          <Link to="/course-player" className="flex-1">
            <Button variant="primary" size="sm" fullWidth>
              <Icon name="Play" size={16} className="mr-2" />
              Continue
            </Button>
          </Link>
          
          <Link to="/course-catalog" className="flex-1">
            <Button variant="secondary" size="sm" fullWidth>
              <Icon name="Library" size={16} className="mr-2" />
              Browse
            </Button>
          </Link>
          
          <Link to="/community-forum" className="flex-1">
            <Button variant="accent" size="sm" fullWidth>
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Discuss
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;