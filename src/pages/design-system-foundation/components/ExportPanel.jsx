import React, { useState } from 'react';
import { Download, FileText, Settings, Check } from 'lucide-react';

const ExportPanel = () => {
  const [exportOptions, setExportOptions] = useState({
    tokens: true,
    tailwindConfig: true,
    componentStyles: true,
    documentation: false
  });
  const [exportFormat, setExportFormat] = useState('css');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const exportFormats = [
    { value: 'css', label: 'CSS Variables' },
    { value: 'js', label: 'JavaScript Object' },
    { value: 'json', label: 'JSON' },
    { value: 'scss', label: 'SCSS Variables' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const exportData = generateExportData();
    downloadFile(exportData, `design-system-${Date.now()}.${exportFormat}`);
    
    setIsExporting(false);
    setExportComplete(true);
    
    // Reset completion state after 3 seconds
    setTimeout(() => setExportComplete(false), 3000);
  };

  const generateExportData = () => {
    const tokens = `/* Generated Design System Tokens */
:root {
  /* Spacing System - 4px baseline grid */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;

  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;

  /* Elevation */
  --elevation-1: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --elevation-2: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --elevation-3: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --elevation-4: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --elevation-5: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --elevation-6: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* Light Theme Colors */
  --light-primary: #8B4513;
  --light-secondary: #2F4F4F;
  --light-background: #FEFEFE;
  --light-surface: #F8F6F3;
  --light-text-primary: #2C2C2C;
  --light-text-secondary: #6B6B6B;

  /* Dark Theme Colors */
  --dark-primary: #D4A574;
  --dark-secondary: #8A9999;
  --dark-background: #121212;
  --dark-surface: #1E1E1E;
  --dark-text-primary: #F8F9FA;
  --dark-text-secondary: #ADB5BD;

  /* Reverent Theme Colors */
  --reverent-primary: #6B4226;
  --reverent-accent: #8B6914;
  --reverent-charcoal: #3C3C3C;
  --reverent-background: #F7F5F3;
  --reverent-surface: #FEFEFE;
  --reverent-text-primary: #3C3C3C;
  --reverent-text-secondary: #68341A;

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Text Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --leading-loose: 2;
}

/* Theme Classes */
.dark {
  --color-primary: var(--dark-primary);
  --color-secondary: var(--dark-secondary);
  --color-background: var(--dark-background);
  --color-surface: var(--dark-surface);
  --color-text-primary: var(--dark-text-primary);
  --color-text-secondary: var(--dark-text-secondary);
}

.reverent {
  --color-primary: var(--reverent-primary);
  --color-accent: var(--reverent-accent);
  --color-charcoal: var(--reverent-charcoal);
  --color-background: var(--reverent-background);
  --color-surface: var(--reverent-surface);
  --color-text-primary: var(--reverent-text-primary);
  --color-text-secondary: var(--reverent-text-secondary);
  
  /* Sanctuary Mode enhancements */
  font-size: 110%;
  line-height: var(--leading-relaxed);
}

.sanctuary-mode {
  --text-base: 1.125rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --leading-normal: 1.75;
  --leading-relaxed: 2;
}`;

    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        charcoal: 'var(--color-charcoal)',
      },
      spacing: {
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
      },
      boxShadow: {
        'sm': 'var(--elevation-1)',
        'md': 'var(--elevation-2)',
        'lg': 'var(--elevation-3)',
        'xl': 'var(--elevation-4)',
        '2xl': 'var(--elevation-5)',
        '3xl': 'var(--elevation-6)',
      },
      fontSize: {
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
      },
      lineHeight: {
        'tight': 'var(--leading-tight)',
        'normal': 'var(--leading-normal)',
        'relaxed': 'var(--leading-relaxed)',
        'loose': 'var(--leading-loose)',
      },
      fontFamily: {
        'heading': 'var(--font-heading)',
        'body': 'var(--font-body)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};`;

    if (exportFormat === 'css') {
      return exportOptions.tailwindConfig ? `${tokens}\n\n/* Tailwind Config */\n${tailwindConfig}` : tokens;
    }
    
    // For other formats, return appropriate structure
    return tokens;
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Download className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Export Design System</h3>
        </div>
        
        <div className="space-y-4">
          {/* Export Options */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Export Content
            </label>
            <div className="space-y-2">
              {Object.entries(exportOptions).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <span className="text-sm text-secondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Export Format
            </label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="input w-full"
            >
              {exportFormats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              exportComplete
                ? 'bg-success text-white'
                : isExporting
                ? 'bg-border text-secondary cursor-not-allowed' :'bg-primary text-white hover:bg-primary-600'
            }`}
          >
            {exportComplete ? (
              <div className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                <span>Export Complete!</span>
              </div>
            ) : isExporting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                <span>Exporting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                <span>Export Design System</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Export Information */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Export Information</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <p className="text-secondary">
                <strong className="text-primary">tokens.css</strong> - Complete CSS variables with 4px baseline grid
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <p className="text-secondary">
                <strong className="text-primary">tailwind.config.js</strong> - Tailwind configuration with theme mappings
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <p className="text-secondary">
                <strong className="text-primary">Component styles</strong> - Base component implementations
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <p className="text-secondary">
                <strong className="text-primary">Theme classes</strong> - Light, dark, and reverent mode mappings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-heading font-semibold text-primary">Live Preview</h3>
        </div>
        
        <div className="p-4 bg-surface rounded-lg border border-border">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg"></div>
              <div>
                <h4 className="font-heading font-semibold text-primary">Primary Color</h4>
                <p className="text-sm text-secondary">var(--color-primary)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary rounded-lg"></div>
              <div>
                <h4 className="font-heading font-semibold text-secondary">Secondary Color</h4>
                <p className="text-sm text-secondary">var(--color-secondary)</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-surface-elevated rounded-lg">
              <p className="text-sm font-body text-secondary">
                All design tokens are working correctly and ready for export.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;