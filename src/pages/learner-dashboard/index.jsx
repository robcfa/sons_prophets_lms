import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
  const [user, setUser] = useState(null);
  const [isAIExpanded, setIsAIExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate user data loading
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'learner',
      joinDate: new Date('2024-01-15'),
      currentXP: 1250,
      nextLevelXP: 2000,
      level: 3,
      streak: 7,
      totalCourses: 5,
      completedCourses: 2,
      badges: [
        { id: 1, name: 'First Steps', icon: 'BookOpen', earnedDate: new Date('2024-01-20') },
        { id: 2, name: 'Discussion Starter', icon: 'MessageSquare', earnedDate: new Date('2024-02-01') },
        { id: 3, name: 'Scripture Scholar', icon: 'Award', earnedDate: new Date('2024-02-15') },
        { id: 4, name: 'Dedicated Student', icon: 'Zap', earnedDate: new Date('2024-03-01') }
      ]
    };
    setUser(mockUser);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for components
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
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-secondary font-body">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Sons Prophets LMS</title>
        <meta name="description" content="Your personalized learning dashboard for Old Testament prophecy education" />
      </Helmet>

      <div className="min-h-screen bg-page" data-theme="sons-prophets-light">
        <GlobalHeader />
        <PrimaryNavigation />
        <BreadcrumbTrail />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-gold2">
            <div className="flex items-center justify-between mb-gold">
              <div>
                <h1 className="text-3xl font-heading font-heading-bold text-primary">
                  {getGreeting()}, {user.name}!
                </h1>
                <p className="text-secondary font-body mt-small">
                  Ready to continue your theological journey?
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-4 text-sm font-caption text-tertiary">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Study streak: {user.streak} days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>

            {/* XP Card */}
            <div className="mb-gold2">
              <XPCard
                currentXP={user.currentXP}
                nextLevelXP={user.nextLevelXP}
                level={user.level}
                badges={user.badges}
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
                    <span className="text-sm font-body text-secondary">Courses Completed</span>
                    <span className="text-sm font-data font-bold text-primary">
                      {user.completedCourses}/{user.totalCourses}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-secondary">Forum Posts</span>
                    <span className="text-sm font-data font-bold text-primary">23</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-secondary">Badges Earned</span>
                    <span className="text-sm font-data font-bold text-primary">{user.badges.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-specific bottom spacing */}
          <div className="md:hidden h-8"></div>
        </main>

        {/* AI Assistant Chat */}
        <AIAssistantChat
          isExpanded={isAIExpanded}
          onToggle={() => setIsAIExpanded(!isAIExpanded)}
        />
      </div>
    </>
  );
};

export default LearnerDashboard;