import PropTypes from 'prop-types';

/**
 * Custom PropTypes for common application patterns
 */

// User profile shape
export const UserProfileShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  full_name: PropTypes.string,
  email: PropTypes.string,
  avatar_url: PropTypes.string,
  role: PropTypes.oneOf(['learner', 'coach', 'admin']),
  created_at: PropTypes.string,
  updated_at: PropTypes.string
});

// Course shape
export const CourseShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  instructor: PropTypes.string,
  thumbnail: PropTypes.string,
  progress: PropTypes.number,
  completedLessons: PropTypes.number,
  totalLessons: PropTypes.number,
  timeRemaining: PropTypes.number,
  totalDuration: PropTypes.number,
  difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']),
  category: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  isEnrolled: PropTypes.bool,
  completedAt: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
});

// Achievement shape
export const AchievementShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['mastery', 'participation', 'streak', 'course_completion', 'community']),
  earnedDate: PropTypes.instanceOf(Date),
  xpReward: PropTypes.number,
  isNew: PropTypes.bool,
  icon: PropTypes.string,
  badgeUrl: PropTypes.string
});

// API response shape
export const ApiResponseShape = PropTypes.shape({
  data: PropTypes.any,
  message: PropTypes.string,
  status: PropTypes.oneOf(['success', 'error', 'warning']),
  code: PropTypes.number
});

// Pagination shape
export const PaginationShape = PropTypes.shape({
  page: PropTypes.number,
  limit: PropTypes.number,
  total: PropTypes.number,
  totalPages: PropTypes.number,
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool
});

// Event shape
export const EventShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  location: PropTypes.string,
  isOnline: PropTypes.bool,
  meetingLink: PropTypes.string,
  instructor: PropTypes.string,
  capacity: PropTypes.number,
  enrolled: PropTypes.number,
  category: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  isEnrolled: PropTypes.bool
});

// Common component props
export const CommonComponentProps = {
  className: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
  'data-testid': PropTypes.string
};

// Loading state props
export const LoadingStateProps = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  retry: PropTypes.func
};

// Form field props
export const FormFieldProps = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string
};

// Button props
export const ButtonProps = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node
};

// Modal props
export const ModalProps = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  closable: PropTypes.bool,
  children: PropTypes.node
};

export default {
  UserProfileShape,
  CourseShape,
  AchievementShape,
  ApiResponseShape,
  PaginationShape,
  EventShape,
  CommonComponentProps,
  LoadingStateProps,
  FormFieldProps,
  ButtonProps,
  ModalProps
};