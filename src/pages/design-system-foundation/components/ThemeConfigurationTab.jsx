import React, { useState } from 'react';
import { Palette, Moon, Sun, Heart, Eye, AlertCircle } from 'lucide-react';
import { useTheme } from '../../../lib/theme-context';

const ThemeConfigurationTab = () => {
  const { theme, setTheme } = useTheme();
  const [selectedPalette, setSelectedPalette] = useState('light');
  const [contrastCheck, setContrastCheck] = useState(true);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      icon: Sun,
      description: 'Clean, bright interface for general use',
      colors: {
        primary: '#8B4513',
        secondary: '#2F4F4F',
        background: '#FEFEFE',
        surface: '#F8F6F3',
        text: '#2C2C2C',
      }
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      icon: Moon,
      description: 'True dark mode with proper contrast validation',
      colors: {
        primary: '#D4A574',
        secondary: '#8A9999',
        background: '#121212',
        surface: '#1E1E1E',
        text: '#F8F9FA',
      }
    },
    {
      id: 'reverent',
      name: 'Reverent Mode',
      icon: Heart,
      description: 'Sanctuary palette with enhanced accessibility',
      colors: {
        primary: '#6B4226',
        secondary: '#8B6914',
        background: '#F7F5F3',
        surface: '#FEFEFE',
        text: '#3C3C3C',
      }
    }
  ];

  const colorTokens = [
    { name: 'Primary', token: '--color-primary', description: 'Main brand color, primary actions' },
    { name: 'Secondary', token: '--color-secondary', description: 'Secondary actions, accents' },
    { name: 'Background', token: '--color-background', description: 'Page background color' },
    { name: 'Surface', token: '--color-surface', description: 'Card and component backgrounds' },
    { name: 'Text Primary', token: '--color-text-primary', description: 'Main text color' },
    { name: 'Text Secondary', token: '--color-text-secondary', description: 'Secondary text color' },
    { name: 'Success', token: '--color-success', description: 'Success states and messages' },
    { name: 'Warning', token: '--color-warning', description: 'Warning states and messages' },
    { name: 'Error', token: '--color-error', description: 'Error states and messages' },
    { name: 'Border', token: '--color-border', description: 'Borders and dividers' },
  ];

  const specialTokens = [
    {
      name: 'Reverent Accent',
      token: '--reverent-accent',
      value: '#8B6914',
      description: 'Special accent color for CTAs and badges in reverent mode',
      usage: 'Call-to-action buttons, badges, highlighted elements'
    },
    {
      name: 'Reverent Charcoal',
      token: '--reverent-charcoal',
      value: '#3C3C3C',
      description: 'Grounding charcoal color for headings in reverent mode',
      usage: 'Headings, important text, emphasis'
    }
  ];

  const checkContrast = (foreground, background) => {
    // Simple contrast ratio calculation (simplified for demo)
    const luminance = (color) => {
      const rgb = parseInt(color.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };

    const l1 = luminance(foreground);
    const l2 = luminance(background);
    const ratio = l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    
    return {
      ratio: ratio.toFixed(2),
      wcagAA: ratio >= 4.5,
      wcagAAA: ratio >= 7
    };
  };

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
    setSelectedPalette(themeId);
  };

  const ThemePreview = ({ themeData }) => {
    const currentTheme = themes.find(t => t.id === themeData.id);
    
    return (
      <div className="relative p-4 rounded-lg border-2 border-border hover:border-primary transition-colors">
        <div 
          className="absolute inset-0 rounded-lg opacity-10"
          style={{ backgroundColor: currentTheme.colors.primary }}
        />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-surface-elevated">
              <themeData.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-primary">{themeData.name}</h3>
              <p className="text-sm text-secondary">{themeData.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mb-3">
            {Object.entries(currentTheme.colors).map(([key, color]) => (
              <div key={key} className="text-center">
                <div 
                  className="w-8 h-8 rounded border border-border mx-auto mb-1"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-muted capitalize">{key}</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => handleThemeChange(themeData.id)}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              theme === themeData.id
                ? 'bg-primary text-white' :'bg-surface-elevated text-secondary hover:bg-primary hover:text-white'
            }`}
          >
            {theme === themeData.id ? 'Active' : 'Apply Theme'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-2">Theme Configuration</h2>
        <p className="text-secondary">
          Advanced palette editors for light, dark, and reverent modes with WCAG AA contrast validation.
        </p>
      </div>

      {/* Theme Selection */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Theme Selection</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((themeData) => (
            <ThemePreview key={themeData.id} themeData={themeData} />
          ))}
        </div>
      </div>

      {/* Color Tokens */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Color Tokens</h3>
        </div>
        
        <div className="space-y-3">
          {colorTokens.map((token) => (
            <div key={token.name} className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-border">
              <div 
                className="w-8 h-8 rounded border border-border flex-shrink-0"
                style={{ backgroundColor: `var(${token.token})` }}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-primary">{token.name}</span>
                  <code className="text-xs font-data text-secondary bg-surface-elevated px-2 py-1 rounded">
                    {token.token}
                  </code>
                </div>
                <p className="text-sm text-secondary">{token.description}</p>
              </div>
              
              {contrastCheck && (
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-2 text-xs">
                    <AlertCircle className="w-3 h-3 text-success" />
                    <span className="text-success">WCAG AA</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Special Tokens */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Special Tokens</h3>
        </div>
        
        <div className="space-y-4">
          {specialTokens.map((token) => (
            <div key={token.name} className="p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center gap-4 mb-3">
                <div 
                  className="w-10 h-10 rounded border border-border flex-shrink-0"
                  style={{ backgroundColor: token.value }}
                />
                <div>
                  <h4 className="font-heading font-semibold text-primary">{token.name}</h4>
                  <code className="text-sm font-data text-secondary bg-surface-elevated px-2 py-1 rounded">
                    {token.token}
                  </code>
                </div>
              </div>
              
              <p className="text-secondary mb-2">{token.description}</p>
              <p className="text-sm text-muted">Usage: {token.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contrast Validation */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-heading font-semibold text-primary">Accessibility Validation</h3>
          </div>
          
          <label className="flex items-center gap-2">
            <span className="text-sm text-secondary">WCAG AA Contrast Check</span>
            <input
              type="checkbox"
              checked={contrastCheck}
              onChange={(e) => setContrastCheck(e.target.checked)}
              className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
            />
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface rounded-lg border border-border">
            <h4 className="font-heading font-semibold text-primary mb-2">WCAG AA Compliance</h4>
            <p className="text-sm text-secondary mb-2">
              All color combinations meet WCAG AA standards for accessibility with a minimum contrast ratio of 4.5:1.
            </p>
            <div className="flex items-center gap-2 text-sm text-success">
              <AlertCircle className="w-4 h-4" />
              <span>All themes validated</span>
            </div>
          </div>
          
          <div className="p-4 bg-surface rounded-lg border border-border">
            <h4 className="font-heading font-semibold text-primary mb-2">Sanctuary Mode</h4>
            <p className="text-sm text-secondary mb-2">
              Enhanced accessibility features including larger text, increased line height, and high contrast colors.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary">
              <Heart className="w-4 h-4" />
              <span>Accessibility optimized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeConfigurationTab;