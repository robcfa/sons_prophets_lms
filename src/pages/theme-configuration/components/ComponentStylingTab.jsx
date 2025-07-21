import React, { useState } from 'react';
import { Square, Edit3, Menu, ArrowRight } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const ComponentStylingTab = ({ currentTheme, customComponents, onComponentChange }) => {
  const [selectedComponent, setSelectedComponent] = useState('buttons');
  const [activeVariant, setActiveVariant] = useState('primary');

  const componentCategories = [
    { id: 'buttons', name: 'Buttons', icon: Square },
    { id: 'cards', name: 'Cards', icon: Square },
    { id: 'forms', name: 'Forms', icon: Edit3 },
    { id: 'navigation', name: 'Navigation', icon: Menu }
  ];

  const buttonVariants = [
    { id: 'primary', name: 'Primary', description: 'Main call-to-action buttons' },
    { id: 'secondary', name: 'Secondary', description: 'Secondary action buttons' },
    { id: 'outline', name: 'Outline', description: 'Outlined buttons' },
    { id: 'ghost', name: 'Ghost', description: 'Minimal buttons' },
    { id: 'destructive', name: 'Destructive', description: 'Delete/remove buttons' }
  ];

  const cardVariants = [
    { id: 'default', name: 'Default', description: 'Standard card layout' },
    { id: 'elevated', name: 'Elevated', description: 'Cards with shadow' },
    { id: 'outlined', name: 'Outlined', description: 'Cards with border' },
    { id: 'filled', name: 'Filled', description: 'Cards with background' }
  ];

  const formVariants = [
    { id: 'input', name: 'Input Fields', description: 'Text inputs and textareas' },
    { id: 'select', name: 'Select Dropdowns', description: 'Dropdown selectors' },
    { id: 'checkbox', name: 'Checkboxes', description: 'Checkbox inputs' },
    { id: 'radio', name: 'Radio Buttons', description: 'Radio button inputs' }
  ];

  const navigationVariants = [
    { id: 'sidebar', name: 'Sidebar', description: 'Side navigation panel' },
    { id: 'header', name: 'Header', description: 'Top navigation bar' },
    { id: 'breadcrumb', name: 'Breadcrumb', description: 'Navigation breadcrumbs' },
    { id: 'pagination', name: 'Pagination', description: 'Page navigation' }
  ];

  const getVariants = (componentId) => {
    switch (componentId) {
      case 'buttons': return buttonVariants;
      case 'cards': return cardVariants;
      case 'forms': return formVariants;
      case 'navigation': return navigationVariants;
      default: return [];
    }
  };

  const handleStyleChange = (componentId, variantId, property, value) => {
    const newComponents = { ...customComponents };
    if (!newComponents[componentId]) newComponents[componentId] = {};
    if (!newComponents[componentId][variantId]) newComponents[componentId][variantId] = {};
    newComponents[componentId][variantId][property] = value;
    onComponentChange(newComponents);
  };

  const getStyleValue = (componentId, variantId, property, defaultValue = '') => {
    return customComponents[componentId]?.[variantId]?.[property] || defaultValue;
  };

  const renderButtonStyles = () => (
    <div className="space-y-6">
      {buttonVariants.map((variant) => (
        <div key={variant.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-text-primary">{variant.name}</h5>
              <p className="text-sm text-text-secondary">{variant.description}</p>
            </div>
            <div className="flex space-x-2">
              <button className={`btn btn-${variant.id} px-4 py-2 rounded-md text-sm`}>
                {variant.name}
              </button>
              <button className={`btn btn-${variant.id} px-4 py-2 rounded-md text-sm`} disabled>
                Disabled
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Border Radius
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.125"
                value={getStyleValue('buttons', variant.id, 'borderRadius', '0.5')}
                onChange={(e) => handleStyleChange('buttons', variant.id, 'borderRadius', e.target.value)}
                className="w-full"
              />
              <span className="text-xs text-text-secondary">
                {getStyleValue('buttons', variant.id, 'borderRadius', '0.5')}rem
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Padding
              </label>
              <select
                value={getStyleValue('buttons', variant.id, 'padding', 'medium')}
                onChange={(e) => handleStyleChange('buttons', variant.id, 'padding', e.target.value)}
                className="w-full px-2 py-1 border border-border rounded bg-input text-text-primary text-sm"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCardStyles = () => (
    <div className="space-y-6">
      {cardVariants.map((variant) => (
        <div key={variant.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-text-primary">{variant.name}</h5>
              <p className="text-sm text-text-secondary">{variant.description}</p>
            </div>
            <div className={`card card-${variant.id} p-4 w-48 bg-card border`}>
              <div className="font-medium text-text-primary mb-2">Card Title</div>
              <div className="text-sm text-text-secondary">Card content goes here</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Border Radius
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.125"
                value={getStyleValue('cards', variant.id, 'borderRadius', '0.5')}
                onChange={(e) => handleStyleChange('cards', variant.id, 'borderRadius', e.target.value)}
                className="w-full"
              />
              <span className="text-xs text-text-secondary">
                {getStyleValue('cards', variant.id, 'borderRadius', '0.5')}rem
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Padding
              </label>
              <select
                value={getStyleValue('cards', variant.id, 'padding', 'medium')}
                onChange={(e) => handleStyleChange('cards', variant.id, 'padding', e.target.value)}
                className="w-full px-2 py-1 border border-border rounded bg-input text-text-primary text-sm"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Shadow
              </label>
              <select
                value={getStyleValue('cards', variant.id, 'shadow', 'medium')}
                onChange={(e) => handleStyleChange('cards', variant.id, 'shadow', e.target.value)}
                className="w-full px-2 py-1 border border-border rounded bg-input text-text-primary text-sm"
              >
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFormStyles = () => (
    <div className="space-y-6">
      {formVariants.map((variant) => (
        <div key={variant.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-text-primary">{variant.name}</h5>
              <p className="text-sm text-text-secondary">{variant.description}</p>
            </div>
            <div className="w-48">
              {variant.id === 'input' && (
                <input
                  type="text"
                  placeholder="Sample input"
                  className="w-full px-3 py-2 border border-border rounded bg-input text-text-primary"
                />
              )}
              {variant.id === 'select' && (
                <select className="w-full px-3 py-2 border border-border rounded bg-input text-text-primary">
                  <option>Sample option</option>
                </select>
              )}
              {variant.id === 'checkbox' && (
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-primary border-border rounded" />
                  <span className="text-sm">Sample checkbox</span>
                </label>
              )}
              {variant.id === 'radio' && (
                <label className="flex items-center space-x-2">
                  <input type="radio" name="sample" className="w-4 h-4 text-primary border-border" />
                  <span className="text-sm">Sample radio</span>
                </label>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Border Radius
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.125"
                value={getStyleValue('forms', variant.id, 'borderRadius', '0.375')}
                onChange={(e) => handleStyleChange('forms', variant.id, 'borderRadius', e.target.value)}
                className="w-full"
              />
              <span className="text-xs text-text-secondary">
                {getStyleValue('forms', variant.id, 'borderRadius', '0.375')}rem
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Border Width
              </label>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={getStyleValue('forms', variant.id, 'borderWidth', '1')}
                onChange={(e) => handleStyleChange('forms', variant.id, 'borderWidth', e.target.value)}
                className="w-full"
              />
              <span className="text-xs text-text-secondary">
                {getStyleValue('forms', variant.id, 'borderWidth', '1')}px
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNavigationStyles = () => (
    <div className="space-y-6">
      {navigationVariants.map((variant) => (
        <div key={variant.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-text-primary">{variant.name}</h5>
              <p className="text-sm text-text-secondary">{variant.description}</p>
            </div>
            <div className="w-48">
              {variant.id === 'sidebar' && (
                <div className="bg-surface border border-border rounded p-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-primary rounded"></div>
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <div className="w-3 h-3 bg-text-secondary rounded"></div>
                      <span>Settings</span>
                    </div>
                  </div>
                </div>
              )}
              {variant.id === 'header' && (
                <div className="bg-surface border border-border rounded p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Logo</div>
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 bg-accent rounded"></div>
                      <div className="w-6 h-6 bg-primary rounded"></div>
                    </div>
                  </div>
                </div>
              )}
              {variant.id === 'breadcrumb' && (
                <div className="flex items-center space-x-1 text-sm">
                  <span>Home</span>
                  <ArrowRight className="w-3 h-3" />
                  <span>Settings</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="text-primary">Theme</span>
                </div>
              )}
              {variant.id === 'pagination' && (
                <div className="flex items-center space-x-1">
                  <button className="w-8 h-8 border border-border rounded text-sm">1</button>
                  <button className="w-8 h-8 bg-primary text-white rounded text-sm">2</button>
                  <button className="w-8 h-8 border border-border rounded text-sm">3</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Spacing
              </label>
              <select
                value={getStyleValue('navigation', variant.id, 'spacing', 'medium')}
                onChange={(e) => handleStyleChange('navigation', variant.id, 'spacing', e.target.value)}
                className="w-full px-2 py-1 border border-border rounded bg-input text-text-primary text-sm"
              >
                <option value="compact">Compact</option>
                <option value="medium">Medium</option>
                <option value="relaxed">Relaxed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Style
              </label>
              <select
                value={getStyleValue('navigation', variant.id, 'style', 'default')}
                onChange={(e) => handleStyleChange('navigation', variant.id, 'style', e.target.value)}
                className="w-full px-2 py-1 border border-border rounded bg-input text-text-primary text-sm"
              >
                <option value="default">Default</option>
                <option value="minimal">Minimal</option>
                <option value="bordered">Bordered</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderComponentStyles = () => {
    switch (selectedComponent) {
      case 'buttons': return renderButtonStyles();
      case 'cards': return renderCardStyles();
      case 'forms': return renderFormStyles();
      case 'navigation': return renderNavigationStyles();
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Component Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {componentCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedComponent(category.id)}
              className={`p-3 text-left rounded-lg border transition-all ${
                selectedComponent === category.id
                  ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface hover:border-accent'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{category.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Component Styles */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h4 className="text-lg font-medium text-text-primary mb-6">
          {componentCategories.find(c => c.id === selectedComponent)?.name} Styling
        </h4>
        
        {renderComponentStyles()}
      </div>

      {/* Global Component Settings */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h4 className="text-lg font-medium text-text-primary mb-4">
          Global Settings
        </h4>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Animation Duration
            </label>
            <select
              value={getStyleValue('global', 'animation', 'duration', '200')}
              onChange={(e) => handleStyleChange('global', 'animation', 'duration', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded bg-input text-text-primary"
            >
              <option value="100">Fast (100ms)</option>
              <option value="200">Normal (200ms)</option>
              <option value="300">Slow (300ms)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Focus Ring Width
            </label>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={getStyleValue('global', 'focus', 'ringWidth', '2')}
              onChange={(e) => handleStyleChange('global', 'focus', 'ringWidth', e.target.value)}
              className="w-full"
            />
            <span className="text-xs text-text-secondary">
              {getStyleValue('global', 'focus', 'ringWidth', '2')}px
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentStylingTab;