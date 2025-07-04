import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
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
import HuddlePage from "pages/huddle";
import RecordingUploadPage from "pages/meeting-recording-upload";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course-catalog" element={<CourseCatalog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learner-dashboard" element={<LearnerDashboard />} />
        <Route path="/course-player" element={<CoursePlayer />} />
        <Route path="/bible-study-interface" element={<BibleStudyInterface />} />
        <Route path="/community-forum" element={<CommunityForum />} />
        <Route path="/events-calendar" element={<EventsCalendar />} />
        <Route path="/huddle" element={<HuddlePage />} />
        <Route path="/meeting/:id/upload-recording" element={<RecordingUploadPage />} />
        <Route path="/admin-content-management" element={<AdminContentManagement />} />
        <Route path="/coach-dashboard" element={<CoachDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
