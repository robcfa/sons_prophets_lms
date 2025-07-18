import React, { useState } from 'react';

import { useTheme } from '../../../lib/theme-context';

const ComponentVariantsTab = () => {
  const { theme, setTheme } = useTheme();
  const [selectedComponent, setSelectedComponent] = useState('buttons');

  const components = [
    { id: 'buttons', name: 'Buttons', icon: '🔘' },
    { id: 'cards', name: 'Cards', icon: '🃏' },
    { id: 'forms', name: 'Forms', icon: '📝' },
    { id: 'navigation', name: 'Navigation', icon: '🧭' },
  ];

  const ButtonVariants = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-3">
          Button States
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
              Primary Buttons
            </h5>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-card transition-colors">
                Default
              </button>
              <button className="px-4 py-2 bg-primary-dark text-white rounded-card">
                Hover
              </button>
              <button className="px-4 py-2 bg-primary opacity-50 text-white rounded-card cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
              Secondary Buttons
            </h5>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface rounded-card hover:bg-primary hover:text-white transition-colors">
                Default
              </button>
              <button className="px-4 py-2 bg-primary text-white border border-primary rounded-card">
                Hover
              </button>
              <button className="px-4 py-2 bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface rounded-card opacity-50 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 reverent:bg-amber-50 p-4 rounded-card">
        <h5 className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-2">
          CSS Classes Used
        </h5>
        <div className="space-y-1 text-xs font-mono text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
          <div>Primary: bg-primary hover:bg-primary-dark text-white rounded-card</div>
          <div>Secondary: bg-surface border border-divider hover:bg-primary hover:text-white</div>
        </div>
      </div>
    </div>
  );

  const CardVariants = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-3">
          Card Styles
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4 shadow-1">
            <h5 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-2">
              Standard Card
            </h5>
            <p className="text-sm text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
              Basic card with border and subtle shadow
            </p>
          </div>
          
          <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4 shadow-2 hover:shadow-1 transition-shadow">
            <h5 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-2">
              Elevated Card
            </h5>
            <p className="text-sm text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
              Enhanced shadow for prominence
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 reverent:bg-amber-50 p-4 rounded-card">
        <h5 className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-2">
          CSS Classes Used
        </h5>
        <div className="space-y-1 text-xs font-mono text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
          <div>Standard: bg-surface border border-divider rounded-card shadow-1</div>
          <div>Elevated: bg-surface border border-divider rounded-card shadow-2</div>
        </div>
      </div>
    </div>
  );

  const FormVariants = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-3">
          Form Elements
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-2">
              Text Input
            </label>
            <input 
              type="text" 
              placeholder="Enter text..."
              className="w-full px-3 py-2 bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-2">
              Select Dropdown
            </label>
            <select className="w-full px-3 py-2 bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary border-divider dark:border-divider-dark reverent:border-rev-border rounded focus:ring-primary"
              />
              <span className="text-sm text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
                Checkbox option
              </span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 reverent:bg-amber-50 p-4 rounded-card">
        <h5 className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-2">
          CSS Classes Used
        </h5>
        <div className="space-y-1 text-xs font-mono text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
          <div>Input: bg-surface border border-divider rounded-card focus:ring-primary</div>
          <div>Label: text-on-surface font-medium</div>
        </div>
      </div>
    </div>
  );

  const NavigationVariants = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-3">
          Navigation Elements
        </h4>
        <div className="space-y-4">
          <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4">
            <h5 className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-3">
              Tab Navigation
            </h5>
            <div className="flex border-b border-divider dark:border-divider-dark reverent:border-rev-border">
              <button className="px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary">
                Active Tab
              </button>
              <button className="px-4 py-2 text-sm font-medium text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted hover:text-primary">
                Inactive Tab
              </button>
              <button className="px-4 py-2 text-sm font-medium text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted hover:text-primary">
                Another Tab
              </button>
            </div>
          </div>
          
          <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4">
            <h5 className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-3">
              Breadcrumb Navigation
            </h5>
            <nav className="flex items-center space-x-2 text-sm">
              <a href="#" className="text-primary hover:text-primary-dark">Home</a>
              <span className="text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">/</span>
              <a href="#" className="text-primary hover:text-primary-dark">Design System</a>
              <span className="text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">/</span>
              <span className="text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">Tokens</span>
            </nav>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 reverent:bg-amber-50 p-4 rounded-card">
        <h5 className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-2">
          CSS Classes Used
        </h5>
        <div className="space-y-1 text-xs font-mono text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
          <div>Active Tab: text-primary border-b-2 border-primary</div>
          <div>Inactive Tab: text-muted hover:text-primary</div>
          <div>Breadcrumb: text-primary hover:text-primary-dark</div>
        </div>
      </div>
    </div>
  );

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'buttons':
        return <ButtonVariants />;
      case 'cards':
        return <CardVariants />;
      case 'forms':
        return <FormVariants />;
      case 'navigation':
        return <NavigationVariants />;
      default:
        return <ButtonVariants />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Switch Demo */}
      <div className="bg-blue-50 dark:bg-blue-900/20 reverent:bg-amber-50 border border-blue-200 dark:border-blue-800 reverent:border-amber-200 rounded-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100 reverent:text-amber-900">
              Interactive Theme Testing
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 reverent:text-amber-700 mt-1">
              Switch themes to see how components adapt automatically
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTheme('light')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                theme === 'light' ?'bg-primary text-white' :'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                theme === 'dark' ?'bg-primary text-white' :'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme('reverent')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                theme === 'reverent' ?'bg-primary text-white' :'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Reverent
            </button>
          </div>
        </div>
      </div>

      {/* Component Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {components.map((component) => (
          <button
            key={component.id}
            onClick={() => setSelectedComponent(component.id)}
            className={`flex items-center px-4 py-2 rounded-card text-sm font-medium transition-colors ${
              selectedComponent === component.id
                ? 'bg-primary text-white' :'bg-surface dark:bg-surface-dark reverent:bg-rev-surface text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface border border-divider dark:border-divider-dark reverent:border-rev-border hover:bg-primary hover:text-white'
            }`}
          >
            <span className="mr-2">{component.icon}</span>
            {component.name}
          </button>
        ))}
      </div>

      {/* Component Variants */}
      <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-6">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ComponentVariantsTab;