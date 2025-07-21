import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, Code, Palette } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const ExportModal = ({ themeData, currentTheme, onClose }) => {
  const [exportFormat, setExportFormat] = useState('css');
  const [copied, setCopied] = useState(false);

  const exportFormats = [
    { id: 'css', name: 'CSS Variables', icon: Code, description: 'CSS custom properties file' },
    { id: 'tailwind', name: 'Tailwind Config', icon: Palette, description: 'Tailwind CSS configuration' },
    { id: 'json', name: 'JSON Theme', icon: FileText, description: 'JSON theme configuration' },
    { id: 'js', name: 'JavaScript', icon: Code, description: 'JavaScript theme object' }
  ];

  const generateCSSExport = () => {
    const cssVariables = [];
    
    // Add theme metadata
    cssVariables.push(`/* Theme: ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} */`);
    cssVariables.push(`/* Generated: ${new Date().toISOString()} */`);
    cssVariables.push('');
    cssVariables.push(':root {');
    
    // Colors
    if (themeData.colors && Object.keys(themeData.colors).length > 0) {
      cssVariables.push('  /* Custom Colors */');
      Object.entries(themeData.colors).forEach(([key, value]) => {
        cssVariables.push(`  --color-${key}: ${value};`);
      });
      cssVariables.push('');
    }
    
    // Typography
    if (themeData.typography && Object.keys(themeData.typography).length > 0) {
      if (themeData.typography.fonts) {
        cssVariables.push('  /* Font Families */');
        Object.entries(themeData.typography.fonts).forEach(([key, value]) => {
          cssVariables.push(`  --font-${key}: '${value}', sans-serif;`);
        });
        cssVariables.push('');
      }
      
      if (themeData.typography.sizes) {
        cssVariables.push('  /* Font Sizes */');
        Object.entries(themeData.typography.sizes).forEach(([key, value]) => {
          cssVariables.push(`  --${key}: ${value};`);
        });
        cssVariables.push('');
      }
      
      if (themeData.typography.spacing) {
        cssVariables.push('  /* Typography Spacing */');
        Object.entries(themeData.typography.spacing).forEach(([key, value]) => {
          cssVariables.push(`  --${key}: ${value};`);
        });
        cssVariables.push('');
      }
    }
    
    // Components
    if (themeData.components && Object.keys(themeData.components).length > 0) {
      cssVariables.push('  /* Component Styles */');
      Object.entries(themeData.components).forEach(([componentKey, componentValue]) => {
        if (typeof componentValue === 'object') {
          Object.entries(componentValue).forEach(([variantKey, variantValue]) => {
            if (typeof variantValue === 'object') {
              Object.entries(variantValue).forEach(([propKey, propValue]) => {
                cssVariables.push(`  --${componentKey}-${variantKey}-${propKey}: ${propValue};`);
              });
            }
          });
        }
      });
      cssVariables.push('');
    }
    
    cssVariables.push('}');
    
    return cssVariables.join('\n');
  };

  const generateTailwindExport = () => {
    const config = {
      theme: {
        extend: {}
      }
    };
    
    // Colors
    if (themeData.colors && Object.keys(themeData.colors).length > 0) {
      config.theme.extend.colors = {};
      Object.entries(themeData.colors).forEach(([key, value]) => {
        const colorName = key.replace(/-(50|100|200|300|400|500|600|700|800|900)$/, '');
        const colorShade = key.match(/-(50|100|200|300|400|500|600|700|800|900)$/);
        
        if (colorShade) {
          if (!config.theme.extend.colors[colorName]) {
            config.theme.extend.colors[colorName] = {};
          }
          config.theme.extend.colors[colorName][colorShade[1]] = value;
        } else {
          config.theme.extend.colors[key] = value;
        }
      });
    }
    
    // Typography
    if (themeData.typography) {
      if (themeData.typography.fonts) {
        config.theme.extend.fontFamily = {};
        Object.entries(themeData.typography.fonts).forEach(([key, value]) => {
          config.theme.extend.fontFamily[key] = [value];
        });
      }
      
      if (themeData.typography.sizes) {
        config.theme.extend.fontSize = {};
        Object.entries(themeData.typography.sizes).forEach(([key, value]) => {
          config.theme.extend.fontSize[key.replace('text-', '')] = value;
        });
      }
    }
    
    return `module.exports = ${JSON.stringify(config, null, 2)}`;
  };

  const generateJSONExport = () => {
    const themeConfig = {
      name: `${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Theme`,
      version: '1.0.0',
      generated: new Date().toISOString(),
      base: currentTheme,
      customizations: themeData
    };
    
    return JSON.stringify(themeConfig, null, 2);
  };

  const generateJSExport = () => {
    const themeConfig = {
      name: `${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Theme`,
      version: '1.0.0',
      generated: new Date().toISOString(),
      base: currentTheme,
      customizations: themeData
    };
    
    return `export const themeConfig = ${JSON.stringify(themeConfig, null, 2)};

export const applyTheme = (theme) => {
  const root = document.documentElement;
  
  // Apply colors
  if (theme.customizations.colors) {
    Object.entries(theme.customizations.colors).forEach(([key, value]) => {
      root.style.setProperty(\`--color-\${key}\`, value);
    });
  }
  
  // Apply typography
  if (theme.customizations.typography) {
    if (theme.customizations.typography.fonts) {
      Object.entries(theme.customizations.typography.fonts).forEach(([key, value]) => {
        root.style.setProperty(\`--font-\${key}\`, value);
      });
    }
    
    if (theme.customizations.typography.sizes) {
      Object.entries(theme.customizations.typography.sizes).forEach(([key, value]) => {
        root.style.setProperty(\`--\${key}\`, value);
      });
    }
    
    if (theme.customizations.typography.spacing) {
      Object.entries(theme.customizations.typography.spacing).forEach(([key, value]) => {
        root.style.setProperty(\`--\${key}\`, value);
      });
    }
  }
  
  // Apply component styles
  if (theme.customizations.components) {
    Object.entries(theme.customizations.components).forEach(([componentKey, componentValue]) => {
      if (typeof componentValue === 'object') {
        Object.entries(componentValue).forEach(([variantKey, variantValue]) => {
          if (typeof variantValue === 'object') {
            Object.entries(variantValue).forEach(([propKey, propValue]) => {
              root.style.setProperty(\`--\${componentKey}-\${variantKey}-\${propKey}\`, propValue);
            });
          }
        });
      }
    });
  }
};

export default themeConfig;`;
  };

  const getExportContent = () => {
    switch (exportFormat) {
      case 'css':
        return generateCSSExport();
      case 'tailwind':
        return generateTailwindExport();
      case 'json':
        return generateJSONExport();
      case 'js':
        return generateJSExport();
      default:
        return '';
    }
  };

  const getFileName = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    switch (exportFormat) {
      case 'css':
        return `theme-${currentTheme}-${timestamp}.css`;
      case 'tailwind':
        return `tailwind.config.js`;
      case 'json':
        return `theme-${currentTheme}-${timestamp}.json`;
      case 'js':
        return `theme-${currentTheme}-${timestamp}.js`;
      default:
        return 'theme-export.txt';
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getExportContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleDownload = () => {
    const content = getExportContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getFileName();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Export Theme Configuration
            </h2>
            <p className="text-sm text-text-secondary">
              Export your theme customizations in various formats
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Format Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Export Format</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => setExportFormat(format.id)}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      exportFormat === format.id
                        ? 'border-primary bg-primary-50 text-primary' :'border-border bg-card hover:border-accent'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{format.name}</span>
                    </div>
                    <div className="text-xs text-text-secondary">
                      {format.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-text-primary">Preview</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-3 py-1 bg-surface border border-border rounded text-sm hover:bg-accent transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-success" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg">
              <div className="px-3 py-2 border-b border-border bg-surface text-xs text-text-secondary">
                {getFileName()}
              </div>
              <pre className="p-4 text-xs text-text-primary overflow-auto max-h-96 scrollbar-thin">
                <code>{getExportContent()}</code>
              </pre>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-surface rounded-lg border border-border p-4">
            <h4 className="font-medium text-text-primary mb-2">Usage Instructions</h4>
            <div className="text-sm text-text-secondary space-y-1">
              {exportFormat === 'css' && (
                <>
                  <p>1. Save the CSS file in your project's styles directory</p>
                  <p>2. Import it in your main CSS file or add to your build process</p>
                  <p>3. The variables will be available globally as CSS custom properties</p>
                </>
              )}
              {exportFormat === 'tailwind' && (
                <>
                  <p>1. Replace or extend your existing tailwind.config.js file</p>
                  <p>2. Run your build process to generate the new utility classes</p>
                  <p>3. Use the custom colors and fonts in your Tailwind classes</p>
                </>
              )}
              {exportFormat === 'json' && (
                <>
                  <p>1. Save the JSON file in your project's configuration directory</p>
                  <p>2. Import and use it in your theme management system</p>
                  <p>3. Apply the customizations programmatically</p>
                </>
              )}
              {exportFormat === 'js' && (
                <>
                  <p>1. Save the JavaScript file in your project's theme directory</p>
                  <p>2. Import the theme configuration and applyTheme function</p>
                  <p>3. Call applyTheme(themeConfig) to apply the customizations</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;