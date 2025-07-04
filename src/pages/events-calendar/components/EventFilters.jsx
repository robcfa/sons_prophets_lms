import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventFilters = ({ 
  selectedType, 
  onTypeChange, 
  selectedInstructor, 
  onInstructorChange,
  instructors,
  eventCounts 
}) => {
  const eventTypes = [
    { value: 'all', label: 'All Events', icon: 'Calendar', count: eventCounts.all },
    { value: 'lecture', label: 'Lectures', icon: 'BookOpen', count: eventCounts.lecture },
    { value: 'study-group', label: 'Study Groups', icon: 'Users', count: eventCounts.studyGroup },
    { value: 'prayer-meeting', label: 'Prayer Meetings', icon: 'Heart', count: eventCounts.prayerMeeting },
    { value: 'special-service', label: 'Special Services', icon: 'Star', count: eventCounts.specialService },
    { value: 'workshop', label: 'Workshops', icon: 'Wrench', count: eventCounts.workshop },
    { value: 'huddle', label: 'Huddles', icon: 'Mic', count: eventCounts.huddle },
    { value: 'webinar', label: 'Webinars', icon: 'Video', count: eventCounts.webinar }
  ];

  return (
    <div className="bg-surface border-b border-subtle p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Event Type Filters */}
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onTypeChange(type.value)}
              className="flex items-center space-x-2"
            >
              <Icon name={type.icon} size={16} />
              <span>{type.label}</span>
              {type.count > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedType === type.value 
                    ? 'bg-primary-foreground text-primary' 
                    : 'bg-text-muted text-white'
                }`}>
                  {type.count}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Instructor Filter */}
        <div className="flex items-center space-x-3">
          <Icon name="User" size={16} className="text-text-secondary" />
          <select
            value={selectedInstructor}
            onChange={(e) => onInstructorChange(e.target.value)}
            className="px-3 py-2 bg-background border border-subtle rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Instructors</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name} ({instructor.eventCount})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(selectedType !== 'all' || selectedInstructor !== 'all') && (
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Active filters:</span>
          
          {selectedType !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              {eventTypes.find(t => t.value === selectedType)?.label}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTypeChange('all')}
                className="ml-2 p-0 h-4 w-4"
              >
                <Icon name="X" size={12} />
              </Button>
            </span>
          )}
          
          {selectedInstructor !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
              {instructors.find(i => i.id === selectedInstructor)?.name}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onInstructorChange('all')}
                className="ml-2 p-0 h-4 w-4"
              >
                <Icon name="X" size={12} />
              </Button>
            </span>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onTypeChange('all');
              onInstructorChange('all');
            }}
            className="text-text-muted hover:text-text-primary"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventFilters;
