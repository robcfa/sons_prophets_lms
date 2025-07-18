import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { safeGet } from '../../../utils/safeObjectUtils';

const CourseProgressWidget = ({ courses = [] }) => {
  const formatDuration = (minutes) => {
    const safeMinutes = Number(minutes) || 0;
    const hours = Math.floor(safeMinutes / 60);
    const mins = safeMinutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Ensure courses is always an array with enhanced safety
  const safeCourses = React.useMemo(() => {
    if (!Array.isArray(courses)) {
      return [];
    }
    
    return courses.filter(course => course && typeof course === 'object');
  }, [courses]);

  return (
    <div className="bg-card rounded-xl shadow-soft-md border border-subtle p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
          My Courses
        </h2>
        <Link to="/course-catalog">
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Browse More
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {safeCourses.map((course, index) => {
          // Safe course data access
          const courseId = safeGet(course, 'id') || `course-${index}`;
          const courseTitle = safeGet(course, 'title') || 'Untitled Course';
          const courseInstructor = safeGet(course, 'instructor') || 'Unknown Instructor';
          const courseProgress = Math.round(safeGet(course, 'progress') || 0);
          const courseTimeRemaining = safeGet(course, 'timeRemaining') || 0;
          const courseCompletedLessons = safeGet(course, 'completedLessons') || 0;
          const courseTotalLessons = safeGet(course, 'totalLessons') || 0;
          const courseTotalDuration = safeGet(course, 'totalDuration') || 0;
          const courseThumbnail = safeGet(course, 'thumbnail');
          
          return (
            <div key={courseId} className="bg-surface rounded-lg p-4 hover:shadow-soft-sm transition-all duration-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={courseThumbnail}
                    alt={courseTitle}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-body font-body-semibold text-text-primary truncate">
                        {courseTitle}
                      </h3>
                      <p className="text-sm font-caption text-text-secondary">
                        {courseInstructor}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-data text-primary font-bold">
                        {courseProgress}%
                      </p>
                      <p className="text-xs font-caption text-text-muted">
                        {formatDuration(courseTimeRemaining)} left
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="w-full bg-border rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all duration-500"
                        style={{ width: `${Math.min(courseProgress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs font-caption text-text-muted">
                      <span className="flex items-center">
                        <Icon name="BookOpen" size={14} className="mr-1" />
                        {courseCompletedLessons}/{courseTotalLessons} lessons
                      </span>
                      <span className="flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {formatDuration(courseTotalDuration)}
                      </span>
                    </div>
                    
                    <Link to={`/course-player/${courseId}`}>
                      <Button variant="primary" size="sm">
                        <Icon name="Play" size={14} className="mr-1" />
                        Continue
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {safeCourses.length === 0 && (
        <div className="text-center py-8">
          <Icon name="BookOpen" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary font-body mb-2">No courses enrolled yet</p>
          <p className="text-sm text-text-muted font-body mb-4">
            Start your theological journey by enrolling in a course
          </p>
          <Link to="/course-catalog">
            <Button variant="primary">
              Explore Courses
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseProgressWidget;