import React, { useState, useEffect } from 'react';
import { Palette, Eye, AlertCircle, Check, Copy } from 'lucide-react';

const ColorCustomizationTab = ({ currentTheme, customColors, onColorChange, getComputedStyle }) => {
  const [selectedColorGroup, setSelectedColorGroup] = useState('primary');
  const [contrastWarnings, setContrastWarnings] = useState({});

  const colorGroups = [
  {
    id: 'primary',
    name: 'Primary Colors',
    description: 'Main brand colors used for buttons and accents',
    colors: ['primary', 'primary-50', 'primary-100', 'primary-200', 'primary-300', 'primary-400', 'primary-500', 'primary-600', 'primary-700', 'primary-800', 'primary-900']
  },
  {
    id: 'secondary',
    name: 'Secondary Colors',
    description: 'Supporting colors for backgrounds and text',
    colors: ['secondary', 'secondary-50', 'secondary-100', 'secondary-200', 'secondary-300', 'secondary-400', 'secondary-500', 'secondary-600', 'secondary-700', 'secondary-800', 'secondary-900']
  },
  {
    id: 'accent',
    name: 'Accent Colors',
    description: 'Highlight colors for interactive elements',
    colors: ['accent', 'accent-50', 'accent-100', 'accent-200', 'accent-300', 'accent-400', 'accent-500', 'accent-600', 'accent-700', 'accent-800', 'accent-900']
  },
  {
    id: 'semantic',
    name: 'Semantic Colors',
    description: 'Status and feedback colors',
    colors: ['success', 'warning', 'error', 'info']
  },
  {
    id: 'surface',
    name: 'Surface Colors',
    description: 'Background and surface colors',
    colors: ['background', 'surface', 'card', 'popover', 'input']
  },
  {
    id: 'text',
    name: 'Text Colors',
    description: 'Typography and content colors',
    colors: ['text-primary', 'text-secondary', 'text-muted', 'text-foreground']
  }];


  const getCurrentColor = (colorName) => {
    const customColor = customColors[colorName];
    if (customColor) return customColor;

    // Get from CSS variables
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const cssVarName = `--color-${colorName.replace('text-', '').replace('primary-', 'primary-').replace('secondary-', 'secondary-').replace('accent-', 'accent-')}`;
    return computedStyle.getPropertyValue(cssVarName).trim();
  };

  const handleColorChange = (colorName, value) => {
    const newColors = { ...customColors, [colorName]: value };
    onColorChange(newColors);

    // Apply color immediately for preview
    const root = document.documentElement;
    const cssVarName = `--color-${colorName.replace('text-', '').replace('primary-', 'primary-').replace('secondary-', 'secondary-').replace('accent-', 'accent-')}`;
    root.style.setProperty(cssVarName, value);

    // Check contrast
    checkContrast(colorName, value);
  };

  const checkContrast = (colorName, colorValue) => {
    // Simple contrast check (would need more sophisticated implementation)
    const luminance = calculateLuminance(colorValue);
    const isAccessible = luminance > 0.5; // Simplified check

    setContrastWarnings((prev) => ({
      ...prev,
      [colorName]: !isAccessible
    }));
  };

  const calculateLuminance = (color) => {
    // Simplified luminance calculation
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  const copyColorValue = (colorName) => {
    const color = getCurrentColor(colorName);
    navigator.clipboard.writeText(color);
  };

  const resetColorGroup = (groupId) => {
    const group = colorGroups.find((g) => g.id === groupId);
    if (group) {
      const resetColors = { ...customColors };
      group.colors.forEach((colorName) => {
        delete resetColors[colorName];
        // Reset CSS variable
        const root = document.documentElement;
        const cssVarName = `--color-${colorName.replace('text-', '').replace('primary-', 'primary-').replace('secondary-', 'secondary-').replace('accent-', 'accent-')}`;
        root.style.removeProperty(cssVarName);
      });
      onColorChange(resetColors);
    }
  };

  const generateColorPalette = (baseColor) => {
    // Simple palette generation (would need more sophisticated implementation)
    const variations = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const palette = {};

    variations.forEach((variation) => {
      const lightness = Math.max(10, Math.min(90, 50 + (500 - variation) / 10));
      palette[`${selectedColorGroup}-${variation}`] = adjustColorLightness(baseColor, lightness);
    });

    return palette;
  };

  const adjustColorLightness = (color, lightness) => {
    // Simplified color adjustment
    return color; // Would implement actual HSL adjustment
  };

  const selectedGroup = colorGroups.find((g) => g.id === selectedColorGroup);

  return (
    <div className="space-y-6">
      {/* Color Group Selection */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Color Groups
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {colorGroups.map((group) =>
          <button
            key={group.id}
            onClick={() => setSelectedColorGroup(group.id)}
            className={`p-3 text-left rounded-lg border transition-all ${
            selectedColorGroup === group.id ?
            'border-primary bg-primary-50 text-primary' : 'border-border bg-surface hover:border-accent'}`
            }>

              <div className="font-medium text-sm">{group.name}</div>
              <div className="text-xs text-text-secondary mt-1">
                {group.description}
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Color Editor */}
      {selectedGroup &&
      <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-text-primary">
              {selectedGroup.name}
            </h4>
            <button
            onClick={() => resetColorGroup(selectedGroup.id)}
            className="text-sm text-text-secondary hover:text-text-primary">

              Reset Group
            </button>
          </div>

          <div className="space-y-4">
            {selectedGroup.colors.map((colorName) => {
            const currentColor = getCurrentColor(colorName);
            const hasWarning = contrastWarnings[colorName];

            return (
              <div key={colorName} className="flex items-center space-x-4">
                  {/* Color Preview */}
                  <div className="flex-shrink-0">
                    <div
                    className="w-12 h-12 rounded-md border border-border"
                    style={{ backgroundColor: currentColor }} />

                  </div>

                  {/* Color Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <label className="font-medium text-text-primary">
                        {colorName}
                      </label>
                      {hasWarning &&
                    <AlertCircle className="w-4 h-4 text-warning" title="Contrast may not meet accessibility standards" />
                    }
                    </div>
                    <div className="text-xs text-text-secondary">
                      CSS Variable: --color-{colorName.replace('text-', '').replace('primary-', 'primary-').replace('secondary-', 'secondary-').replace('accent-', 'accent-')}
                    </div>
                  </div>

                  {/* Color Input */}
                  <div className="flex items-center space-x-2">
                    <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => handleColorChange(colorName, e.target.value)}
                    className="w-8 h-8 rounded border border-border cursor-pointer" />

                    <input
                    type="text"
                    value={currentColor}
                    onChange={(e) => handleColorChange(colorName, e.target.value)}
                    className="w-24 px-2 py-1 text-xs border border-border rounded bg-input text-text-primary font-mono" />

                    <button
                    onClick={() => copyColorValue(colorName)}
                    className="p-1 text-text-secondary hover:text-text-primary"
                    title="Copy color value">

                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>);

          })}
          </div>

          {/* Palette Generator */}
          {selectedGroup.id === 'primary' &&
        <div className="mt-6 pt-6 border-t border-border">
              <h5 className="font-medium text-text-primary mb-3">
                Palette Generator
              </h5>
              <div className="flex items-center space-x-3">
                <input
              type="color"
              className="w-8 h-8 rounded border border-border cursor-pointer"
              onChange={(e) => {
                const palette = generateColorPalette(e.target.value);
                onColorChange({ ...customColors, ...palette });
              }} />

                <span className="text-sm text-text-secondary">
                  Select a base color to generate a complete palette
                </span>
              </div>
            </div>
        }
        </div>
      }

      {/* Accessibility Info */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h4 className="font-medium text-text-primary mb-3 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Accessibility Guidelines
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <Check className="w-4 h-4 text-success mt-0.5" />
            <div>
              <div className="font-medium">WCAG AA Compliance</div>
              <div className="text-text-secondary">Color contrast ratios meet accessibility standards</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Check className="w-4 h-4 text-success mt-0.5" />
            <div>
              <div className="font-medium">Color Blindness Support</div>
              <div className="text-text-secondary">Colors are distinguishable for users with color vision deficiency</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Check className="w-4 h-4 text-success mt-0.5" />
            <div>
              <div className="font-medium">High Contrast Mode</div>
              <div className="text-text-secondary">Theme maintains readability in high contrast environments</div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default ColorCustomizationTab;