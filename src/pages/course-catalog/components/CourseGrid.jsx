import React from 'react';
import CourseCard from './CourseCard';

const CourseGrid = ({ 
  courses, 
  loading, 
  enrolledCourses = [], 
  courseProgress = {} 
}) => {
  const SkeletonCard = () => (
    <div className="bg-card rounded-lg shadow-soft-sm border border-subtle overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-video bg-surface animate-pulse-gentle" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-surface rounded animate-pulse-gentle" />
        
        {/* Instructor */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-surface rounded-full animate-pulse-gentle" />
          <div className="h-4 bg-surface rounded w-24 animate-pulse-gentle" />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-surface rounded animate-pulse-gentle" />
          <div className="h-4 bg-surface rounded w-3/4 animate-pulse-gentle" />
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-surface rounded w-16 animate-pulse-gentle" />
          <div className="h-4 bg-surface rounded w-12 animate-pulse-gentle" />
        </div>
        
        {/* Metrics */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-surface rounded w-20 animate-pulse-gentle" />
          <div className="h-4 bg-surface rounded w-16 animate-pulse-gentle" />
        </div>
        
        {/* Button */}
        <div className="h-9 bg-surface rounded animate-pulse-gentle" />
      </div>
    </div>
  );

  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  const getProgress = (courseId) => {
    return courseProgress[courseId] || 0;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-heading font-heading-semibold text-text-primary mb-2">
            No courses found
          </h3>
          <p className="text-text-secondary font-body mb-6">
            We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
          </p>
          <div className="space-y-2 text-sm text-text-muted font-body">
            <p>• Check your spelling</p>
            <p>• Try broader search terms</p>
            <p>• Remove some filters</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isEnrolled={isEnrolled(course.id)}
          progress={getProgress(course.id)}
        />
      ))}
    </div>
  );
};

export default CourseGrid;