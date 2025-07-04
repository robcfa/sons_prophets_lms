import React from 'react';

import Button from '../../../components/ui/Button';

const CalendarHeader = ({ 
  currentDate, 
  onPreviousMonth, 
  onNextMonth, 
  onTodayClick,
  onViewChange,
  currentView 
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatMonthYear = (date) => {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const views = [
    { value: 'month', label: 'Month', icon: 'Calendar' },
    { value: 'week', label: 'Week', icon: 'CalendarDays' },
    { value: 'list', label: 'List', icon: 'List' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-surface border-b border-subtle">
      {/* Month/Year and Navigation */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPreviousMonth}
            className="p-2"
            iconName="ChevronLeft"
          />
          
          <h2 className="text-xl md:text-2xl font-heading font-heading-semibold text-text-primary min-w-[200px] text-center">
            {formatMonthYear(currentDate)}
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onNextMonth}
            className="p-2"
            iconName="ChevronRight"
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onTodayClick}
          className="hidden sm:flex"
        >
          Today
        </Button>
      </div>

      {/* View Controls */}
      <div className="flex items-center space-x-2">
        {/* Mobile Today Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onTodayClick}
          className="sm:hidden"
        >
          Today
        </Button>

        {/* View Selector */}
        <div className="flex items-center bg-background border border-subtle rounded-lg p-1">
          {views.map((view) => (
            <Button
              key={view.value}
              variant={currentView === view.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => onViewChange(view.value)}
              className="px-3 py-1.5"
              iconName={view.icon}
            >
              <span className="hidden sm:inline ml-2">{view.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;