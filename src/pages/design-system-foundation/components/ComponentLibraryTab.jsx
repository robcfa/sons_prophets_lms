import React, { useState } from 'react';
import { Package, Code, Eye, Play } from 'lucide-react';

const ComponentLibraryTab = () => {
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [componentVariant, setComponentVariant] = useState('primary');

  const components = [
    {
      id: 'button',
      name: 'Button',
      description: 'Interactive button component with multiple variants',
      variants: ['primary', 'secondary', 'outline', 'ghost'],
      tokens: ['--color-primary', '--spacing-3', '--radius-md', '--elevation-1']
    },
    {
      id: 'card',
      name: 'Card',
      description: 'Container component for content grouping',
      variants: ['default', 'elevated', 'outlined', 'ghost'],
      tokens: ['--color-surface-elevated', '--spacing-6', '--radius-lg', '--elevation-2']
    },
    {
      id: 'input',
      name: 'Input',
      description: 'Form input component with validation states',
      variants: ['default', 'error', 'success', 'disabled'],
      tokens: ['--color-border', '--spacing-3', '--radius-md', '--color-text-primary']
    },
    {
      id: 'badge',
      name: 'Badge',
      description: 'Small status indicator component',
      variants: ['primary', 'secondary', 'success', 'warning', 'error'],
      tokens: ['--color-primary', '--spacing-1', '--radius-full', '--text-xs']
    }
  ];

  const componentExamples = {
    button: {
      primary: (
        <button className="btn btn-primary">
          Primary Button
        </button>
      ),
      secondary: (
        <button className="btn btn-secondary">
          Secondary Button
        </button>
      ),
      outline: (
        <button className="btn border border-primary text-primary bg-transparent hover:bg-primary hover:text-white">
          Outline Button
        </button>
      ),
      ghost: (
        <button className="btn bg-transparent text-primary hover:bg-primary hover:text-white">
          Ghost Button
        </button>
      )
    },
    card: {
      default: (
        <div className="card">
          <h3 className="font-heading font-semibold text-primary mb-2">Card Title</h3>
          <p className="text-secondary">This is a default card component with standard styling.</p>
        </div>
      ),
      elevated: (
        <div className="card shadow-lg">
          <h3 className="font-heading font-semibold text-primary mb-2">Elevated Card</h3>
          <p className="text-secondary">This card has elevated shadow for emphasis.</p>
        </div>
      ),
      outlined: (
        <div className="card border-2 border-primary">
          <h3 className="font-heading font-semibold text-primary mb-2">Outlined Card</h3>
          <p className="text-secondary">This card has a prominent border.</p>
        </div>
      ),
      ghost: (
        <div className="p-6 border border-border rounded-lg bg-transparent">
          <h3 className="font-heading font-semibold text-primary mb-2">Ghost Card</h3>
          <p className="text-secondary">This card has minimal styling.</p>
        </div>
      )
    },
    input: {
      default: (
        <input
          type="text"
          placeholder="Enter text here..."
          className="input"
        />
      ),
      error: (
        <input
          type="text"
          placeholder="Error state..."
          className="input border-error focus:border-error"
        />
      ),
      success: (
        <input
          type="text"
          placeholder="Success state..."
          className="input border-success focus:border-success"
        />
      ),
      disabled: (
        <input
          type="text"
          placeholder="Disabled state..."
          className="input opacity-50 cursor-not-allowed"
          disabled
        />
      )
    },
    badge: {
      primary: (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">
          Primary
        </span>
      ),
      secondary: (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-white">
          Secondary
        </span>
      ),
      success: (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success text-white">
          Success
        </span>
      ),
      warning: (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning text-white">
          Warning
        </span>
      ),
      error: (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error text-white">
          Error
        </span>
      )
    }
  };

  const generateComponentCode = (component, variant) => {
    const codeExamples = {
      button: {
        primary: `<button className="btn btn-primary">
  Primary Button
</button>`,
        secondary: `<button className="btn btn-secondary">
  Secondary Button
</button>`,
        outline: `<button className="btn border border-primary text-primary bg-transparent hover:bg-primary hover:text-white">
  Outline Button
</button>`,
        ghost: `<button className="btn bg-transparent text-primary hover:bg-primary hover:text-white">
  Ghost Button
</button>`
      },
      card: {
        default: `<div className="card">
  <h3 className="font-heading font-semibold text-primary mb-2">Card Title</h3>
  <p className="text-secondary">Card content goes here.</p>
</div>`,
        elevated: `<div className="card shadow-lg">
  <h3 className="font-heading font-semibold text-primary mb-2">Elevated Card</h3>
  <p className="text-secondary">Card content goes here.</p>
</div>`,
        outlined: `<div className="card border-2 border-primary">
  <h3 className="font-heading font-semibold text-primary mb-2">Outlined Card</h3>
  <p className="text-secondary">Card content goes here.</p>
</div>`,
        ghost: `<div className="p-6 border border-border rounded-lg bg-transparent">
  <h3 className="font-heading font-semibold text-primary mb-2">Ghost Card</h3>
  <p className="text-secondary">Card content goes here.</p>
</div>`
      }
    };

    return codeExamples[component]?.[variant] || `// Code example for ${component} ${variant}`;
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-2">Component Library</h2>
        <p className="text-secondary">
          Coherent component system with token-first approach. Preview components and copy implementation code.
        </p>
      </div>

      {/* Component Selection */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Component Selection</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {components.map((component) => (
            <button
              key={component.id}
              onClick={() => setSelectedComponent(component.id)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                selectedComponent === component.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary'
              }`}
            >
              <h4 className="font-heading font-semibold text-primary mb-1">{component.name}</h4>
              <p className="text-sm text-secondary">{component.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-muted">{component.variants.length} variants</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Component Preview */}
      {selectedComponent && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-heading font-semibold text-primary">Component Preview</h3>
          </div>
          
          <div className="space-y-6">
            {/* Variant Selection */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Select Variant
              </label>
              <div className="flex gap-2 flex-wrap">
                {components.find(c => c.id === selectedComponent)?.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setComponentVariant(variant)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      componentVariant === variant
                        ? 'bg-primary text-white' :'bg-surface-elevated text-secondary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Live Preview
              </label>
              <div className="p-6 bg-surface rounded-lg border border-border">
                {componentExamples[selectedComponent]?.[componentVariant]}
              </div>
            </div>

            {/* Component Code */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-secondary" />
                <label className="text-sm font-medium text-secondary">Implementation Code</label>
              </div>
              <div className="relative">
                <pre className="bg-surface-elevated p-4 rounded-lg text-sm font-data text-primary border border-border overflow-x-auto">
                  <code>{generateComponentCode(selectedComponent, componentVariant)}</code>
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(generateComponentCode(selectedComponent, componentVariant))}
                  className="absolute top-2 right-2 p-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
                  title="Copy code"
                >
                  <Code className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Token Usage */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Design Tokens Used
              </label>
              <div className="flex gap-2 flex-wrap">
                {components.find(c => c.id === selectedComponent)?.tokens.map((token) => (
                  <span
                    key={token}
                    className="px-2 py-1 bg-surface-elevated text-xs font-data text-secondary rounded border border-border"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integration Guide */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Play className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary mb-2">Token-First Integration</h3>
            <p className="text-secondary mb-3">
              All components are built using design tokens, ensuring consistent theming across light, dark, and reverent modes. 
              When tokens are updated, components automatically reflect the changes.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-secondary">Components automatically adapt to theme changes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-secondary">Token updates propagate to all instances</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-secondary">Accessibility features built-in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibraryTab;