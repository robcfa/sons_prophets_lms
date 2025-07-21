import React, { useState } from 'react';
import { Copy, Edit2, Palette, Grid3X3, CornerUpRight } from 'lucide-react';
import { useTheme } from '../../../lib/theme-context';

const TokenManagementTab = () => {
  const { theme } = useTheme();
  const [editingToken, setEditingToken] = useState(null);
  const [tokenValues, setTokenValues] = useState({});

  const tokenCategories = [
    {
      name: 'Spacing',
      icon: Grid3X3,
      tokens: [
        { name: '--spacing-1', value: '0.25rem', computed: '4px', usage: 'Icon padding, micro spacing' },
        { name: '--spacing-2', value: '0.5rem', computed: '8px', usage: 'Small gaps, button padding' },
        { name: '--spacing-3', value: '0.75rem', computed: '12px', usage: 'Input padding, small margins' },
        { name: '--spacing-4', value: '1rem', computed: '16px', usage: 'Standard spacing unit' },
        { name: '--spacing-6', value: '1.5rem', computed: '24px', usage: 'Card padding, section spacing' },
        { name: '--spacing-8', value: '2rem', computed: '32px', usage: 'Large gaps, component spacing' },
        { name: '--spacing-12', value: '3rem', computed: '48px', usage: 'Section dividers' },
        { name: '--spacing-16', value: '4rem', computed: '64px', usage: 'Page sections' },
      ]
    },
    {
      name: 'Border Radius',
      icon: CornerUpRight,
      tokens: [
        { name: '--radius-sm', value: '0.125rem', computed: '2px', usage: 'Small elements' },
        { name: '--radius-md', value: '0.25rem', computed: '4px', usage: 'Inputs, buttons' },
        { name: '--radius-lg', value: '0.5rem', computed: '8px', usage: 'Cards, modals' },
        { name: '--radius-xl', value: '0.75rem', computed: '12px', usage: 'Large components' },
        { name: '--radius-2xl', value: '1rem', computed: '16px', usage: 'Prominent elements' },
        { name: '--radius-full', value: '9999px', computed: '∞', usage: 'Circular elements' },
      ]
    },
    {
      name: 'Elevation',
      icon: Palette,
      tokens: [
        { name: '--elevation-1', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', computed: 'Subtle', usage: 'Inputs, flat cards' },
        { name: '--elevation-2', value: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', computed: 'Light', usage: 'Buttons, hover states' },
        { name: '--elevation-3', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', computed: 'Medium', usage: 'Dropdowns, tooltips' },
        { name: '--elevation-4', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', computed: 'High', usage: 'Modals, overlays' },
        { name: '--elevation-5', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', computed: 'Higher', usage: 'Prominent modals' },
        { name: '--elevation-6', value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', computed: 'Highest', usage: 'Full-screen overlays' },
      ]
    },
    {
      name: 'Colors',
      icon: Palette,
      tokens: [
        { name: '--color-primary', value: 'var(--light-primary)', computed: '#8B4513', usage: 'Primary actions, links' },
        { name: '--color-secondary', value: 'var(--light-secondary)', computed: '#2F4F4F', usage: 'Secondary actions' },
        { name: '--color-background', value: 'var(--light-background)', computed: '#FEFEFE', usage: 'Page background' },
        { name: '--color-surface', value: 'var(--light-surface)', computed: '#F8F6F3', usage: 'Card backgrounds' },
        { name: '--color-text-primary', value: 'var(--light-text-primary)', computed: '#2C2C2C', usage: 'Primary text' },
        { name: '--color-text-secondary', value: 'var(--light-text-secondary)', computed: '#6B6B6B', usage: 'Secondary text' },
      ]
    }
  ];

  const handleTokenEdit = (tokenName, newValue) => {
    setTokenValues(prev => ({ ...prev, [tokenName]: newValue }));
    document.documentElement.style.setProperty(tokenName, newValue);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const TokenPreview = ({ token }) => {
    const previewStyle = {};
    
    if (token.name.includes('spacing')) {
      previewStyle.width = token.computed;
      previewStyle.height = '16px';
      previewStyle.backgroundColor = 'var(--color-primary)';
    } else if (token.name.includes('radius')) {
      previewStyle.width = '32px';
      previewStyle.height = '32px';
      previewStyle.backgroundColor = 'var(--color-primary)';
      previewStyle.borderRadius = token.value;
    } else if (token.name.includes('elevation')) {
      previewStyle.width = '32px';
      previewStyle.height = '32px';
      previewStyle.backgroundColor = 'var(--color-surface-elevated)';
      previewStyle.boxShadow = token.value;
    } else if (token.name.includes('color')) {
      previewStyle.width = '32px';
      previewStyle.height = '32px';
      previewStyle.backgroundColor = token.value;
      previewStyle.border = '1px solid var(--color-border)';
    }

    return <div style={previewStyle} className="flex-shrink-0" />;
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-2">Token Management</h2>
        <p className="text-secondary">
          Complete CSS variable structure with 4px baseline grid system. Edit tokens for real-time preview.
        </p>
      </div>

      {tokenCategories.map((category) => (
        <div key={category.name} className="card">
          <div className="flex items-center gap-3 mb-4">
            <category.icon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-heading font-semibold text-primary">{category.name}</h3>
          </div>
          
          <div className="space-y-3">
            {category.tokens.map((token) => (
              <div key={token.name} className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-border">
                <TokenPreview token={token} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-data text-primary bg-surface-elevated px-2 py-1 rounded">
                      {token.name}
                    </code>
                    <button
                      onClick={() => copyToClipboard(token.name)}
                      className="p-1 text-secondary hover:text-primary transition-colors"
                      title="Copy token name"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <span>Value: {token.value}</span>
                    <span>•</span>
                    <span>Computed: {token.computed}</span>
                  </div>
                  
                  <p className="text-xs text-muted mt-1">{token.usage}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingToken(token.name)}
                    className="p-2 text-secondary hover:text-primary transition-colors focus-ring rounded"
                    title="Edit token"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Edit Token Modal */}
      {editingToken && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-elevated p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-heading font-semibold text-primary mb-4">
              Edit Token: {editingToken}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Token Value
                </label>
                <input
                  type="text"
                  className="input w-full"
                  defaultValue={tokenValues[editingToken] || ''}
                  onChange={(e) => handleTokenEdit(editingToken, e.target.value)}
                  placeholder="Enter new value"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingToken(null)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditingToken(null)}
                  className="btn btn-primary flex-1"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenManagementTab;