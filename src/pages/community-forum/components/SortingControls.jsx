import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortingControls = ({ sortBy, onSortChange, searchQuery, onSearchChange }) => {
  const sortOptions = [
    { value: 'recent', label: 'Recent Activity', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'newest', label: 'Newest First', icon: 'Calendar' }
  ];

  return (
    <div className="bg-surface border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 space-y-4 sm:space-y-0">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-background border border-subtle rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-color"
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-body text-text-secondary hidden sm:block">
              Sort by:
            </span>
            <div className="flex items-center space-x-1">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onSortChange(option.value)}
                  className="flex items-center space-x-1"
                >
                  <Icon name={option.icon} size={14} />
                  <span className="hidden sm:inline">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingControls;