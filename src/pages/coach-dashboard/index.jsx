import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import NotificationCenter from '../../components/ui/NotificationCenter';

// Import dashboard components
import CoachingStats from './components/CoachingStats';
import LearnerManagementTable from './components/LearnerManagementTable';
import ForumActivityPanel from './components/ForumActivityPanel';
import AINoteSummaryWizard from './components/AINoteSummaryWizard';
import EventManagementSection from './components/EventManagementSection';
import QuickActionsPanel from './components/QuickActionsPanel';

const CoachDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalLearners: 24,
    activeDiscussions: 8,
    upcomingEvents: 4,
    pendingReviews: 3
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time data updates
    const dataTimer = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        activeDiscussions: Math.max(5, prev.activeDiscussions + Math.floor(Math.random() * 3) - 1)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(dataTimer);
  }, []);

  const formatCurrentTime = () => {
    return currentTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryNavigation />
      <BreadcrumbTrail />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                {getGreeting()}, Coach!
              </h1>
              <p className="text-lg font-body text-text-secondary">
                {formatCurrentTime()}
              </p>
              <p className="text-sm font-body text-text-muted mt-1">
                You have {dashboardData.pendingReviews} pending reviews and {dashboardData.upcomingEvents} upcoming events today.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Icon name="Bell" size={20} />
                  {dashboardData.pendingReviews > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-data">
                      {dashboardData.pendingReviews}
                    </span>
                  )}
                </Button>
                
                <NotificationCenter
                  isOpen={showNotifications}
                  onClose={() => setShowNotifications(false)}
                  onToggle={() => setShowNotifications(!showNotifications)}
                />
              </div>
              
              <Link to="/course-catalog">
                <Button variant="primary" size="sm">
                  <Icon name="BookOpen" size={16} className="mr-2" />
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Coaching Statistics */}
        <CoachingStats />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Learner Management */}
          <div className="xl:col-span-2 space-y-8">
            <LearnerManagementTable />
            <EventManagementSection />
          </div>

          {/* Right Column - Activity & Tools */}
          <div className="space-y-8">
            <ForumActivityPanel />
            <QuickActionsPanel />
          </div>
        </div>

        {/* AI Tools Section */}
        <div className="mb-8">
          <AINoteSummaryWizard />
        </div>

        {/* Footer Actions */}
        <div className="bg-card rounded-lg border border-subtle p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
                Need Help Getting Started?
              </h3>
              <p className="text-sm font-body text-text-secondary">
                Explore our coaching resources and best practices guide.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Icon name="HelpCircle" size={16} className="mr-2" />
                Help Center
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="BookOpen" size={16} className="mr-2" />
                Coaching Guide
              </Button>
              <Button variant="primary" size="sm">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Spacing */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default CoachDashboard;