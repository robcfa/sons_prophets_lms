import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventManagementSection = () => {
  const [viewMode, setViewMode] = useState('upcoming');

  const upcomingEvents = [
    {
      id: 1,
      title: "Bible Study Group - Romans",
      type: "group-session",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      time: "19:00",
      duration: 90,
      attendees: 8,
      maxAttendees: 12,
      location: "Virtual Meeting Room",
      description: "Continuing our study of Romans chapters 5-6, focusing on justification and sanctification.",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Individual Coaching - Sarah Johnson",
      type: "individual",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: "14:30",
      duration: 60,
      attendees: 1,
      maxAttendees: 1,
      location: "Office",
      description: "Follow-up session on Biblical Hermeneutics course progress and discussion of challenging concepts.",
      status: "confirmed"
    },
    {
      id: 3,
      title: "Prophetic Literature Workshop",
      type: "workshop",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      time: "10:00",
      duration: 180,
      attendees: 15,
      maxAttendees: 20,
      location: "Conference Room A",
      description: "Interactive workshop exploring the major and minor prophets, their historical context, and contemporary application.",
      status: "pending"
    },
    {
      id: 4,
      title: "Q&A Session - Old Testament Survey",
      type: "qa-session",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      time: "16:00",
      duration: 45,
      attendees: 6,
      maxAttendees: 15,
      location: "Virtual Meeting Room",
      description: "Open Q&A session for students currently enrolled in the Old Testament Survey course.",
      status: "confirmed"
    }
  ];

  const pastEvents = [
    {
      id: 5,
      title: "Daniel\'s Prophecies Discussion",
      type: "group-session",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      time: "19:00",
      duration: 90,
      attendees: 10,
      maxAttendees: 12,
      location: "Virtual Meeting Room",
      description: "Deep dive into Daniel\'s 70 weeks prophecy and its various interpretations.",
      status: "completed",
      feedback: 4.8,
      notes: "Excellent engagement from participants. Consider follow-up session on apocalyptic literature."
    },
    {
      id: 6,
      title: "Coaching Session - Michael Rodriguez",
      type: "individual",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      time: "15:00",
      duration: 60,
      attendees: 1,
      maxAttendees: 1,
      location: "Office",
      description: "Progress review and goal setting for upcoming course modules.",
      status: "completed",
      feedback: 5.0,
      notes: "Student showing excellent progress. Recommended advanced hermeneutics course."
    }
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeIcon = (type) => {
    const iconMap = {
      'group-session': 'Users',
      'individual': 'User',
      'workshop': 'Presentation',
      'qa-session': 'HelpCircle'
    };
    return iconMap[type] || 'Calendar';
  };

  const getEventTypeColor = (type) => {
    const colorMap = {
      'group-session': 'text-primary',
      'individual': 'text-accent',
      'workshop': 'text-secondary',
      'qa-session': 'text-success'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      confirmed: 'bg-success-50 text-success border-success-200',
      pending: 'bg-warning-50 text-warning border-warning-200',
      completed: 'bg-accent-50 text-accent border-accent-200',
      cancelled: 'bg-error-50 text-error border-error-200'
    };
    return colorMap[status] || 'bg-surface text-text-secondary border-subtle';
  };

  const events = viewMode === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="bg-card rounded-lg border border-subtle">
      <div className="p-6 border-b border-subtle">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-bold text-text-primary">
            Event Management
          </h3>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Icon name="Calendar" size={16} className="mr-2" />
              View Calendar
            </Button>
            <Button variant="primary" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Schedule Event
            </Button>
          </div>
        </div>

        <div className="flex space-x-1 bg-surface rounded-lg p-1">
          <button
            onClick={() => setViewMode('upcoming')}
            className={`flex-1 px-4 py-2 text-sm font-body rounded-md transition-color ${
              viewMode === 'upcoming' ?'bg-primary text-primary-foreground shadow-soft-sm' :'text-text-secondary hover:text-primary'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setViewMode('past')}
            className={`flex-1 px-4 py-2 text-sm font-body rounded-md transition-color ${
              viewMode === 'past' ?'bg-primary text-primary-foreground shadow-soft-sm' :'text-text-secondary hover:text-primary'
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-subtle">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 hover:bg-surface transition-color"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-surface ${getEventTypeColor(event.type)}`}>
                    <Icon name={getEventTypeIcon(event.type)} size={16} />
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-text-primary">
                      {event.title}
                    </h4>
                    <p className="text-sm font-body text-text-secondary mt-1">
                      {event.description}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-caption rounded-full border ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} className="text-text-muted" />
                  <span className="text-sm font-data text-text-secondary">
                    {formatDate(event.date)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-text-muted" />
                  <span className="text-sm font-data text-text-secondary">
                    {formatTime(event.time)} ({event.duration}min)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} className="text-text-muted" />
                  <span className="text-sm font-data text-text-secondary">
                    {event.location}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} className="text-text-muted" />
                  <span className="text-sm font-data text-text-secondary">
                    {event.attendees}/{event.maxAttendees}
                  </span>
                </div>
              </div>

              {event.status === 'completed' && event.feedback && (
                <div className="flex items-center space-x-4 mb-3 p-3 bg-accent-50 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-accent" />
                    <span className="text-sm font-data text-accent-700">
                      {event.feedback}/5.0
                    </span>
                  </div>
                  <p className="text-sm font-body text-accent-700">
                    {event.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {viewMode === 'upcoming' && (
                    <>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Users" size={14} className="mr-1" />
                        Manage Attendees
                      </Button>
                    </>
                  )}
                  {viewMode === 'past' && (
                    <>
                      <Button variant="ghost" size="sm">
                        <Icon name="FileText" size={14} className="mr-1" />
                        View Notes
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Copy" size={14} className="mr-1" />
                        Duplicate
                      </Button>
                    </>
                  )}
                </div>
                
                {viewMode === 'upcoming' && (
                  <div className="flex items-center space-x-2">
                    <Button variant="success" size="sm">
                      <Icon name="Video" size={14} className="mr-1" />
                      Join Meeting
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-subtle bg-surface">
        <div className="flex items-center justify-center">
          <Button variant="ghost" size="sm">
            <Icon name="Calendar" size={16} className="mr-2" />
            View Full Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventManagementSection;