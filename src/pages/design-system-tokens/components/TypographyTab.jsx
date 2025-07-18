import React, { useState } from 'react';
import { Type, Copy, Check } from 'lucide-react';

const TypographyTab = () => {
  const [copiedToken, setCopiedToken] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const fontFamilies = [
    { name: 'Heading', var: '--font-heading', value: 'Inter, sans-serif', usage: 'Headings and titles' },
    { name: 'Body', var: '--font-body', value: 'Roboto, sans-serif', usage: 'Body text and paragraphs' },
    { name: 'Caption', var: '--font-caption', value: 'Inter, sans-serif', usage: 'Captions and small text' },
    { name: 'Monospace', var: '--font-data', value: 'JetBrains Mono, monospace', usage: 'Code and data' },
  ];

  const fontSizes = [
    { name: 'H1', var: '--text-2xl', value: '2.5rem', lineHeight: '1.2', usage: 'Main headings' },
    { name: 'H2', var: '--text-xl', value: '2rem', lineHeight: '1.2', usage: 'Section headings' },
    { name: 'H3', var: '--text-lg', value: '1.5rem', lineHeight: '1.2', usage: 'Subsection headings' },
    { name: 'Body', var: '--text-base', value: '1rem', lineHeight: '1.5', usage: 'Body text' },
    { name: 'Small', var: '--text-sm', value: '0.875rem', lineHeight: '1.4', usage: 'Small text' },
    { name: 'XSmall', var: '--text-xs', value: '0.75rem', lineHeight: '1.3', usage: 'Captions' },
  ];

  const FontFamilyCard = ({ font }) => (
    <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
          {font.name}
        </h4>
        <button
          onClick={() => copyToClipboard(font.var)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          {copiedToken === font.var ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <Copy className="w-3 h-3 text-gray-500" />
          )}
        </button>
      </div>
      
      <div className="space-y-2">
        <div 
          className="text-2xl text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface"
          style={{ fontFamily: font.value }}
        >
          The quick brown fox jumps over the lazy dog
        </div>
        <div className="text-sm text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
          {font.value}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <code className="text-xs font-mono text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {font.var}
        </code>
      </div>
      
      <p className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
        {font.usage}
      </p>
    </div>
  );

  const FontSizeCard = ({ size }) => (
    <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
          {size.name}
        </h4>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
            {size.value}
          </span>
          <button
            onClick={() => copyToClipboard(size.var)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            {copiedToken === size.var ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3 text-gray-500" />
            )}
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div 
          className="text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface"
          style={{ 
            fontSize: size.value, 
            lineHeight: size.lineHeight,
            fontFamily: size.name.startsWith('H') ? 'Inter, sans-serif' : 'Roboto, sans-serif'
          }}
        >
          Sample text content
        </div>
        <div className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
          Line height: {size.lineHeight}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <code className="text-xs font-mono text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {size.var}
        </code>
      </div>
      
      <p className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
        {size.usage}
      </p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Typography Scale */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4 flex items-center">
          <Type className="w-5 h-5 mr-2" />
          Typography Scale
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {fontSizes.map((size, index) => (
            <FontSizeCard key={index} size={size} />
          ))}
        </div>
      </div>

      {/* Font Families */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
          Font Families
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {fontFamilies.map((font, index) => (
            <FontFamilyCard key={index} font={font} />
          ))}
        </div>
      </div>

      {/* Typography Examples */}
      <div>
        <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
          Typography in Context
        </h3>
        <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-6 space-y-4">
          <h1 className="text-2xl font-heading text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
            Main Heading (H1)
          </h1>
          <h2 className="text-xl font-heading text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
            Section Heading (H2)
          </h2>
          <h3 className="text-lg font-heading text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
            Subsection Heading (H3)
          </h3>
          <p className="text-base font-body text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
            This is body text using the default font family and size. It demonstrates how text appears in paragraphs and longer content blocks.
          </p>
          <p className="text-sm font-body text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
            This is smaller text, typically used for captions, labels, and secondary information.
          </p>
          <code className="text-sm font-mono text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            monospace code text
          </code>
        </div>
      </div>

      {/* Typography Guidelines */}
      <div className="bg-blue-50 dark:bg-blue-900/20 reverent:bg-amber-50 border border-blue-200 dark:border-blue-800 reverent:border-amber-200 rounded-card p-4">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 reverent:text-amber-900 mb-2">
          Typography Guidelines
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-300 reverent:text-amber-700 space-y-1">
          <li>• Use heading fonts for titles and section headers</li>
          <li>• Body font for all readable content</li>
          <li>• Maintain consistent line heights for readability</li>
          <li>• Use monospace for code and data display</li>
          <li>• Test typography across all three theme modes</li>
        </ul>
      </div>
    </div>
  );
};

export default TypographyTab;