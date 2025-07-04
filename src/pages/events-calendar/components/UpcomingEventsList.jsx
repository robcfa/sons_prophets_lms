import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const UpcomingEventsList = ({ events, onEventClick, onQuickRSVP }) => {
  const getEventTypeColor = (type) => {
    const colors = {
      'lecture': 'border-primary bg-primary-50',
      'study-group': 'border-secondary bg-secondary-50',
      'prayer-meeting': 'border-accent bg-accent-50',
      'special-service': 'border-warning bg-warning-50',
      'workshop': 'border-success bg-success-50'
    };
    return colors[type] || 'border-text-muted bg-surface';
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      'lecture': 'BookOpen',
      'study-group': 'Users',
      'prayer-meeting': 'Heart',
      'special-service': 'Star',
      'workshop': 'Wrench'
    };
    return icons[type] || 'Calendar';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeUntilEvent = (dateStr, timeStr) => {
    const eventDate = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    const diff = eventDate - now;
    
    if (diff < 0) return 'Past event';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `in ${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `in ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  };

  if (events.length === 0) {
    return (
      <div className="bg-background rounded-lg border border-subtle p-8 text-center">
        <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
        <h3 className="font-heading font-heading-semibold text-text-primary mb-2">
          No Upcoming Events
        </h3>
        <p className="text-text-secondary font-body">
          Check back later for new events and activities.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-heading-semibold text-text-primary">
          Upcoming Events
        </h3>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className={`border-l-4 rounded-lg p-4 cursor-pointer transition-all hover:shadow-soft-md ${getEventTypeColor(event.type)}`}
            onClick={() => onEventClick(event)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon 
                    name={getEventTypeIcon(event.type)} 
                    size={16} 
                    className="text-text-secondary" 
                  />
                  <span className="text-sm font-body text-text-secondary capitalize">
                    {event.type.replace('-', ' ')}
                  </span>
                  <span className="text-sm text-text-muted">•</span>
                  <span className="text-sm text-text-muted">
                    {getTimeUntilEvent(event.date, event.time)}
                  </span>
                </div>

                <h4 className="font-body font-body-semibold text-text-primary mb-2 line-clamp-2">
                  {event.title}
                </h4>

                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{formatTime(event.time)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span className="truncate max-w-[100px]">{event.location}</span>
                  </div>
                </div>

                {event.instructor && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-body font-body-semibold text-primary">
                        {event.instructor.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-text-secondary">
                      {event.instructor.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end space-y-2 ml-4">
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm text-text-secondary">
                    <Icon name="Users" size={14} />
                    <span>{event.attendees}</span>
                  </div>
                  {event.userRSVP && (
                    <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                      event.userRSVP === 'attending' ?'bg-success-100 text-success-700' 
                        : event.userRSVP === 'maybe' ?'bg-warning-100 text-warning-700' :'bg-error-100 text-error-700'
                    }`}>
                      {event.userRSVP === 'attending' ? 'Going' : 
                       event.userRSVP === 'maybe' ? 'Maybe' : 'Not Going'}
                    </span>
                  )}
                </div>

                {!event.userRSVP && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickRSVP(event.id, 'attending');
                    }}
                    className="text-xs px-3 py-1"
                  >
                    RSVP
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEventsList;