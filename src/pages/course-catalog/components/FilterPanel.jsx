import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onClose, 
  courseStats 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const filterSections = [
    {
      id: 'topic',
      title: 'Topics',
      icon: 'Tag',
      options: [
        { value: 'prophecy', label: 'Prophecy', count: courseStats.topics.prophecy || 0 },
        { value: 'major-prophets', label: 'Major Prophets', count: courseStats.topics.majorProphets || 0 },
        { value: 'minor-prophets', label: 'Minor Prophets', count: courseStats.topics.minorProphets || 0 },
        { value: 'messianic', label: 'Messianic Prophecy', count: courseStats.topics.messianic || 0 },
        { value: 'historical', label: 'Historical Context', count: courseStats.topics.historical || 0 },
        { value: 'interpretation', label: 'Interpretation', count: courseStats.topics.interpretation || 0 }
      ]
    },
    {
      id: 'difficulty',
      title: 'Difficulty Level',
      icon: 'BarChart3',
      options: [
        { value: 'beginner', label: 'Beginner', count: courseStats.difficulty.beginner || 0 },
        { value: 'intermediate', label: 'Intermediate', count: courseStats.difficulty.intermediate || 0 },
        { value: 'advanced', label: 'Advanced', count: courseStats.difficulty.advanced || 0 }
      ]
    },
    {
      id: 'instructor',
      title: 'Instructors',
      icon: 'User',
      options: [
        { value: 'dr-sarah-johnson', label: 'Dr. Sarah Johnson', count: courseStats.instructors.drSarahJohnson || 0 },
        { value: 'prof-michael-chen', label: 'Prof. Michael Chen', count: courseStats.instructors.profMichaelChen || 0 },
        { value: 'dr-david-williams', label: 'Dr. David Williams', count: courseStats.instructors.drDavidWilliams || 0 },
        { value: 'rev-mary-thompson', label: 'Rev. Mary Thompson', count: courseStats.instructors.revMaryThompson || 0 }
      ]
    },
    {
      id: 'duration',
      title: 'Course Duration',
      icon: 'Clock',
      options: [
        { value: 'short', label: 'Short (< 2 hours)', count: courseStats.duration.short || 0 },
        { value: 'medium', label: 'Medium (2-8 hours)', count: courseStats.duration.medium || 0 },
        { value: 'long', label: 'Long (8+ hours)', count: courseStats.duration.long || 0 }
      ]
    }
  ];

  const handleFilterChange = (sectionId, optionValue, checked) => {
    const newFilters = { ...localFilters };
    
    if (!newFilters[sectionId]) {
      newFilters[sectionId] = [];
    }

    if (checked) {
      newFilters[sectionId] = [...newFilters[sectionId], optionValue];
    } else {
      newFilters[sectionId] = newFilters[sectionId].filter(value => value !== optionValue);
    }

    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters).reduce((total, filterArray) => {
      return total + (Array.isArray(filterArray) ? filterArray.length : 0);
    }, 0);
  };

  const FilterSection = ({ section }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const sectionFilters = localFilters[section.id] || [];

    return (
      <div className="border-b border-subtle last:border-b-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 hover:bg-surface transition-color"
        >
          <div className="flex items-center space-x-3">
            <Icon name={section.icon} size={18} className="text-primary" />
            <span className="font-body font-body-semibold text-text-primary">
              {section.title}
            </span>
            {sectionFilters.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-data">
                {sectionFilters.length}
              </span>
            )}
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-text-secondary" 
          />
        </button>

        {isExpanded && (
          <div className="px-4 pb-4 space-y-3">
            {section.options.map((option) => (
              <label
                key={option.value}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <Input
                    type="checkbox"
                    checked={sectionFilters.includes(option.value)}
                    onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-body text-text-primary group-hover:text-primary transition-color">
                    {option.label}
                  </span>
                </div>
                <span className="text-xs font-data text-text-muted">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div className={`
        fixed inset-x-0 bottom-0 md:relative md:inset-auto
        bg-card rounded-t-lg md:rounded-lg shadow-soft-lg border border-subtle
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
        md:w-80 md:h-fit md:sticky md:top-4
        max-h-[80vh] md:max-h-[calc(100vh-6rem)] overflow-hidden flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-subtle bg-surface">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="font-heading font-heading-semibold text-text-primary">
              Filters
            </h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-data">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1 md:hidden"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto">
          {filterSections.map((section) => (
            <FilterSection key={section.id} section={section} />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-subtle bg-surface md:hidden">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApplyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;