import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/ui/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './lib/theme-context';
import ScrollToTop from './components/ScrollToTop';

// Import all existing pages
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NotFoundPage from './pages/NotFound';
import LearnerDashboard from './pages/learner-dashboard';
import CoachDashboard from './pages/coach-dashboard';
import AdminContentManagement from './pages/admin-content-management';
import CourseCatalog from './pages/course-catalog';
import CoursePlayer from './pages/course-player';
import CommunityForum from './pages/community-forum';
import BibleStudyInterface from './pages/bible-study-interface';
import EventsCalendar from './pages/events-calendar';
import UserProfile from './pages/Profile/UserProfile';
import CoachProfilePage from './pages/CoachProfilePage';
import ThemeConfiguration from './pages/theme-configuration';
import DesignSystemTokens from './pages/design-system-tokens';
import DesignSystemFoundation from './pages/design-system-foundation';
import Webinar from './pages/Webinar';

// Import new auth-related components
import ForgotPassword from './components/ui/ForgotPassword';
import ResetPassword from './components/ui/ResetPassword';
import EmailVerification from './components/ui/EmailVerification';

function AppRoutes() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <LearnerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/learner-dashboard"
              element={
                <PrivateRoute>
                  <LearnerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/coach-dashboard"
              element={
                <PrivateRoute allowedRoles={['coach', 'admin']}>
                  <CoachDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-content-management"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminContentManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/course-catalog"
              element={
                <PrivateRoute>
                  <CourseCatalog />
                </PrivateRoute>
              }
            />
            <Route
              path="/course-player"
              element={
                <PrivateRoute>
                  <CoursePlayer />
                </PrivateRoute>
              }
            />
            <Route
              path="/community-forum"
              element={
                <PrivateRoute>
                  <CommunityForum />
                </PrivateRoute>
              }
            />
            <Route
              path="/bible-study-interface"
              element={
                <PrivateRoute>
                  <BibleStudyInterface />
                </PrivateRoute>
              }
            />
            <Route
              path="/events-calendar"
              element={
                <PrivateRoute>
                  <EventsCalendar />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/coach-profile/:id"
              element={
                <PrivateRoute>
                  <CoachProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/theme-configuration"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <ThemeConfiguration />
                </PrivateRoute>
              }
            />
            <Route
              path="/design-system-tokens"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <DesignSystemTokens />
                </PrivateRoute>
              }
            />
            <Route
              path="/design-system-foundation"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <DesignSystemFoundation />
                </PrivateRoute>
              }
            />
            <Route
              path="/webinar"
              element={
                <PrivateRoute>
                  <Webinar />
                </PrivateRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;