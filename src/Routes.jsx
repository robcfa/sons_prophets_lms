import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import PrivateRoute from "components/ui/PrivateRoute";
// Add your imports here
import Login from "pages/login";
import CourseCatalog from "pages/course-catalog";
import Register from "pages/register";
import LearnerDashboard from "pages/learner-dashboard";
import CoursePlayer from "pages/course-player";
import BibleStudyInterface from "pages/bible-study-interface";
import CommunityForum from "pages/community-forum";
import EventsCalendar from "pages/events-calendar";
import AdminContentManagement from "pages/admin-content-management";
import CoachDashboard from "pages/coach-dashboard";
import UserProfile from "pages/Profile/UserProfile";
import CoachProfileView from "pages/Profile/CoachProfileView";
import Webinar from "pages/Webinar";
import NotFound from "pages/NotFound";
import DesignSystemTokens from "pages/design-system-tokens";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Protected routes */}
        <Route path="/course-catalog" element={
          <PrivateRoute>
            <CourseCatalog />
          </PrivateRoute>
        } />
        <Route path="/learner-dashboard" element={
          <PrivateRoute>
            <LearnerDashboard />
          </PrivateRoute>
        } />
        <Route path="/course-player" element={
          <PrivateRoute>
            <CoursePlayer />
          </PrivateRoute>
        } />
        <Route path="/bible-study-interface" element={
          <PrivateRoute>
            <BibleStudyInterface />
          </PrivateRoute>
        } />
        <Route path="/community-forum" element={
          <PrivateRoute>
            <CommunityForum />
          </PrivateRoute>
        } />
        <Route path="/events-calendar" element={
          <PrivateRoute>
            <EventsCalendar />
          </PrivateRoute>
        } />
        <Route path="/admin-content-management" element={
          <PrivateRoute>
            <AdminContentManagement />
          </PrivateRoute>
        } />
        <Route path="/coach-dashboard" element={
          <PrivateRoute>
            <CoachDashboard />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        } />
        <Route path="/coach/:coachId" element={
          <PrivateRoute>
            <CoachProfileView />
          </PrivateRoute>
        } />
        <Route path="/webinar" element={
          <PrivateRoute>
            <Webinar />
          </PrivateRoute>
        } />
        <Route path="/design-system-tokens" element={
          <PrivateRoute>
            <DesignSystemTokens />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;