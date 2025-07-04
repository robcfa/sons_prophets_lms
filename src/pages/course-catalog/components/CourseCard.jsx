import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, isEnrolled = false, progress = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-success-100 text-success-700';
      case 'intermediate':
        return 'bg-warning-100 text-warning-700';
      case 'advanced':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-text-muted text-white';
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? "Star" : "Star"}
        size={14}
        className={index < Math.floor(rating) ? "text-warning fill-current" : "text-text-muted"}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg shadow-soft-sm border border-subtle hover:shadow-soft-md transition-all duration-200 overflow-hidden group hover-lift">
      {/* Course Image */}
      <div className="relative aspect-video bg-surface overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface animate-pulse-gentle flex items-center justify-center">
            <Icon name="BookOpen" size={32} className="text-text-muted" />
          </div>
        )}
        <Image
          src={course.thumbnail}
          alt={course.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <Button
            variant="primary"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-200"
            iconName="Play"
            iconPosition="left"
          >
            Preview
          </Button>
        </div>

        {/* Progress Bar for Enrolled Courses */}
        {isEnrolled && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
            <div 
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Enrollment Status Badge */}
        {isEnrolled && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 text-xs font-caption bg-primary text-primary-foreground rounded-full">
              <Icon name="CheckCircle" size={12} className="mr-1" />
              Enrolled
            </span>
          </div>
        )}

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 text-xs font-caption rounded-full ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Course Title */}
        <h3 className="font-heading font-heading-semibold text-text-primary text-lg mb-2 line-clamp-2 group-hover:text-primary transition-color">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-heading font-heading-semibold text-primary">
              {course.instructor.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-body text-text-secondary">
            {course.instructor}
          </span>
        </div>

        {/* Course Description */}
        <p className="text-sm font-body text-text-secondary mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4">
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              {renderStars(course.rating)}
            </div>
            <span className="text-sm font-data text-text-secondary ml-1">
              {course.rating.toFixed(1)}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Clock" size={14} />
            <span className="text-sm font-data">
              {formatDuration(course.duration)}
            </span>
          </div>
        </div>

        {/* Course Metrics */}
        <div className="flex items-center justify-between text-sm font-body text-text-secondary mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{course.enrollmentCount.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={14} />
            <span>{course.lessonCount} lessons</span>
          </div>
        </div>

        {/* Progress Bar for Enrolled Courses */}
        {isEnrolled && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-body text-text-secondary">Progress</span>
              <span className="text-sm font-data text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {isEnrolled ? (
            <Link to={`/course-player/${course.id}`} className="flex-1">
              <Button variant="primary" size="sm" fullWidth iconName="Play" iconPosition="left">
                Continue Learning
              </Button>
            </Link>
          ) : (
            <Link to={`/course-catalog/${course.id}`} className="flex-1">
              <Button variant="outline" size="sm" fullWidth>
                View Details
              </Button>
            </Link>
          )}
          
          <Button variant="ghost" size="sm" className="p-2">
            <Icon name="Bookmark" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;