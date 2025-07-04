import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryNavigation = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Simulate user role detection
    const mockUser = {
      role: 'learner' // This would come from authentication context
    };
    setUser(mockUser);
  }, []);

  useEffect(() => {
    // Set active tab based on current route
    const path = location.pathname;
    if (path.includes('dashboard')) {
      setActiveTab('dashboard');
    } else if (path.includes('course') || path.includes('bible-study')) {
      setActiveTab('learn');
    } else if (path.includes('community') || path.includes('events')) {
      setActiveTab('community');
    } else if (path.includes('admin')) {
      setActiveTab('manage');
    } else {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);

  const getNavigationItems = (userRole) => {
    const baseItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'LayoutDashboard',
        path: `/${userRole}-dashboard`,
        roles: ['learner', 'coach', 'admin']
      },
      {
        id: 'learn',
        label: 'Learn',
        icon: 'BookOpen',
        path: '/course-catalog',
        roles: ['learner', 'coach', 'admin'],
        subItems: [
          { label: 'Course Catalog', path: '/course-catalog', icon: 'Library' },
          { label: 'My Courses', path: '/course-player', icon: 'Play' },
          { label: 'Bible Study', path: '/bible-study-interface', icon: 'Book' }
        ]
      },
      {
        id: 'community',
        label: 'Community',
        icon: 'Users',
        path: '/community-forum',
        roles: ['learner', 'coach', 'admin'],
        subItems: [
          { label: 'Discussion Forum', path: '/community-forum', icon: 'MessageSquare' },
          { label: 'Events Calendar', path: '/events-calendar', icon: 'Calendar' }
        ]
      },
      {
        id: 'manage',
        label: 'Manage',
        icon: 'Settings',
        path: '/admin-content-management',
        roles: ['admin'],
        subItems: [
          { label: 'Content Management', path: '/admin-content-management', icon: 'FileText' }
        ]
      }
    ];

    return baseItems.filter(item => item.roles.includes(userRole));
  };

  if (!user) {
    return null;
  }

  const navigationItems = getNavigationItems(user.role);

  const NavItem = ({ item, isActive, isMobile = false }) => {
    const baseClasses = `
      flex items-center justify-center px-4 py-3 rounded-lg font-body font-body-normal text-sm
      transition-color hover:bg-primary-50 hover:text-primary
      ${isActive 
        ? 'bg-primary text-primary-foreground shadow-soft-sm' 
        : 'text-text-secondary hover:text-primary'
      }
    `;

    const mobileClasses = `
      flex flex-col items-center justify-center px-2 py-2 rounded-lg font-caption text-xs
      transition-color hover:bg-primary-50 hover:text-primary min-h-[60px]
      ${isActive 
        ? 'bg-primary text-primary-foreground shadow-soft-sm' 
        : 'text-text-secondary hover:text-primary'
      }
    `;

    return (
      <Link
        to={item.path}
        className={isMobile ? mobileClasses : baseClasses}
        title={item.label}
      >
        <Icon 
          name={item.icon} 
          size={isMobile ? 20 : 18} 
          className={isMobile ? 'mb-1' : 'mr-2'} 
        />
        <span className={isMobile ? 'text-center leading-tight' : ''}>
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-16 z-50 bg-background border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeTab === item.id}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <Link
                to="/course-player"
                className="flex items-center px-3 py-2 text-sm font-body text-accent hover:text-accent-600 transition-color"
              >
                <Icon name="Play" size={16} className="mr-1" />
                Continue Learning
              </Link>
              
              {user.role === 'learner' && (
                <div className="flex items-center px-3 py-2 bg-accent-50 rounded-lg">
                  <Icon name="Zap" size={16} className="text-accent mr-2" />
                  <span className="text-sm font-data text-accent-700">1,250 XP</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-1000 bg-background border-t border-subtle">
        <div className="grid grid-cols-4 gap-1 px-2 py-1">
          {navigationItems.slice(0, 4).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              isMobile={true}
            />
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Padding */}
      <div className="md:hidden h-20"></div>
    </>
  );
};

export default PrimaryNavigation;