import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import { getUserPlan } from '../../utils/planUtils';
import { safeGet } from '../../utils/safeObjectUtils';
import MobileNav from '../../components/Layout/MobileNav';
import Sidebar from '../../components/Layout/Sidebar';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import XPCard from './components/XPCard';
import CourseProgressWidget from './components/CourseProgressWidget';
import CommunityActivityFeed from './components/CommunityActivityFeed';
import UpcomingEventsWidget from './components/UpcomingEventsWidget';
import RecentAchievements from './components/RecentAchievements';
import AIAssistantChat from './components/AIAssistantChat';
import QuickActions from './components/QuickActions';

const LearnerDashboard = () => {
  const { user, userProfile } = useAuth();
  const userPlan = getUserPlan({ user, userProfile });
  const [isAIExpanded, setIsAIExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute with cleanup
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Enhanced mock data with proper defaults
  const mockCourses = [
    {
      id: 1,
      title: 'Introduction to Prophetic Literature',
      instructor: 'Dr. Sarah Martinez',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      progress: 75,
      completedLessons: 12,
      totalLessons: 16,
      timeRemaining: 180,
      totalDuration: 720
    },
    {
      id: 2,
      title: 'Understanding Isaiah',
      instructor: 'Prof. Michael Thompson',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      progress: 45,
      completedLessons: 9,
      totalLessons: 20,
      timeRemaining: 330,
      totalDuration: 600
    },
    {
      id: 3,
      title: 'Ezekiel\'s Visions Explained',
      instructor: 'Pastor David Kim',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      progress: 20,
      completedLessons: 3,
      totalLessons: 15,
      timeRemaining: 480,
      totalDuration: 600
    }
  ];

  const mockAchievements = [
    {
      id: 1,
      name: 'Scripture Scholar',
      description: 'Completed advanced study of Isaiah chapters 40-55 with perfect quiz scores',
      type: 'mastery',
      earnedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      xpReward: 150,
      isNew: true
    },
    {
      id: 2,
      name: 'Discussion Leader',
      description: 'Started 5 meaningful discussions in the community forum',
      type: 'participation',
      earnedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      xpReward: 100,
      isNew: false
    },
    {
      id: 3,
      name: 'Week Warrior',
      description: 'Maintained a 7-day study streak',
      type: 'streak',
      earnedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      xpReward: 75,
      isNew: false
    },
    {
      id: 4,
      name: 'Course Conqueror',
      description: 'Successfully completed "Introduction to Christian Theology"',
      type: 'course_completion',
      earnedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      xpReward: 200,
      isNew: false
    }
  ];

  const getGreeting = () => {
    try {
      const hour = currentTime?.getHours() || 12;
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    } catch (error) {
      console.warn('Error getting greeting:', error);
      return 'Hello';
    }
  };

  // Enhanced loading state with error boundary
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-text-secondary font-body">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Safe access to user properties with defaults
  const displayName = safeGet(userProfile, 'full_name') || 
                      safeGet(user, 'email') || 
                      'User';

  return (
    <>
      <Helmet>
        <title>Dashboard - Sons Prophets LMS</title>
        <meta name="description" content="Your personalized learning dashboard for Old Testament prophecy education" />
      </Helmet>

      <div className="min-h-screen bg-background" data-theme="sons-prophets-light">
        <MobileNav plan={userPlan} />
        <div className="flex">
          <Sidebar plan={userPlan} />
          
          <div className="flex-1 flex flex-col">
            <GlobalHeader />
            <PrimaryNavigation />
            <BreadcrumbTrail />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
              {/* Welcome Section with safe property access */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-heading font-bold text-primary">
                      {getGreeting()}, {displayName}!
                    </h1>
                    <p className="text-text-secondary font-body mt-2">
                      Ready to continue your theological journey?
                    </p>
                  </div>
                  
                  <div className="hidden md:flex items-center space-x-4 text-sm font-caption text-text-muted">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Online</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Plan: {userPlan || 'Free'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{currentTime?.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      }) || 'Today'}</span>
                    </div>
                  </div>
                </div>

                {/* XP Card with error boundary */}
                <div className="mb-8">
                  <XPCard
                    currentXP={1250}
                    nextLevelXP={2000}
                    level={3}
                    badges={[
                      { id: 1, name: 'First Steps', icon: 'BookOpen', earnedDate: new Date() },
                      { id: 2, name: 'Discussion Starter', icon: 'MessageSquare', earnedDate: new Date() }
                    ]}
                  />
                </div>
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-gold2">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-gold2">
                  {/* Quick Actions */}
                  <div className="dashboard-section">
                    <QuickActions />
                  </div>

                  {/* Course Progress */}
                  <div className="dashboard-section">
                    <CourseProgressWidget courses={mockCourses} />
                  </div>

                  {/* Community Activity Feed */}
                  <div className="dashboard-section">
                    <CommunityActivityFeed />
                  </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-gold2">
                  {/* Upcoming Events */}
                  <div className="dashboard-section">
                    <UpcomingEventsWidget />
                  </div>

                  {/* Recent Achievements */}
                  <div className="dashboard-section">
                    <RecentAchievements achievements={mockAchievements} />
                  </div>

                  {/* Study Stats Card */}
                  <div className="card-themed">
                    <h3 className="text-lg font-heading font-heading-semibold text-primary mb-gold">
                      Study Statistics
                    </h3>
                    
                    <div className="space-y-gold">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-body text-secondary">Total Study Time</span>
                        <span className="text-sm font-data font-bold text-primary">47h 32m</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-body text-secondary">Plan</span>
                        <span className="text-sm font-data font-bold text-primary capitalize">
                          {userPlan}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-body text-secondary">Forum Posts</span>
                        <span className="text-sm font-data font-bold text-primary">23</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-body text-secondary">Badges Earned</span>
                        <span className="text-sm font-data font-bold text-primary">4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile-specific bottom spacing */}
              <div className="md:hidden h-8"></div>
            </main>
          </div>
        </div>

        {/* AI Assistant Chat with safe props */}
        <AIAssistantChat
          isExpanded={isAIExpanded}
          onToggle={() => setIsAIExpanded(!isAIExpanded)}
        />
      </div>
    </>
  );
};

export default LearnerDashboard;