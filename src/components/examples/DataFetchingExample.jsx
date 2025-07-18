import React from 'react';
import PropTypes from 'prop-types';
import { useApiData } from '../../hooks/useApiData';
import DataFetcher from '../ui/DataFetcher';
import { CourseShape } from '../../utils/propTypes';
import { safeGet } from '../../utils/safeObjectUtils';

/**
 * Example component showing how to use the useApiData hook
 */
const CoursesWithHook = ({ userId }) => {
  const { data: courses, loading, error, refetch } = useApiData('/api/courses', {
    params: { userId },
    dependencies: [userId],
    onSuccess: (data) => {
      console.log('Courses loaded successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to load courses:', error);
    }
  });

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>My Courses</h2>
      <button onClick={refetch}>Refresh</button>
      <div className="courses-grid">
        {courses?.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

/**
 * Example component showing how to use the DataFetcher component
 */
const CoursesWithDataFetcher = ({ userId }) => {
  return (
    <DataFetcher
      url="/api/courses"
      params={{ userId }}
      dependencies={[userId]}
    >
      {({ data: courses, refetch }) => (
        <div>
          <h2>My Courses</h2>
          <button onClick={refetch}>Refresh</button>
          <div className="courses-grid">
            {courses?.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </DataFetcher>
  );
};

/**
 * Example course card component with PropTypes
 */
const CourseCard = ({ course, onEnroll, className }) => {
  const title = safeGet(course, 'title', 'Untitled Course');
  const instructor = safeGet(course, 'instructor', 'Unknown Instructor');
  const progress = safeGet(course, 'progress', 0);
  const thumbnail = safeGet(course, 'thumbnail', '/assets/images/no_image.png');

  return (
    <div className={`course-card ${className || ''}`}>
      <img 
        src={thumbnail} 
        alt={title}
        className="course-thumbnail"
        onError={(e) => {
          e.target.src = '/assets/images/no_image.png';
        }}
      />
      <div className="course-info">
        <h3>{title}</h3>
        <p>Instructor: {instructor}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p>{progress}% Complete</p>
        {onEnroll && (
          <button onClick={() => onEnroll(course.id)}>
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
};

// PropTypes definitions
CoursesWithHook.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

CoursesWithDataFetcher.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

CourseCard.propTypes = {
  course: CourseShape.isRequired,
  onEnroll: PropTypes.func,
  className: PropTypes.string
};

export { CoursesWithHook, CoursesWithDataFetcher, CourseCard };