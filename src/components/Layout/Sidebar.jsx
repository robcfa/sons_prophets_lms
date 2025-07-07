import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { hasAccess, getUserPlan } from '../../utils/planUtils';
import Icon from '../AppIcon';

const Sidebar = ({ plan: propPlan }) => {
  const location = useLocation();
  const { user, userProfile } = useAuth();
  const userPlan = propPlan || getUserPlan({ user, userProfile });

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/learner-dashboard',
      requiredPlans: []
    },
    {
      id: 'courses',
      label: 'Course Catalog',
      icon: 'BookOpen',
      path: '/course-catalog',
      requiredPlans: []
    },
    {
      id: 'bible-study',
      label: 'Bible Study',
      icon: 'Book',
      path: '/bible-study-interface',
      requiredPlans: []
    },
    {
      id: 'webinar',
      label: 'Coaching & Webinars',
      icon: 'Video',
      path: '/webinar',
      requiredPlans: ['plus', 'premium']
    },
    {
      id: 'community',
      label: 'Community Forum',
      icon: 'Users',
      path: '/community-forum',
      requiredPlans: []
    },
    {
      id: 'events',
      label: 'Events Calendar',
      icon: 'Calendar',
      path: '/events-calendar',
      requiredPlans: []
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      path: '/profile',
      requiredPlans: []
    }
  ];

  const accessibleItems = navItems.filter(item => 
    hasAccess(userPlan, item.requiredPlans)
  );

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex w-64 bg-card border-r border-divider min-h-screen">
      <div className="flex flex-col w-full">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="icon--platform w-8 h-8"></div>
            <h2 className="text-xl font-heading font-heading-bold text-primary">
              Sons & Prophets
            </h2>
          </div>
          
          <nav className="space-y-2">
            {accessibleItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg font-body text-sm transition-colors hover:bg-primary/10 hover:text-primary ${
                  isActive(item.path)
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className="mr-3" 
                />
                {item.label}
                {!hasAccess(userPlan, item.requiredPlans) && (
                  <Icon 
                    name="Lock" 
                    size={14} 
                    className="ml-auto text-warning" 
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-divider">
          <div className="bg-secondary/10 rounded-lg p-4">
            <h3 className="font-heading font-heading-semibold text-primary mb-2">
              Current Plan
            </h3>
            <p className="text-sm text-secondary capitalize mb-3">
              {userPlan} Plan
            </p>
            {userPlan === 'free' && (
              <button className="w-full button bg-primary text-white text-sm">
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;