import React, { useState } from 'react';
import { Type, AlignLeft, Sliders } from 'lucide-react';

const TypographySystemTab = () => {
  const [fontSettings, setFontSettings] = useState({
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    baseSize: '16px',
    scaleRatio: '1.25',
    lineHeight: '1.5',
  });

  const typographyScale = [
    { name: 'text-xs', size: '0.75rem', px: '12px', usage: 'Small captions, labels' },
    { name: 'text-sm', size: '0.875rem', px: '14px', usage: 'Secondary text, metadata' },
    { name: 'text-base', size: '1rem', px: '16px', usage: 'Body text, paragraphs' },
    { name: 'text-lg', size: '1.125rem', px: '18px', usage: 'Lead text, subheadings' },
    { name: 'text-xl', size: '1.25rem', px: '20px', usage: 'Small headings' },
    { name: 'text-2xl', size: '1.5rem', px: '24px', usage: 'Section headings' },
    { name: 'text-3xl', size: '1.875rem', px: '30px', usage: 'Page headings' },
    { name: 'text-4xl', size: '2.25rem', px: '36px', usage: 'Large headings' },
    { name: 'text-5xl', size: '3rem', px: '48px', usage: 'Display headings' },
    { name: 'text-6xl', size: '3.75rem', px: '60px', usage: 'Hero headings' },
  ];

  const lineHeightOptions = [
    { name: 'leading-tight', value: '1.25', usage: 'Headings, compact text' },
    { name: 'leading-normal', value: '1.5', usage: 'Body text, standard reading' },
    { name: 'leading-relaxed', value: '1.75', usage: 'Comfortable reading' },
    { name: 'leading-loose', value: '2', usage: 'Very spacious, accessibility' },
  ];

  const fontFamilies = [
    { name: 'Playfair Display', type: 'serif', usage: 'Headings, elegant display' },
    { name: 'Inter', type: 'sans-serif', usage: 'Body text, UI elements' },
    { name: 'JetBrains Mono', type: 'monospace', usage: 'Code, data display' },
  ];

  const handleFontChange = (setting, value) => {
    setFontSettings(prev => ({ ...prev, [setting]: value }));
    
    // Apply changes to CSS variables
    if (setting === 'headingFont') {
      document.documentElement.style.setProperty('--font-heading', value);
    } else if (setting === 'bodyFont') {
      document.documentElement.style.setProperty('--font-body', value);
    } else if (setting === 'baseSize') {
      document.documentElement.style.setProperty('--text-base', value);
    } else if (setting === 'lineHeight') {
      document.documentElement.style.setProperty('--leading-normal', value);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-2">Typography System</h2>
        <p className="text-secondary">
          Font family configuration and text size utilities with 4px baseline grid alignment.
        </p>
      </div>

      {/* Font Family Configuration */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Type className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Font Families</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Heading Font
            </label>
            <select
              value={fontSettings.headingFont}
              onChange={(e) => handleFontChange('headingFont', e.target.value)}
              className="input w-full"
            >
              {fontFamilies.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name} ({font.type})
                </option>
              ))}
            </select>
            <p className="text-xs text-muted mt-1">Used for all headings (h1-h6)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Body Font
            </label>
            <select
              value={fontSettings.bodyFont}
              onChange={(e) => handleFontChange('bodyFont', e.target.value)}
              className="input w-full"
            >
              {fontFamilies.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name} ({font.type})
                </option>
              ))}
            </select>
            <p className="text-xs text-muted mt-1">Used for body text and UI elements</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
          <h4 className="font-heading text-xl text-primary mb-2">Font Preview</h4>
          <p className="font-body text-base text-secondary">
            The quick brown fox jumps over the lazy dog. This preview shows how your selected fonts will appear in the interface.
          </p>
        </div>
      </div>

      {/* Typography Scale */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Sliders className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Typography Scale</h3>
        </div>
        
        <div className="space-y-4">
          {typographyScale.map((item) => (
            <div key={item.name} className="flex items-center gap-4 p-4 bg-surface rounded-lg border border-border">
              <div className="flex-shrink-0 w-20">
                <code className="text-sm font-data text-primary bg-surface-elevated px-2 py-1 rounded">
                  {item.name}
                </code>
              </div>
              
              <div className="flex-shrink-0 w-24 text-sm text-secondary">
                {item.size} ({item.px})
              </div>
              
              <div className="flex-1">
                <div 
                  className="text-primary font-body"
                  style={{ fontSize: item.size, lineHeight: 'var(--leading-normal)' }}
                >
                  Sample Text
                </div>
              </div>
              
              <div className="flex-shrink-0 w-48 text-xs text-muted">
                {item.usage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Height Controls */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <AlignLeft className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Line Height System</h3>
        </div>
        
        <div className="space-y-4">
          {lineHeightOptions.map((option) => (
            <div key={option.name} className="flex items-center gap-4 p-4 bg-surface rounded-lg border border-border">
              <div className="flex-shrink-0 w-32">
                <code className="text-sm font-data text-primary bg-surface-elevated px-2 py-1 rounded">
                  {option.name}
                </code>
              </div>
              
              <div className="flex-shrink-0 w-16 text-sm text-secondary">
                {option.value}
              </div>
              
              <div className="flex-1">
                <div 
                  className="text-primary font-body text-base"
                  style={{ lineHeight: option.value }}
                >
                  This text demonstrates the line height setting. Multiple lines of text will show the spacing between lines clearly.
                </div>
              </div>
              
              <div className="flex-shrink-0 w-48 text-xs text-muted">
                {option.usage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4px Baseline Grid Info */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <AlignLeft className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary mb-2">4px Baseline Grid</h3>
            <p className="text-secondary mb-3">
              All typography follows a 4px baseline grid system. Line heights and spacing are calculated to maintain 
              vertical rhythm and consistent spacing throughout the interface.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-secondary">Base: 16px</span>
              <span className="text-secondary">Grid: 4px</span>
              <span className="text-secondary">Line Height: 24px (16px × 1.5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographySystemTab;