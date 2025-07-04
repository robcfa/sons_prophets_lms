import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MiniCalendar = ({ 
  currentDate, 
  selectedDate, 
  onDateSelect, 
  onMonthChange,
  eventDates 
}) => {
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const hasEvents = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return eventDates.includes(dateStr);
  };

  const renderMiniCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="w-8 h-8"></div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const hasEventsOnDate = hasEvents(date);
      const isPast = date < today && !isToday;

      days.push(
        <button
          key={day}
          onClick={() => onDateSelect(date)}
          className={`w-8 h-8 text-sm font-body rounded-full transition-all relative ${
            isToday
              ? 'bg-primary text-primary-foreground font-body-semibold'
              : isSelected
                ? 'bg-accent text-accent-foreground font-body-semibold'
                : isPast
                  ? 'text-text-muted hover:bg-surface' :'text-text-primary hover:bg-surface'
          }`}
        >
          {day}
          {hasEventsOnDate && (
            <div className={`absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
              isToday || isSelected ? 'bg-current' : 'bg-primary'
            }`}></div>
          )}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  return (
    <div className="bg-background rounded-lg border border-subtle p-4">
      {/* Mini Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePreviousMonth}
          className="p-1"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
        
        <h3 className="text-sm font-body font-body-semibold text-text-primary">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
          className="p-1"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>

      {/* Week Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="w-8 h-6 flex items-center justify-center">
            <span className="text-xs font-body text-text-secondary">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderMiniCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-subtle">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Has events</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;