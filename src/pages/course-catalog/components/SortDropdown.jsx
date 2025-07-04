import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'newest', label: 'Newest First', icon: 'Calendar' },
    { value: 'oldest', label: 'Oldest First', icon: 'CalendarDays' },
    { value: 'alphabetical', label: 'A to Z', icon: 'ArrowUpAZ' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'duration-short', label: 'Shortest Duration', icon: 'Clock' },
    { value: 'duration-long', label: 'Longest Duration', icon: 'Clock' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.label : 'Sort by';
  };

  const getCurrentSortIcon = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.icon : 'ArrowUpDown';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sort Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[140px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <Icon name={getCurrentSortIcon()} size={16} />
          <span className="hidden sm:inline">{getCurrentSortLabel()}</span>
          <span className="sm:hidden">Sort</span>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="ml-2" 
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-soft-lg border border-subtle z-50">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-caption text-text-muted border-b border-subtle mb-2">
              Sort Options
            </div>
            
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-color text-left
                  ${currentSort === option.value 
                    ? 'bg-primary-50 text-primary' :'hover:bg-surface text-text-primary'
                  }
                `}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={currentSort === option.value ? 'text-primary' : 'text-text-secondary'} 
                />
                <span className="text-sm font-body flex-1">
                  {option.label}
                </span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;