import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];
    
    Object.entries(activeFilters).forEach(([category, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        values.forEach(value => {
          chips.push({
            category,
            value,
            label: formatFilterLabel(category, value),
            color: getFilterColor(category)
          });
        });
      }
    });
    
    return chips;
  };

  const formatFilterLabel = (category, value) => {
    const labelMap = {
      topic: {
        'prophecy': 'Prophecy',
        'major-prophets': 'Major Prophets',
        'minor-prophets': 'Minor Prophets',
        'messianic': 'Messianic Prophecy',
        'historical': 'Historical Context',
        'interpretation': 'Interpretation'
      },
      difficulty: {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'advanced': 'Advanced'
      },
      instructor: {
        'dr-sarah-johnson': 'Dr. Sarah Johnson',
        'prof-michael-chen': 'Prof. Michael Chen',
        'dr-david-williams': 'Dr. David Williams',
        'rev-mary-thompson': 'Rev. Mary Thompson'
      },
      duration: {
        'short': 'Short (< 2h)',
        'medium': 'Medium (2-8h)',
        'long': 'Long (8h+)'
      }
    };

    return labelMap[category]?.[value] || value;
  };

  const getFilterColor = (category) => {
    const colorMap = {
      topic: 'bg-primary-100 text-primary-700 border-primary-200',
      difficulty: 'bg-accent-100 text-accent-700 border-accent-200',
      instructor: 'bg-secondary-100 text-secondary-700 border-secondary-200',
      duration: 'bg-success-100 text-success-700 border-success-200'
    };

    return colorMap[category] || 'bg-text-muted text-white border-text-muted';
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {/* Active Filter Chips */}
      {chips.map((chip, index) => (
        <div
          key={`${chip.category}-${chip.value}-${index}`}
          className={`
            inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-body
            border transition-all duration-200 hover:shadow-soft-sm flex-shrink-0
            ${chip.color}
          `}
        >
          <span className="whitespace-nowrap">{chip.label}</span>
          <button
            onClick={() => onRemoveFilter(chip.category, chip.value)}
            className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      ))}

      {/* Clear All Button */}
      {chips.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="flex-shrink-0 text-text-secondary hover:text-error"
          iconName="X"
          iconPosition="left"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterChips;