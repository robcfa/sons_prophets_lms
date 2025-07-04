import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const CalendarGrid = ({ 
  currentDate, 
  events, 
  onDateSelect, 
  onEventClick, 
  selectedDate,
  eventTypeFilter 
}) => {
  const [hoveredDate, setHoveredDate] = useState(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === dateStr;
    });

    if (eventTypeFilter && eventTypeFilter !== 'all') {
      return dayEvents.filter(event => event.type === eventTypeFilter);
    }
    return dayEvents;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      'lecture': 'bg-primary text-primary-foreground',
      'study-group': 'bg-secondary text-secondary-foreground',
      'prayer-meeting': 'bg-accent text-accent-foreground',
      'special-service': 'bg-warning text-warning-foreground',
      'workshop': 'bg-success text-success-foreground'
    };
    return colors[type] || 'bg-text-muted text-white';
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 md:h-32 border border-subtle bg-surface"></div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = date < today && !isToday;

      days.push(
        <div
          key={day}
          className={`h-24 md:h-32 border border-subtle cursor-pointer transition-color relative overflow-hidden ${
            isToday 
              ? 'bg-primary-50 border-primary' 
              : isSelected 
                ? 'bg-accent-50 border-accent' 
                : isPast 
                  ? 'bg-surface opacity-75' :'bg-background hover:bg-surface'
          }`}
          onClick={() => onDateSelect(date)}
          onMouseEnter={() => setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {/* Date Number */}
          <div className="p-1 md:p-2">
            <span className={`text-sm md:text-base font-body font-body-semibold ${
              isToday 
                ? 'text-primary' 
                : isSelected 
                  ? 'text-accent' 
                  : isPast 
                    ? 'text-text-muted' :'text-text-primary'
            }`}>
              {day}
            </span>
          </div>

          {/* Events */}
          <div className="px-1 md:px-2 space-y-1">
            {dayEvents.slice(0, 3).map((event, index) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded truncate cursor-pointer transition-all hover:scale-105 ${getEventTypeColor(event.type)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
                title={event.title}
              >
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={10} />
                  <span className="truncate">{event.title}</span>
                </div>
              </div>
            ))}
            
            {dayEvents.length > 3 && (
              <div className="text-xs text-text-secondary px-2 py-1 bg-text-muted bg-opacity-20 rounded">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>

          {/* Hover Tooltip */}
          {hoveredDate && hoveredDate.getDate() === day && dayEvents.length > 0 && (
            <div className="absolute top-full left-0 z-50 bg-card border border-subtle rounded-lg shadow-soft-lg p-3 min-w-48 max-w-64">
              <div className="space-y-2">
                {dayEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex items-start space-x-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getEventTypeColor(event.type).split(' ')[0]}`}></div>
                    <div>
                      <p className="text-sm font-body font-body-semibold text-text-primary">{event.title}</p>
                      <p className="text-xs text-text-secondary">{event.time}</p>
                      <p className="text-xs text-text-muted">{event.attendees} attending</p>
                    </div>
                  </div>
                ))}
                {dayEvents.length > 5 && (
                  <p className="text-xs text-text-secondary">+{dayEvents.length - 5} more events</p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-background rounded-lg border border-subtle overflow-hidden">
      {/* Week Day Headers */}
      <div className="grid grid-cols-7 bg-surface border-b border-subtle">
        {weekDays.map((day) => (
          <div key={day} className="p-3 text-center">
            <span className="text-sm font-body font-body-semibold text-text-secondary">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarGrid;