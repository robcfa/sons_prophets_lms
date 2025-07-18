import React, { useState } from 'react';
import { Download, Copy, Check, FileText, Code } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const ExportPanel = () => {
  const [copiedItem, setCopiedItem] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('css');

  const copyToClipboard = (text, item) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const generateCSS = () => {
    return `/* Design System Tokens - Generated Export */

:root {
  /* Spacing */
  --spacing-4: 0.25rem;
  --spacing-8: 0.5rem;
  --spacing-16: 1rem;
  --spacing-24: 1.5rem;
  --spacing-32: 2rem;

  /* Border Radius */
  --radius-card: 8px;

  /* Shadows */
  --shadow-1: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-2: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Light Theme Colors */
  --color-bg: #ffffff;
  --color-surface: #f8f9fa;
  --color-on-surface: #1a202c;
  --color-primary: #8b4513;
  --color-primary-dark: #6b341a;
  --color-border: #e2e8f0;
}

/* Dark Theme */
.dark {
  --color-bg: #1a1a1a;
  --color-surface: #2d2d2d;
  --color-on-surface: #f7fafc;
  --color-border: #4a5568;
}

/* Reverent Theme */
.reverent {
  --color-bg: #f7f5f3;
  --color-surface: #fefefe;
  --color-on-surface: #2d3748;
  --color-border: #d4c5b0;
}`;
  };

  const generateTailwindConfig = () => {
    return `// Tailwind Config - Generated Export
module.exports = {
  theme: {
    extend: {
      spacing: {
        '4': 'var(--spacing-4)',
        '8': 'var(--spacing-8)',
        '16': 'var(--spacing-16)',
        '24': 'var(--spacing-24)',
        '32': 'var(--spacing-32)',
      },
      colors: {
        'bg': 'var(--color-bg)',
        'surface': 'var(--color-surface)',
        'on-surface': 'var(--color-on-surface)',
        'primary': 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'border': 'var(--color-border)',
      },
      borderRadius: {
        'card': 'var(--radius-card)',
      },
      boxShadow: {
        '1': 'var(--shadow-1)',
        '2': 'var(--shadow-2)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'reverent'],
      textColor: ['dark', 'reverent'],
      borderColor: ['dark', 'reverent'],
    },
  },
}`;
  };

  const generateJSON = () => {
    return `{
  "designTokens": {
    "spacing": {
      "4": "0.25rem",
      "8": "0.5rem",
      "16": "1rem",
      "24": "1.5rem",
      "32": "2rem"
    },
    "borderRadius": {
      "card": "8px"
    },
    "shadows": {
      "1": "0 1px 3px rgba(0, 0, 0, 0.1)",
      "2": "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    "colors": {
      "light": {
        "bg": "#ffffff",
        "surface": "#f8f9fa",
        "onSurface": "#1a202c",
        "primary": "#8b4513",
        "primaryDark": "#6b341a",
        "border": "#e2e8f0"
      },
      "dark": {
        "bg": "#1a1a1a",
        "surface": "#2d2d2d",
        "onSurface": "#f7fafc",
        "border": "#4a5568"
      },
      "reverent": {
        "bg": "#f7f5f3",
        "surface": "#fefefe",
        "onSurface": "#2d3748",
        "border": "#d4c5b0"
      }
    }
  }
}`;
  };

  const formats = [
    { 
      id: 'css', 
      name: 'CSS Variables', 
      icon: FileText, 
      description: 'Ready-to-use CSS custom properties',
      generate: generateCSS 
    },
    { 
      id: 'tailwind', 
      name: 'Tailwind Config', 
      icon: Code, 
      description: 'Tailwind CSS configuration file',
      generate: generateTailwindConfig 
    },
    { 
      id: 'json', 
      name: 'JSON Format', 
      icon: FileText, 
      description: 'Structured JSON for other tools',
      generate: generateJSON 
    },
  ];

  const selectedFormatData = formats.find(f => f.id === selectedFormat);

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
      {/* Format Selection */}
      <div>
        <h4 className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-3">
          Export Format
        </h4>
        <div className="space-y-2">
          {formats.map((format) => {
            const Icon = format.icon;
            return (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-card text-left transition-colors ${
                  selectedFormat === format.id
                    ? 'bg-primary text-white' :'bg-surface dark:bg-surface-dark reverent:bg-rev-surface text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface border border-divider dark:border-divider-dark reverent:border-rev-border hover:bg-primary hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <div>
                  <div className="font-medium">{format.name}</div>
                  <div className="text-xs opacity-75">{format.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview */}
      <div>
        <h4 className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-3">
          Preview
        </h4>
        <div className="bg-gray-50 dark:bg-gray-800 reverent:bg-amber-50 rounded-card p-4">
          <pre className="text-xs text-gray-700 dark:text-gray-300 reverent:text-amber-800 overflow-x-auto whitespace-pre-wrap">
            {selectedFormatData?.generate().substring(0, 500)}...
          </pre>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => copyToClipboard(selectedFormatData?.generate(), 'full')}
          className="flex items-center px-4 py-2 bg-surface dark:bg-surface-dark reverent:bg-rev-surface text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card hover:bg-primary hover:text-white transition-colors"
        >
          {copiedItem === 'full' ? (
            <Check className="w-4 h-4 mr-2" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          Copy All
        </button>
        
        <button
          onClick={() => downloadFile(
            selectedFormatData?.generate(),
            `design-tokens.${selectedFormat === 'tailwind' ? 'js' : selectedFormat === 'json' ? 'json' : 'css'}`
          )}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-card hover:bg-primary-dark transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 reverent:bg-amber-50 border border-blue-200 dark:border-blue-800 reverent:border-amber-200 rounded-card p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 reverent:text-amber-900 mb-2">
          Usage Instructions
        </h4>
        <div className="text-sm text-blue-700 dark:text-blue-300 reverent:text-amber-700 space-y-1">
          {selectedFormat === 'css' && (
            <>
              <p>1. Add the CSS file to your project</p>
              <p>2. Import it in your main stylesheet</p>
              <p>3. Use the CSS variables in your components</p>
            </>
          )}
          {selectedFormat === 'tailwind' && (
            <>
              <p>1. Replace your tailwind.config.js content</p>
              <p>2. Add the theme extension to your config</p>
              <p>3. Use the utility classes in your HTML</p>
            </>
          )}
          {selectedFormat === 'json' && (
            <>
              <p>1. Import the JSON in your build tools</p>
              <p>2. Transform tokens for your platform</p>
              <p>3. Generate platform-specific token files</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;