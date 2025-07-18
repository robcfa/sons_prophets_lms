import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const GlobalHeader = () => {
  const { user, userProfile, signOut } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Memoize user data to prevent unnecessary re-renders
  const currentUser = useMemo(() => {
    if (user || userProfile) {
      return {
        name: user?.name || userProfile?.name || user?.email?.split('@')[0] || 'User',
        role: user?.role || userProfile?.role || localStorage.getItem('userRole') || 'learner',
        avatar: user?.avatar || userProfile?.avatar || '/assets/images/avatar-placeholder.png',
        email: user?.email || userProfile?.email || localStorage.getItem('userEmail') || ''
      };
    }
    return null;
  }, [user, userProfile]);

  useEffect(() => {
    // Only set notifications if we have a user
    if (currentUser) {
      // Simulate notifications - this would come from an API in a real app
      const mockNotifications = [
        {
          id: 1,
          type: 'course',
          title: 'New lesson available',
          message: 'Biblical Hermeneutics - Chapter 3 is now available',
          time: '2 hours ago',
          read: false
        },
        {
          id: 2,
          type: 'community',
          title: 'Forum reply',
          message: 'Someone replied to your discussion about prayer',
          time: '1 day ago',
          read: false
        },
        {
          id: 3,
          type: 'achievement',
          title: 'Achievement unlocked',
          message: 'You completed 5 Bible study sessions this week!',
          time: '2 days ago',
          read: true
        }
      ];

      setNotifications(mockNotifications);
    }
  }, [currentUser]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setShowProfileMenu(false);
      setMobileMenuOpen(false);
      // Navigation will be handled by the AuthContext and route protection
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'course':
        return 'BookOpen';
      case 'community':
        return 'MessageCircle';
      case 'achievement':
        return 'Award';
      default:
        return 'Bell';
    }
  };

  const Logo = React.memo(() => (
    <Link to="/learner-dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-soft-sm">
        <Icon name="Flame" size={24} color="white" strokeWidth={2} />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-heading-semibold text-primary">Sons of The Prophets</h1>
        <p className="text-xs font-caption text-text-secondary -mt-1">
          Learning Management System
        </p>
      </div>
    </Link>
  ));

  Logo.displayName = 'Logo';

  if (!currentUser) {
    return (
      <header className="fixed top-0 left-0 right-0 z-1000 bg-background border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1000 bg-background border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <input
                  type="text"
                  placeholder="Search courses, discussions..."
                  className="pl-10 pr-4 py-2 w-64 bg-surface border border-subtle rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNotificationClick}
                  className="relative p-2"
                >
                  <Icon name="Bell" size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-data">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-soft-lg border border-subtle z-1100">
                    <div className="p-4 border-b border-subtle">
                      <h3 className="font-heading font-heading-semibold text-text-primary">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-subtle hover:bg-surface transition-colors duration-200 cursor-pointer ${
                              !notification.read ? 'bg-primary-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <Icon
                                  name={getNotificationIcon(notification.type)}
                                  size={16}
                                  className="text-primary mt-1"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-body font-body-semibold text-text-primary">
                                  {notification.title}
                                </p>
                                <p className="text-sm font-body text-text-secondary mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs font-caption text-text-muted mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Icon name="Bell" size={32} className="text-text-muted mx-auto mb-2" />
                          <p className="text-text-secondary font-body">No notifications yet</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t border-subtle">
                      <Button variant="ghost" size="sm" fullWidth>
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 p-2"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-heading font-heading-semibold text-primary">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <Icon name="ChevronDown" size={16} />
                </Button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-card rounded-lg shadow-soft-lg border border-subtle z-1100">
                    <div className="p-4 border-b border-subtle">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-heading font-heading-semibold text-primary">
                            {currentUser.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-body font-body-semibold text-text-primary">
                            {currentUser.name}
                          </p>
                          <p className="text-sm font-caption text-text-secondary">
                            {currentUser.email}
                          </p>
                          <span className="inline-block px-2 py-1 text-xs font-caption bg-accent-100 text-accent-700 rounded-full mt-1 capitalize">
                            {currentUser.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Button variant="ghost" size="sm" fullWidth className="justify-start">
                        <Icon name="User" size={16} className="mr-2" />
                        Profile Settings
                      </Button>
                      <Button variant="ghost" size="sm" fullWidth className="justify-start">
                        <Icon name="Settings" size={16} className="mr-2" />
                        Preferences
                      </Button>
                      <Button variant="ghost" size="sm" fullWidth className="justify-start">
                        <Icon name="HelpCircle" size={16} className="mr-2" />
                        Help & Support
                      </Button>
                      <div className="border-t border-subtle my-2"></div>
                      <Button
                        variant="ghost"
                        size="sm"
                        fullWidth
                        className="justify-start text-error hover:bg-error-50"
                        onClick={handleLogout}
                      >
                        <Icon name="LogOut" size={16} className="mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileMenuToggle}
                className="p-2"
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-subtle">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full bg-surface border border-subtle rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-text-primary">Theme</span>
                <ThemeToggle />
              </div>

              {/* Mobile User Info */}
              <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-heading font-heading-semibold text-primary">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-body font-body-semibold text-text-primary">
                    {currentUser.name}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs font-caption bg-accent-100 text-accent-700 rounded-full capitalize">
                    {currentUser.role}
                  </span>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="space-y-2">
                <Button variant="ghost" size="sm" fullWidth className="justify-start">
                  <Icon name="Bell" size={16} className="mr-2" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
                <Button variant="ghost" size="sm" fullWidth className="justify-start">
                  <Icon name="User" size={16} className="mr-2" />
                  Profile Settings
                </Button>
                <Button variant="ghost" size="sm" fullWidth className="justify-start">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Preferences
                </Button>
                <Button variant="ghost" size="sm" fullWidth className="justify-start">
                  <Icon name="HelpCircle" size={16} className="mr-2" />
                  Help & Support
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  className="justify-start text-error hover:bg-error-50"
                  onClick={handleLogout}
                >
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Click outside handlers */}
      {(showNotifications || showProfileMenu) && (
        <div
          className="fixed inset-0 z-1000"
          onClick={() => {
            setShowNotifications(false);
            setShowProfileMenu(false);
          }}
        />
      )}
    </>
  );
};

export default GlobalHeader;