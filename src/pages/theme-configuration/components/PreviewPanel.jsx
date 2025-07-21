import React, { useState } from 'react';
import { X, Monitor, Smartphone, Tablet, RefreshCw } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const PreviewPanel = ({ theme, customThemeData, onClose }) => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [previewTheme, setPreviewTheme] = useState(theme);

  const previewModes = [
    { id: 'desktop', name: 'Desktop', icon: Monitor, width: 'w-full', height: 'h-96' },
    { id: 'tablet', name: 'Tablet', icon: Tablet, width: 'w-80', height: 'h-96' },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, width: 'w-64', height: 'h-96' }
  ];

  const handleThemePreview = (newTheme) => {
    setPreviewTheme(newTheme);
  };

  const renderPreviewContent = () => (
    <div className={`preview-content ${previewTheme} min-h-full`}>
      {/* Header */}
      <div className="bg-surface border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded"></div>
            <h1 className="text-lg font-heading font-semibold text-text-primary">
              Preview App
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 bg-accent rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded"></div>
            </button>
            <button className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-heading font-semibold text-text-primary mb-2">Sample Card</h3>
            <p className="text-text-secondary text-sm mb-3">
              This is a preview of how cards will appear with the current theme settings.
            </p>
            <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">
              Action
            </button>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-heading font-semibold text-text-primary mb-2">Another Card</h3>
            <p className="text-text-secondary text-sm mb-3">
              Cards showcase your color scheme and typography choices.
            </p>
            <button className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm">
              Secondary
            </button>
          </div>
        </div>

        {/* Form Elements */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-text-primary mb-4">Form Elements</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Sample Input
              </label>
              <input
                type="text"
                placeholder="Enter some text..."
                className="w-full px-3 py-2 border border-border rounded bg-input text-text-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Select Option
              </label>
              <select className="w-full px-3 py-2 border border-border rounded bg-input text-text-primary">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-primary border-border rounded" />
                <span className="text-sm text-text-primary">Checkbox option</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input type="radio" name="radio" className="w-4 h-4 text-primary border-border" />
                <span className="text-sm text-text-primary">Radio option</span>
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-text-primary mb-4">Button Variations</h3>
          <div className="flex flex-wrap gap-2">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm">
              Primary
            </button>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded text-sm">
              Secondary
            </button>
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded text-sm">
              Accent
            </button>
            <button className="border border-border text-text-primary px-4 py-2 rounded text-sm">
              Outline
            </button>
            <button className="text-text-primary px-4 py-2 rounded text-sm hover:bg-surface">
              Ghost
            </button>
          </div>
        </div>

        {/* Typography */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-text-primary mb-4">Typography Scale</h3>
          <div className="space-y-2">
            <h1 className="text-2xl font-heading text-text-primary">Heading 1</h1>
            <h2 className="text-xl font-heading text-text-primary">Heading 2</h2>
            <h3 className="text-lg font-heading text-text-primary">Heading 3</h3>
            <p className="text-base text-text-primary">
              Body text with normal weight and size for comfortable reading.
            </p>
            <p className="text-sm text-text-secondary">
              Secondary text that's slightly smaller and muted.
            </p>
            <p className="text-xs text-text-muted">
              Small text for captions and less important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg sticky top-8">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium text-text-primary">Live Preview</h3>
        <button
          onClick={onClose}
          className="p-1 text-text-secondary hover:text-text-primary"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Preview Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {previewModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setPreviewMode(mode.id)}
                  className={`p-2 rounded border transition-colors ${
                    previewMode === mode.id
                      ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-accent'
                  }`}
                  title={mode.name}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handleThemePreview(theme)}
            className="p-2 text-text-secondary hover:text-text-primary"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Preview:</span>
          <select
            value={previewTheme}
            onChange={(e) => handleThemePreview(e.target.value)}
            className="px-2 py-1 border border-border rounded bg-input text-text-primary text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="reverent">Reverent</option>
          </select>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4">
        <div className={`bg-background border border-border rounded-lg overflow-hidden ${
          previewModes.find(m => m.id === previewMode)?.width
        } ${previewModes.find(m => m.id === previewMode)?.height} mx-auto`}>
          <div className="w-full h-full overflow-y-auto">
            {renderPreviewContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;