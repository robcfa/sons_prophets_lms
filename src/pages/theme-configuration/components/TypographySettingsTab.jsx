import React, { useState, useEffect } from 'react';
import { Type, Sliders, RotateCcw } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const TypographySettingsTab = ({ currentTheme, customTypography, onTypographyChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('fonts');
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');

  const fontCategories = [
    { id: 'fonts', name: 'Font Families', icon: Type },
    { id: 'sizes', name: 'Font Sizes', icon: Sliders },
    { id: 'spacing', name: 'Line Height & Spacing', icon: Sliders }
  ];

  const fontFamilies = [
    { id: 'heading', name: 'Headings', current: 'Crimson Text', type: 'serif' },
    { id: 'body', name: 'Body Text', current: 'Source Sans Pro', type: 'sans-serif' },
    { id: 'caption', name: 'Captions', current: 'Inter', type: 'sans-serif' },
    { id: 'data', name: 'Code/Data', current: 'JetBrains Mono', type: 'monospace' }
  ];

  const fontOptions = {
    serif: [
      'Crimson Text',
      'Georgia',
      'Times New Roman',
      'Merriweather',
      'Playfair Display',
      'Source Serif Pro'
    ],
    'sans-serif': [
      'Source Sans Pro',
      'Inter',
      'Roboto',
      'Open Sans',
      'Nunito Sans',
      'System UI'
    ],
    monospace: [
      'JetBrains Mono',
      'Fira Code',
      'Source Code Pro',
      'Monaco',
      'Consolas',
      'Courier New'
    ]
  };

  const fontSizes = [
    { id: 'text-xs', name: 'Extra Small', current: '0.75rem', min: 0.5, max: 1, step: 0.05 },
    { id: 'text-sm', name: 'Small', current: '0.875rem', min: 0.6, max: 1.2, step: 0.05 },
    { id: 'text-base', name: 'Base', current: '1rem', min: 0.8, max: 1.4, step: 0.05 },
    { id: 'text-lg', name: 'Large', current: '1.125rem', min: 1, max: 1.6, step: 0.05 },
    { id: 'text-xl', name: 'Extra Large', current: '1.25rem', min: 1.1, max: 1.8, step: 0.05 },
    { id: 'text-2xl', name: '2X Large', current: '1.5rem', min: 1.3, max: 2.2, step: 0.05 },
    { id: 'text-3xl', name: '3X Large', current: '1.875rem', min: 1.6, max: 2.8, step: 0.05 },
    { id: 'text-4xl', name: '4X Large', current: '2.25rem', min: 2, max: 3.5, step: 0.05 }
  ];

  const spacingOptions = [
    { id: 'line-height-tight', name: 'Tight Line Height', current: '1.25', min: 1.1, max: 1.4, step: 0.05 },
    { id: 'line-height-normal', name: 'Normal Line Height', current: '1.5', min: 1.3, max: 1.8, step: 0.05 },
    { id: 'line-height-relaxed', name: 'Relaxed Line Height', current: '1.625', min: 1.4, max: 2, step: 0.05 },
    { id: 'letter-spacing-tight', name: 'Tight Letter Spacing', current: '-0.025em', min: -0.1, max: 0.1, step: 0.005 },
    { id: 'letter-spacing-normal', name: 'Normal Letter Spacing', current: '0', min: -0.1, max: 0.1, step: 0.005 },
    { id: 'letter-spacing-wide', name: 'Wide Letter Spacing', current: '0.025em', min: -0.1, max: 0.1, step: 0.005 }
  ];

  const handleFontChange = (categoryId, fontFamily) => {
    const newTypography = { ...customTypography };
    if (!newTypography.fonts) newTypography.fonts = {};
    newTypography.fonts[categoryId] = fontFamily;
    onTypographyChange(newTypography);
    
    // Apply font immediately
    const root = document.documentElement;
    root.style.setProperty(`--font-${categoryId}`, fontFamily);
  };

  const handleSizeChange = (sizeId, value) => {
    const newTypography = { ...customTypography };
    if (!newTypography.sizes) newTypography.sizes = {};
    newTypography.sizes[sizeId] = `${value}rem`;
    onTypographyChange(newTypography);
    
    // Apply size immediately
    const root = document.documentElement;
    root.style.setProperty(`--${sizeId}`, `${value}rem`);
  };

  const handleSpacingChange = (spacingId, value) => {
    const newTypography = { ...customTypography };
    if (!newTypography.spacing) newTypography.spacing = {};
    newTypography.spacing[spacingId] = spacingId.includes('letter') ? `${value}em` : value;
    onTypographyChange(newTypography);
    
    // Apply spacing immediately
    const root = document.documentElement;
    root.style.setProperty(`--${spacingId}`, spacingId.includes('letter') ? `${value}em` : value);
  };

  const resetTypography = () => {
    onTypographyChange({});
    // Reset CSS variables
    const root = document.documentElement;
    fontFamilies.forEach(font => {
      root.style.removeProperty(`--font-${font.id}`);
    });
    fontSizes.forEach(size => {
      root.style.removeProperty(`--${size.id}`);
    });
    spacingOptions.forEach(spacing => {
      root.style.removeProperty(`--${spacing.id}`);
    });
  };

  const renderFontSelector = () => (
    <div className="space-y-6">
      {fontFamilies.map((font) => (
        <div key={font.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-medium text-text-primary">{font.name}</label>
            <span className="text-xs text-text-secondary">{font.type}</span>
          </div>
          <select
            value={customTypography.fonts?.[font.id] || font.current}
            onChange={(e) => handleFontChange(font.id, e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {fontOptions[font.type].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div 
            className="p-3 bg-card border border-border rounded-md"
            style={{ fontFamily: customTypography.fonts?.[font.id] || font.current }}
          >
            <div className="text-lg">{previewText}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSizeSelector = () => (
    <div className="space-y-6">
      {fontSizes.map((size) => {
        const currentValue = customTypography.sizes?.[size.id] 
          ? parseFloat(customTypography.sizes[size.id]) 
          : parseFloat(size.current);
        
        return (
          <div key={size.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium text-text-primary">{size.name}</label>
              <span className="text-xs text-text-secondary">{currentValue}rem</span>
            </div>
            <input
              type="range"
              min={size.min}
              max={size.max}
              step={size.step}
              value={currentValue}
              onChange={(e) => handleSizeChange(size.id, parseFloat(e.target.value))}
              className="w-full"
            />
            <div 
              className="p-3 bg-card border border-border rounded-md"
              style={{ fontSize: `${currentValue}rem` }}
            >
              {previewText}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSpacingSelector = () => (
    <div className="space-y-6">
      {spacingOptions.map((spacing) => {
        const currentValue = customTypography.spacing?.[spacing.id] 
          ? parseFloat(customTypography.spacing[spacing.id]) 
          : parseFloat(spacing.current);
        
        return (
          <div key={spacing.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium text-text-primary">{spacing.name}</label>
              <span className="text-xs text-text-secondary">
                {currentValue}{spacing.id.includes('letter') ? 'em' : ''}
              </span>
            </div>
            <input
              type="range"
              min={spacing.min}
              max={spacing.max}
              step={spacing.step}
              value={currentValue}
              onChange={(e) => handleSpacingChange(spacing.id, parseFloat(e.target.value))}
              className="w-full"
            />
            <div 
              className="p-3 bg-card border border-border rounded-md"
              style={{ 
                [spacing.id.includes('letter') ? 'letterSpacing' : 'lineHeight']: 
                  spacing.id.includes('letter') ? `${currentValue}em` : currentValue
              }}
            >
              <div className="text-base">
                {previewText}
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="flex space-x-4">
        {fontCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors ${
                selectedCategory === category.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface hover:bg-accent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Preview Text Input */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Preview Text
        </label>
        <input
          type="text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter text to preview typography changes..."
        />
      </div>

      {/* Typography Settings */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-medium text-text-primary">
            {fontCategories.find(c => c.id === selectedCategory)?.name}
          </h4>
          <button
            onClick={resetTypography}
            className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All</span>
          </button>
        </div>

        {selectedCategory === 'fonts' && renderFontSelector()}
        {selectedCategory === 'sizes' && renderSizeSelector()}
        {selectedCategory === 'spacing' && renderSpacingSelector()}
      </div>

      {/* Typography Scale Preview */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h4 className="text-lg font-medium text-text-primary mb-4">
          Typography Scale Preview
        </h4>
        <div className="space-y-4">
          <div className="text-4xl font-heading">Heading 1 - 4XL</div>
          <div className="text-3xl font-heading">Heading 2 - 3XL</div>
          <div className="text-2xl font-heading">Heading 3 - 2XL</div>
          <div className="text-xl font-heading">Heading 4 - XL</div>
          <div className="text-lg font-heading">Heading 5 - Large</div>
          <div className="text-base font-body">Body text - Base size</div>
          <div className="text-sm font-body">Small text - Small size</div>
          <div className="text-xs font-caption">Caption text - Extra small</div>
          <div className="text-sm font-data">Code/Data text - Monospace</div>
        </div>
      </div>
    </div>
  );
};

export default TypographySettingsTab;