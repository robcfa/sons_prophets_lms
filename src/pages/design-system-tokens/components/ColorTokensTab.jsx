import React, { useState } from 'react';
import { Copy, Check, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTheme } from '../../../lib/theme-context';

const ColorTokensTab = () => {
  const { theme } = useTheme();
  const [copiedToken, setCopiedToken] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colorTokens = {
    light: {
      backgrounds: [
        { name: 'Background', var: '--color-bg', value: '#ffffff', usage: 'Main page background' },
        { name: 'Surface', var: '--color-surface', value: '#f8f9fa', usage: 'Card and container backgrounds' },
        { name: 'Card', var: '--color-card', value: '#ffffff', usage: 'Card components' },
        { name: 'Input', var: '--color-input', value: '#ffffff', usage: 'Form inputs' },
      ],
      text: [
        { name: 'On Surface', var: '--color-on-surface', value: '#1a202c', usage: 'Primary text on surfaces' },
        { name: 'Secondary', var: '--color-secondary', value: '#6b7280', usage: 'Secondary text' },
        { name: 'Muted', var: '--color-muted', value: '#9ca3af', usage: 'Muted text and placeholders' },
      ],
      accents: [
        { name: 'Primary', var: '--color-primary', value: '#8b4513', usage: 'Primary brand color' },
        { name: 'Primary Dark', var: '--color-primary-dark', value: '#6b341a', usage: 'Primary hover state' },
        { name: 'Border', var: '--color-border', value: '#e2e8f0', usage: 'Borders and dividers' },
      ],
    },
    dark: {
      backgrounds: [
        { name: 'Background', var: '--color-bg-dark', value: '#1a1a1a', usage: 'Dark mode page background' },
        { name: 'Surface', var: '--color-surface-dark', value: '#2d2d2d', usage: 'Dark mode surfaces' },
        { name: 'Card', var: '--color-card-dark', value: '#374151', usage: 'Dark mode cards' },
        { name: 'Input', var: '--color-input-dark', value: '#374151', usage: 'Dark mode inputs' },
      ],
      text: [
        { name: 'On Surface', var: '--color-on-surface-dark', value: '#f7fafc', usage: 'Primary text in dark mode' },
        { name: 'Secondary', var: '--color-on-surface-dark-secondary', value: '#a0aec0', usage: 'Secondary text in dark mode' },
        { name: 'Muted', var: '--color-muted-dark', value: '#6b7280', usage: 'Muted text in dark mode' },
      ],
      accents: [
        { name: 'Primary', var: '--color-primary-dark', value: '#d69e2e', usage: 'Primary color in dark mode' },
        { name: 'Primary Hover', var: '--color-primary-dark-hover', value: '#b7791f', usage: 'Primary hover in dark mode' },
        { name: 'Border', var: '--color-border-dark', value: '#4a5568', usage: 'Dark mode borders' },
      ],
    },
    reverent: {
      backgrounds: [
        { name: 'Background', var: '--color-rev-bg', value: '#f7f5f3', usage: 'Reverent mode page background' },
        { name: 'Surface', var: '--color-rev-surface', value: '#fefefe', usage: 'Reverent mode surfaces' },
        { name: 'Card', var: '--color-rev-card', value: '#fefcfa', usage: 'Reverent mode cards' },
        { name: 'Input', var: '--color-rev-input', value: '#fefefe', usage: 'Reverent mode inputs' },
      ],
      text: [
        { name: 'On Surface', var: '--color-rev-on-surface', value: '#2d3748', usage: 'Primary text in reverent mode' },
        { name: 'Secondary', var: '--color-rev-secondary', value: '#68341a', usage: 'Secondary text in reverent mode' },
        { name: 'Muted', var: '--color-rev-muted', value: '#8b7355', usage: 'Muted text in reverent mode' },
      ],
      accents: [
        { name: 'Accent', var: '--color-rev-accent', value: '#8b6914', usage: 'Accent color in reverent mode' },
        { name: 'Border', var: '--color-rev-border', value: '#d4c5b0', usage: 'Reverent mode borders' },
      ],
    },
  };

  const getContrastRatio = (color1, color2) => {
    // Simplified contrast ratio calculation
    // In a real implementation, you'd use a proper color contrast library
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const luminance1 = 0.299 * r1 + 0.587 * g1 + 0.114 * b1;
    const luminance2 = 0.299 * r2 + 0.587 * g2 + 0.114 * b2;
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 5) / (darker + 5);
  };

  const getAAStatus = (ratio) => {
    if (ratio >= 7) return { status: 'AAA', color: 'text-green-600' };
    if (ratio >= 4.5) return { status: 'AA', color: 'text-yellow-600' };
    return { status: 'Fail', color: 'text-red-600' };
  };

  const TokenCard = ({ token, category }) => {
    const contrastRatio = category === 'text' ? 
      getContrastRatio(token.value, theme === 'dark' ? '#1a1a1a' : '#ffffff') : 
      null;
    const aaStatus = contrastRatio ? getAAStatus(contrastRatio) : null;

    return (
      <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
            {token.name}
          </h4>
          {aaStatus && (
            <div className={`flex items-center space-x-1 ${aaStatus.color}`}>
              {aaStatus.status === 'Fail' ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              <span className="text-xs font-medium">{aaStatus.status}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-card border-2 border-divider dark:border-divider-dark reverent:border-rev-border"
            style={{ backgroundColor: token.value }}
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
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
                {token.value}
              </span>
              <button
                onClick={() => copyToClipboard(token.value)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                {copiedToken === token.value ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
          {token.usage}
        </p>
        
        {contrastRatio && (
          <div className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
            Contrast: {contrastRatio.toFixed(1)}:1
          </div>
        )}
      </div>
    );
  };

  const currentTokens = colorTokens[theme] || colorTokens.light;

  return (
    <div className="space-y-8">
      {/* Theme Switcher Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 reverent:bg-amber-50 border border-blue-200 dark:border-blue-800 reverent:border-amber-200 rounded-card p-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400 reverent:text-amber-600" />
          <h3 className="font-medium text-blue-900 dark:text-blue-100 reverent:text-amber-900">
            Viewing {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme Tokens
          </h3>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300 reverent:text-amber-700 mt-2">
          Switch themes using the toggle in the header to view different color palettes. All tokens automatically adapt to the current theme.
        </p>
      </div>

      {/* Background Colors */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
          Background Colors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentTokens.backgrounds.map((token, index) => (
            <TokenCard key={index} token={token} category="background" />
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
          Text Colors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentTokens.text.map((token, index) => (
            <TokenCard key={index} token={token} category="text" />
          ))}
        </div>
      </div>

      {/* Accent Colors */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
          Accent Colors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentTokens.accents.map((token, index) => (
            <TokenCard key={index} token={token} category="accent" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorTokensTab;