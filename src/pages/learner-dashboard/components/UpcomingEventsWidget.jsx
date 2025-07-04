import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingEventsWidget = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Virtual Bible Study: Book of Romans',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      time: '7:00 PM',
      duration: '90 minutes',
      type: 'study_group',
      instructor: 'Pastor David Kim',
      attendees: 15,
      maxAttendees: 20,
      isRegistered: true,
      description: 'Join us for an in-depth study of Romans chapters 1-3, exploring Paul\'s theological foundations.'
    },
    {
      id: 2,
      title: 'Prophetic Literature Workshop',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      time: '2:00 PM',
      duration: '2 hours',
      type: 'workshop',
      instructor: 'Dr. Sarah Martinez',
      attendees: 8,
      maxAttendees: 15,
      isRegistered: false,
      description: 'Learn advanced techniques for interpreting prophetic texts and understanding their historical context.'
    },
    {
      id: 3,
      title: 'Q&A Session: Understanding Ezekiel',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      time: '6:30 PM',
      duration: '60 minutes',
      type: 'qa_session',
      instructor: 'Prof. Michael Thompson',
      attendees: 22,
      maxAttendees: 30,
      isRegistered: true,
      description: 'Bring your questions about Ezekiel\'s visions and prophecies for an interactive discussion.'
    }
  ]);

  const formatDate = (date) => {
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

  const getEventIcon = (type) => {
    const iconMap = {
      study_group: 'Users',
      workshop: 'Wrench',
      qa_session: 'HelpCircle',
      lecture: 'BookOpen'
    };
    return iconMap[type] || 'Calendar';
  };

  const getEventColor = (type) => {
    const colorMap = {
      study_group: 'text-primary',
      workshop: 'text-accent',
      qa_session: 'text-secondary',
      lecture: 'text-success'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  const handleRSVP = (eventId, register) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isRegistered: register,
            attendees: register ? event.attendees + 1 : event.attendees - 1
          }
        : event
    ));
  };

  return (
    <div className="bg-card rounded-xl shadow-soft-md border border-subtle p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
          Upcoming Events
        </h2>
        <Link to="/events-calendar">
          <Button variant="ghost" size="sm">
            <Icon name="Calendar" size={16} className="mr-2" />
            View Calendar
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-surface rounded-lg p-4 hover:shadow-soft-sm transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 p-2 rounded-lg bg-opacity-10 ${
                  event.type === 'study_group' ? 'bg-primary' :
                  event.type === 'workshop' ? 'bg-accent' :
                  event.type === 'qa_session' ? 'bg-secondary' : 'bg-success'
                }`}>
                  <Icon 
                    name={getEventIcon(event.type)} 
                    size={20} 
                    className={getEventColor(event.type)} 
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-body font-body-semibold text-text-primary mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm font-body text-text-secondary mb-2">
                    {event.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs font-caption text-text-muted">
                    <span className="flex items-center">
                      <Icon name="Calendar" size={12} className="mr-1" />
                      {formatDate(event.date)}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Clock" size={12} className="mr-1" />
                      {event.time}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Timer" size={12} className="mr-1" />
                      {event.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              {event.isRegistered ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-caption text-success bg-success-50 px-2 py-1 rounded-full">
                    Registered
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRSVP(event.id, false)}
                    className="text-error hover:bg-error-50"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleRSVP(event.id, true)}
                  disabled={event.attendees >= event.maxAttendees}
                >
                  {event.attendees >= event.maxAttendees ? 'Full' : 'Join'}
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-subtle">
              <div className="flex items-center space-x-4 text-xs font-caption text-text-muted">
                <span>Instructor: {event.instructor}</span>
                <span className="flex items-center">
                  <Icon name="Users" size={12} className="mr-1" />
                  {event.attendees}/{event.maxAttendees} attending
                </span>
              </div>
              
              <div className="w-16 bg-border rounded-full h-1">
                <div 
                  className="bg-primary rounded-full h-1 transition-all duration-300"
                  style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary font-body mb-2">No upcoming events</p>
          <p className="text-sm text-text-muted font-body mb-4">
            Check back later for new study groups and workshops
          </p>
          <Link to="/events-calendar">
            <Button variant="primary">
              Browse Events
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsWidget;