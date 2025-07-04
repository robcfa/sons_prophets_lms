import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, threadCounts }) => {
  return (
    <div className="bg-card border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <Icon name={category.icon} size={16} />
                <span>{category.name}</span>
                {threadCounts[category.id] > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeCategory === category.id 
                      ? 'bg-primary-foreground text-primary' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {threadCounts[category.id]}
                  </span>
                )}
              </Button>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-text-secondary" />
            <span className="text-sm font-body text-text-secondary">
              {Object.values(threadCounts).reduce((a, b) => a + b, 0)} discussions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;