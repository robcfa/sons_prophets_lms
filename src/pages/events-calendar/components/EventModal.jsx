import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EventModal = ({ event, isOpen, onClose, onRSVP }) => {
  const [rsvpStatus, setRsvpStatus] = useState(event?.userRSVP || 'not-responded');
  const [isRSVPing, setIsRSVPing] = useState(false);

  if (!isOpen || !event) return null;

  const handleRSVP = async (status) => {
    setIsRSVPing(true);
    try {
      await onRSVP(event.id, status);
      setRsvpStatus(status);
    } catch (error) {
      console.error('RSVP failed:', error);
    } finally {
      setIsRSVPing(false);
    }
  };

  const getEventTypeColor = (type) => {
    const colors = {
      'lecture': 'bg-primary text-primary-foreground',
      'study-group': 'bg-secondary text-secondary-foreground',
      'prayer-meeting': 'bg-accent text-accent-foreground',
      'special-service': 'bg-warning text-warning-foreground',
      'workshop': 'bg-success text-success-foreground',
      'huddle': 'bg-primary text-primary-foreground',
      'webinar': 'bg-secondary text-secondary-foreground'
    };
    return colors[type] || 'bg-text-muted text-white';
  };

  const getEventTypeLabel = (type) => {
    const labels = {
      'lecture': 'Lecture',
      'study-group': 'Study Group',
      'prayer-meeting': 'Prayer Meeting',
      'special-service': 'Special Service',
      'workshop': 'Workshop',
      'huddle': 'Huddle',
      'webinar': 'Webinar'
    };
    return labels[type] || 'Event';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const handleAddToCalendar = () => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + (event.duration || 60) * 60000);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `Join me at ${event.title} on ${formatDate(event.date)}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Share cancelled
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} ${shareData.url}`);
    }
  };

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-soft-lg border border-subtle max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-subtle p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-body font-body-semibold ${getEventTypeColor(event.type)}`}>
                {getEventTypeLabel(event.type)}
              </span>
              {event.isRecurring && (
                <span className="px-2 py-1 bg-text-muted bg-opacity-20 text-text-secondary text-xs rounded-full flex items-center">
                  <Icon name="Repeat" size={12} className="mr-1" />
                  Recurring
                </span>
              )}
            </div>
            <h2 className="text-2xl font-heading font-heading-semibold text-text-primary">
              {event.title}
            </h2>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 ml-4"
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Event Image */}
          {event.image && (
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Date & Time */}
              <div className="flex items-start space-x-3">
                <Icon name="Calendar" size={20} className="text-primary mt-1" />
                <div>
                  <p className="font-body font-body-semibold text-text-primary">
                    {formatDate(event.date)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {formatTime(event.time)} - {formatTime(event.endTime)}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={20} className="text-primary mt-1" />
                <div>
                  <p className="font-body font-body-semibold text-text-primary">
                    {event.location}
                  </p>
                  {event.address && (
                    <p className="text-sm text-text-secondary">
                      {event.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Instructor/Speaker */}
              {event.instructor && (
                <div className="flex items-start space-x-3">
                  <Icon name="User" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-body font-body-semibold text-text-primary">
                      {event.instructor.name}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {event.instructor.title}
                    </p>
                  </div>
                </div>
              )}

              {/* Attendees */}
              <div className="flex items-start space-x-3">
                <Icon name="Users" size={20} className="text-primary mt-1" />
                <div>
                  <p className="font-body font-body-semibold text-text-primary">
                    {event.attendees} attending
                  </p>
                  {event.maxAttendees && (
                    <p className="text-sm text-text-secondary">
                      {event.maxAttendees - event.attendees} spots remaining
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* RSVP Section */}
            <div className="space-y-4">
              <div className="bg-surface rounded-lg p-4">
                <h3 className="font-heading font-heading-semibold text-text-primary mb-3">
                  RSVP Status
                </h3>
                
                <div className="space-y-2">
                  <Button
                    variant={rsvpStatus === 'attending' ? 'success' : 'outline'}
                    size="sm"
                    fullWidth
                    onClick={() => handleRSVP('attending')}
                    disabled={isRSVPing}
                    iconName="Check"
                  >
                    {isRSVPing && rsvpStatus !== 'attending' ? 'Updating...' : 'Attending'}
                  </Button>
                  
                  <Button
                    variant={rsvpStatus === 'maybe' ? 'warning' : 'outline'}
                    size="sm"
                    fullWidth
                    onClick={() => handleRSVP('maybe')}
                    disabled={isRSVPing}
                    iconName="HelpCircle"
                  >
                    {isRSVPing && rsvpStatus !== 'maybe' ? 'Updating...' : 'Maybe'}
                  </Button>
                  
                  <Button
                    variant={rsvpStatus === 'not-attending' ? 'danger' : 'outline'}
                    size="sm"
                    fullWidth
                    onClick={() => handleRSVP('not-attending')}
                    disabled={isRSVPing}
                    iconName="X"
                  >
                    {isRSVPing && rsvpStatus !== 'not-attending' ? 'Updating...' : 'Can\'t Attend'}
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={handleAddToCalendar}
                  iconName="Calendar"
                >
                  Add to Calendar
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={handleShare}
                  iconName="Share"
                >
                  Share Event
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-heading font-heading-semibold text-text-primary mb-3">
              About This Event
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-text-secondary font-body leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          {/* Prerequisites */}
          {event.prerequisites && event.prerequisites.length > 0 && (
            <div>
              <h3 className="font-heading font-heading-semibold text-text-primary mb-3">
                Prerequisites
              </h3>
              <ul className="space-y-2">
                {event.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-1" />
                    <span className="text-sm text-text-secondary">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Materials */}
          {event.materials && event.materials.length > 0 && (
            <div>
              <h3 className="font-heading font-heading-semibold text-text-primary mb-3">
                Materials Needed
              </h3>
              <ul className="space-y-2">
                {event.materials.map((material, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Book" size={16} className="text-primary mt-1" />
                    <span className="text-sm text-text-secondary">{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
