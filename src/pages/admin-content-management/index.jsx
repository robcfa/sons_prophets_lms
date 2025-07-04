import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import CourseManagementTab from './components/CourseManagementTab';
import MediaLibraryTab from './components/MediaLibraryTab';
import UserManagementTab from './components/UserManagementTab';
import SystemSettingsTab from './components/SystemSettingsTab';
import AIWizardModal from './components/AIWizardModal';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const AdminContentManagement = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [showAIWizard, setShowAIWizard] = useState(false);
  const [adminStats, setAdminStats] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock admin statistics
    const mockStats = {
      totalCourses: 24,
      totalUsers: 1247,
      activeUsers: 892,
      totalContent: 156,
      pendingReviews: 8,
      systemHealth: 98.5
    };
    setAdminStats(mockStats);

    // Mock admin notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'system',
        title: 'System Update Available',
        message: 'A new system update is available for installation.',
        time: new Date(Date.now() - 30 * 60 * 1000),
        priority: 'medium'
      },
      {
        id: 2,
        type: 'content',
        title: 'Content Review Required',
        message: '3 new courses are pending approval.',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000),
        priority: 'high'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'courses', label: 'Courses', icon: 'BookOpen' },
    { id: 'media', label: 'Media Library', icon: 'Image' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const handleAIWizardComplete = (courseData) => {
    // Handle course creation logic here
  };

  const StatCard = ({ title, value, icon, color = 'primary', trend }) => (
    <div className="bg-card border border-subtle rounded-lg p-6 hover:shadow-soft-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={`text-${color}-600`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend > 0 ? 'text-success-600' : 'text-error-600'
          }`}>
            <Icon name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-heading font-heading-semibold text-text-primary mb-1">
          {value}
        </h3>
        <p className="text-text-secondary text-sm">{title}</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'courses':
        return <CourseManagementTab onAIWizardOpen={() => setShowAIWizard(true)} />;
      case 'media':
        return <MediaLibraryTab />;
      case 'users':
        return <UserManagementTab />;
      case 'settings':
        return <SystemSettingsTab />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Content Management - Sons Prophets LMS</title>
        <meta name="description" content="Comprehensive administrative interface for managing courses, users, content, and system settings in the Sons Prophets theological education platform." />
        <meta name="keywords" content="admin, content management, LMS, theological education, course management, user management" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <BreadcrumbTrail />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-heading-semibold text-text-primary mb-2">
                  Admin Content Management
                </h1>
                <p className="text-text-secondary">
                  Manage courses, users, content, and system settings for the Sons Prophets LMS platform.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  iconName="Bell"
                  className="relative"
                >
                  Notifications
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
                <Button
                  variant="primary"
                  iconName="Sparkles"
                  onClick={() => setShowAIWizard(true)}
                >
                  AI Assistant
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <StatCard
              title="Total Courses"
              value={adminStats.totalCourses}
              icon="BookOpen"
              color="primary"
              trend={8}
            />
            <StatCard
              title="Total Users"
              value={adminStats.totalUsers}
              icon="Users"
              color="secondary"
              trend={12}
            />
            <StatCard
              title="Active Users"
              value={adminStats.activeUsers}
              icon="UserCheck"
              color="success"
              trend={5}
            />
            <StatCard
              title="Content Items"
              value={adminStats.totalContent}
              icon="FileText"
              color="accent"
              trend={15}
            />
            <StatCard
              title="Pending Reviews"
              value={adminStats.pendingReviews}
              icon="Clock"
              color="warning"
              trend={-3}
            />
            <StatCard
              title="System Health"
              value={`${adminStats.systemHealth}%`}
              icon="Activity"
              color="success"
              trend={2}
            />
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-subtle rounded-lg mb-6">
            <div className="border-b border-subtle">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-body whitespace-nowrap border-b-2 transition-color ${
                      activeTab === tab.id
                        ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-primary hover:bg-surface'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-card border border-subtle rounded-lg p-6">
            <h2 className="font-heading font-heading-semibold text-text-primary text-lg mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                iconName="Plus"
                fullWidth
                className="justify-start"
              >
                Create New Course
              </Button>
              <Button
                variant="outline"
                iconName="UserPlus"
                fullWidth
                className="justify-start"
              >
                Invite Users
              </Button>
              <Button
                variant="outline"
                iconName="Upload"
                fullWidth
                className="justify-start"
              >
                Upload Content
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                fullWidth
                className="justify-start"
              >
                Export Data
              </Button>
            </div>
          </div>
        </main>

        {/* AI Wizard Modal */}
        <AIWizardModal
          isOpen={showAIWizard}
          onClose={() => setShowAIWizard(false)}
          onComplete={handleAIWizardComplete}
        />
      </div>
    </>
  );
};

export default AdminContentManagement;