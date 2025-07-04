import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = () => {
  const location = useLocation();

  const getBreadcrumbs = (pathname) => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    
    // Define route mappings with hierarchical structure
    const routeMap = {
      'learner-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
      'coach-dashboard': { label: 'Coach Dashboard', icon: 'LayoutDashboard' },
      'admin-dashboard': { label: 'Admin Dashboard', icon: 'LayoutDashboard' },
      'course-catalog': { label: 'Course Catalog', icon: 'Library', parent: 'Learn' },
      'course-player': { label: 'Course Player', icon: 'Play', parent: 'Learn' },
      'bible-study-interface': { label: 'Bible Study', icon: 'Book', parent: 'Learn' },
      'community-forum': { label: 'Discussion Forum', icon: 'MessageSquare', parent: 'Community' },
      'events-calendar': { label: 'Events Calendar', icon: 'Calendar', parent: 'Community' },
      'admin-content-management': { label: 'Content Management', icon: 'FileText', parent: 'Manage' }
    };

    const breadcrumbs = [];

    // Always start with Home/Dashboard
    breadcrumbs.push({
      label: 'Home',
      path: '/learner-dashboard',
      icon: 'Home',
      isHome: true
    });

    // Process path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[segment];
      
      if (routeInfo) {
        // Add parent category if exists and not already added
        if (routeInfo.parent && !breadcrumbs.some(b => b.label === routeInfo.parent)) {
          breadcrumbs.push({
            label: routeInfo.parent,
            path: null, // Category, not clickable
            icon: getParentIcon(routeInfo.parent),
            isCategory: true
          });
        }

        // Add current route
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon,
          isActive: index === pathSegments.length - 1
        });
      }
    });

    // Handle special cases for dynamic routes
    if (pathname.includes('/course-player/')) {
      const courseId = pathSegments[pathSegments.length - 1];
      breadcrumbs.push({
        label: `Course: ${courseId}`, // In real app, fetch course title
        path: pathname,
        icon: 'BookOpen',
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const getParentIcon = (parent) => {
    const parentIcons = {
      'Learn': 'BookOpen',
      'Community': 'Users',
      'Manage': 'Settings'
    };
    return parentIcons[parent] || 'Folder';
  };

  const breadcrumbs = getBreadcrumbs(location.pathname);

  // Don't show breadcrumbs on login/register pages or if only home
  if (location.pathname === '/login' || 
      location.pathname === '/register' || 
      breadcrumbs.length <= 1) {
    return null;
  }

  const BreadcrumbItem = ({ item, isLast, index }) => {
    const itemContent = (
      <div className="flex items-center space-x-2 group">
        <Icon 
          name={item.icon} 
          size={16} 
          className={`${
            item.isActive 
              ? 'text-primary' 
              : item.isCategory 
                ? 'text-accent' :'text-text-secondary group-hover:text-primary'
          } transition-color`}
        />
        <span className={`font-body text-sm ${
          item.isActive 
            ? 'text-primary font-body-semibold' 
            : item.isCategory 
              ? 'text-accent font-body-semibold' :'text-text-secondary group-hover:text-primary'
        } transition-color`}>
          {item.label}
        </span>
      </div>
    );

    return (
      <div className="flex items-center">
        {item.path && !item.isActive ? (
          <Link 
            to={item.path} 
            className="hover:bg-primary-50 px-2 py-1 rounded transition-color"
          >
            {itemContent}
          </Link>
        ) : (
          <div className="px-2 py-1">
            {itemContent}
          </div>
        )}
        
        {!isLast && (
          <Icon 
            name="ChevronRight" 
            size={16} 
            className="text-text-muted mx-1 flex-shrink-0" 
          />
        )}
      </div>
    );
  };

  const MobileBreadcrumb = () => {
    const currentItem = breadcrumbs[breadcrumbs.length - 1];
    const parentItem = breadcrumbs.length > 2 ? breadcrumbs[breadcrumbs.length - 2] : breadcrumbs[0];

    return (
      <div className="flex items-center justify-between">
        <Link 
          to={parentItem.path || '/learner-dashboard'}
          className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-color"
        >
          <Icon name="ArrowLeft" size={20} />
          <span className="font-body text-sm">Back</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Icon 
            name={currentItem.icon} 
            size={16} 
            className="text-primary" 
          />
          <span className="font-body font-body-semibold text-primary text-sm">
            {currentItem.label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <nav className="bg-surface border-b border-subtle" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Breadcrumbs */}
        <div className="hidden md:flex items-center py-3 overflow-x-auto">
          <ol className="flex items-center space-x-1 min-w-0">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center flex-shrink-0">
                <BreadcrumbItem 
                  item={item} 
                  isLast={index === breadcrumbs.length - 1}
                  index={index}
                />
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile Breadcrumbs */}
        <div className="md:hidden py-3">
          <MobileBreadcrumb />
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbTrail;