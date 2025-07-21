import React from 'react';
import { Eye, Type, AlignLeft } from 'lucide-react';

const AccessibilityControls = ({ 
  sanctuaryMode, 
  onSanctuaryModeToggle, 
  fontSize, 
  onFontSizeChange, 
  lineHeight, 
  onLineHeightChange 
}) => {
  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'base', label: 'Base' },
    { value: 'large', label: 'Large' },
  ];

  const lineHeights = [
    { value: 'tight', label: 'Tight' },
    { value: 'normal', label: 'Normal' },
    { value: 'relaxed', label: 'Relaxed' },
    { value: 'loose', label: 'Loose' },
  ];

  return (
    <div className="accessibility-controls mb-8">
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-secondary" />
          <span className="text-sm font-medium text-secondary">Accessibility:</span>
        </div>

        {/* Sanctuary Mode Toggle */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-secondary">Sanctuary Mode</label>
          <button
            onClick={onSanctuaryModeToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-ring ${
              sanctuaryMode ? 'bg-primary' : 'bg-border'
            }`}
            aria-pressed={sanctuaryMode}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                sanctuaryMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Font Size Controls */}
        <div className="font-size-control">
          <Type className="w-4 h-4 text-secondary" />
          <span className="text-sm text-secondary">Font Size:</span>
          <div className="flex gap-1">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => onFontSizeChange(size.value)}
                className={`px-2 py-1 text-xs rounded transition-colors focus-ring ${
                  fontSize === size.value
                    ? 'bg-primary text-white' :'bg-surface-elevated text-secondary hover:bg-primary hover:text-white'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Line Height Controls */}
        <div className="font-size-control">
          <AlignLeft className="w-4 h-4 text-secondary" />
          <span className="text-sm text-secondary">Line Height:</span>
          <div className="flex gap-1">
            {lineHeights.map((height) => (
              <button
                key={height.value}
                onClick={() => onLineHeightChange(height.value)}
                className={`px-2 py-1 text-xs rounded transition-colors focus-ring ${
                  lineHeight === height.value
                    ? 'bg-primary text-white' :'bg-surface-elevated text-secondary hover:bg-primary hover:text-white'
                }`}
              >
                {height.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityControls;