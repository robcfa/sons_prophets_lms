import React, { useState } from 'react';
import { Ruler, Grid, Copy, Check } from 'lucide-react';

const SpacingLayoutTab = () => {
  const [copiedToken, setCopiedToken] = useState(null);
  const [showGrid, setShowGrid] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const spacingTokens = [
    { name: 'XS', var: '--spacing-4', value: '4px', rem: '0.25rem', usage: 'Tight spacing, form elements' },
    { name: 'SM', var: '--spacing-8', value: '8px', rem: '0.5rem', usage: 'Base spacing unit' },
    { name: 'MD', var: '--spacing-16', value: '16px', rem: '1rem', usage: 'Standard spacing' },
    { name: 'LG', var: '--spacing-24', value: '24px', rem: '1.5rem', usage: 'Section spacing' },
    { name: 'XL', var: '--spacing-32', value: '32px', rem: '2rem', usage: 'Layout spacing' },
  ];

  const borderRadiusTokens = [
    { name: 'Card', var: '--radius-card', value: '8px', usage: 'Standard card radius' },
    { name: 'Small', var: '--radius-sm', value: '4px', usage: 'Small elements' },
    { name: 'Medium', var: '--radius-md', value: '8px', usage: 'Medium elements' },
    { name: 'Large', var: '--radius-lg', value: '12px', usage: 'Large containers' },
    { name: 'XL', var: '--radius-xl', value: '16px', usage: 'Extra large elements' },
  ];

  const shadowTokens = [
    { name: 'Level 1', var: '--shadow-1', value: '0 1px 3px rgba(0, 0, 0, 0.1)', usage: 'Subtle elevation' },
    { name: 'Level 2', var: '--shadow-2', value: '0 4px 6px rgba(0, 0, 0, 0.1)', usage: 'Standard elevation' },
  ];

  const SpacingCard = ({ token }) => (
    <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
          {token.name}
        </h4>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
            {token.value} / {token.rem}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <div 
            className="bg-primary h-4 rounded-sm"
            style={{ width: token.value }}
          />
        </div>
        <div className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
          {token.value}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <code className="text-xs font-mono text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {token.var}
        </code>
        <button
          onClick={() => copyToClipboard(token.var)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          {copiedToken === token.var ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <Copy className="w-3 h-3 text-gray-500" />
          )}
        </button>
      </div>
      
      <p className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
        {token.usage}
      </p>
    </div>
  );

  const RadiusCard = ({ token }) => (
    <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
          {token.name}
        </h4>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
            {token.value}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div 
          className="w-16 h-16 bg-primary"
          style={{ borderRadius: token.value }}
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <code className="text-xs font-mono text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {token.var}
            </code>
            <button
              onClick={() => copyToClipboard(token.var)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              {copiedToken === token.var ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 text-gray-500" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted mt-1">
            {token.usage}
          </p>
        </div>
      </div>
    </div>
  );

  const ShadowCard = ({ token }) => (
    <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
          {token.name}
        </h4>
      </div>
      
      <div className="flex items-center space-x-3">
        <div 
          className="w-16 h-16 bg-surface dark:bg-surface-dark reverent:bg-rev-surface rounded-card"
          style={{ boxShadow: token.value }}
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <code className="text-xs font-mono text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {token.var}
            </code>
            <button
              onClick={() => copyToClipboard(token.var)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              {copiedToken === token.var ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 text-gray-500" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted mt-1">
            {token.usage}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Grid Overlay Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
          Spacing & Layout System
        </h2>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-card transition-colors ${
            showGrid 
              ? 'bg-primary text-white' :'bg-surface dark:bg-surface-dark reverent:bg-rev-surface text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface border border-divider dark:border-divider-dark reverent:border-rev-border'
          }`}
        >
          <Grid className="w-4 h-4 mr-2" />
          {showGrid ? 'Hide' : 'Show'} Grid
        </button>
      </div>

      {/* Grid Overlay */}
      {showGrid && (
        <div className="relative bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="grid grid-cols-12 gap-2 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-primary"></div>
              ))}
            </div>
          </div>
          <div className="relative z-10 text-center py-8">
            <p className="text-sm text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
              12-column grid overlay for spacing visualization
            </p>
          </div>
        </div>
      )}

      {/* Spacing Scale */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4 flex items-center">
          <Ruler className="w-5 h-5 mr-2" />
          Spacing Scale
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spacingTokens.map((token, index) => (
            <SpacingCard key={index} token={token} />
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
          Border Radius
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {borderRadiusTokens.map((token, index) => (
            <RadiusCard key={index} token={token} />
          ))}
        </div>
      </div>

      {/* Shadows */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
          Elevation Shadows
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shadowTokens.map((token, index) => (
            <ShadowCard key={index} token={token} />
          ))}
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="bg-blue-50 dark:bg-blue-900/20 reverent:bg-amber-50 border border-blue-200 dark:border-blue-800 reverent:border-amber-200 rounded-card p-4">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 reverent:text-amber-900 mb-2">
          Spacing Guidelines
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-300 reverent:text-amber-700 space-y-1">
          <li>• Use 8px as the base unit (--spacing-8)</li>
          <li>• Maintain consistent spacing ratios</li>
          <li>• Use larger spacing for section breaks</li>
          <li>• Keep touch targets ≥ 44px for accessibility</li>
        </ul>
      </div>
    </div>
  );
};

export default SpacingLayoutTab;