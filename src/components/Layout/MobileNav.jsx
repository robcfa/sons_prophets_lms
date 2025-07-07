import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { hasAccess, getUserPlan } from '../../utils/planUtils';
import Icon from '../AppIcon';

const MobileNav = ({ plan: propPlan }) => {
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
      label: 'Courses',
      icon: 'BookOpen',
      path: '/course-catalog',
      requiredPlans: []
    },
    {
      id: 'webinar',
      label: 'Webinar',
      icon: 'Video',
      path: '/webinar',
      requiredPlans: ['plus', 'premium']
    },
    {
      id: 'community',
      label: 'Community',
      icon: 'Users',
      path: '/community-forum',
      requiredPlans: []
    }
  ];

  const accessibleItems = navItems.filter(item => 
    hasAccess(userPlan, item.requiredPlans)
  );

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-1000 bg-card border-t border-divider">
      <div className="grid grid-cols-4 gap-1 px-2 py-1">
        {accessibleItems.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg font-caption text-xs transition-colors hover:bg-primary/10 hover:text-primary min-h-[60px] ${
              isActive(item.path)
                ? 'bg-primary text-white shadow-sm'
                : 'text-secondary hover:text-primary'
            }`}
          >
            <Icon 
              name={item.icon} 
              size={20} 
              className="mb-1" 
            />
            <span className="text-center leading-tight">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="h-safe-bottom"></div>
    </nav>
  );
};

export default MobileNav;