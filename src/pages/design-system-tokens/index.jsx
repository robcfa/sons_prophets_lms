import React, { useState } from 'react';
import { Palette, Ruler, Type, Layers, Eye, Download, CheckCircle } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';
import ColorTokensTab from './components/ColorTokensTab';
import SpacingLayoutTab from './components/SpacingLayoutTab';
import TypographyTab from './components/TypographyTab';
import ComponentVariantsTab from './components/ComponentVariantsTab';
import LivePreview from './components/LivePreview';
import ExportPanel from './components/ExportPanel';
import AccessibilityAudit from './components/AccessibilityAudit';
import Icon from '../../components/AppIcon';


const DesignSystemTokens = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('colors');
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  const tabs = [
    { id: 'colors', label: 'Color Tokens', icon: Palette },
    { id: 'spacing', label: 'Spacing & Layout', icon: Ruler },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'components', label: 'Component Variants', icon: Layers },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'colors':
        return <ColorTokensTab />;
      case 'spacing':
        return <SpacingLayoutTab />;
      case 'typography':
        return <TypographyTab />;
      case 'components':
        return <ComponentVariantsTab />;
      default:
        return <ColorTokensTab />;
    }
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark reverent:bg-rev-bg transition-colors duration-200">
      {/* Header */}
      <header className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border-b border-divider dark:border-divider-dark reverent:border-rev-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Palette className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-xl font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
                Design System Tokens
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAudit(!showAudit)}
                className="flex items-center px-3 py-2 text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card hover:bg-primary hover:text-white transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Audit
              </button>
              
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center px-3 py-2 text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card hover:bg-primary hover:text-white transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              
              <button
                onClick={() => setShowExport(!showExport)}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-card transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface rounded-card border border-divider dark:border-divider-dark reverent:border-rev-border mb-6">
              <div className="flex border-b border-divider dark:border-divider-dark reverent:border-rev-border">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface hover:text-primary hover:border-primary/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Live Preview */}
            {showPreview && (
              <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface rounded-card border border-divider dark:border-divider-dark reverent:border-rev-border p-6">
                <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
                  Live Preview
                </h3>
                <LivePreview />
              </div>
            )}

            {/* Accessibility Audit */}
            {showAudit && (
              <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface rounded-card border border-divider dark:border-divider-dark reverent:border-rev-border p-6">
                <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
                  Accessibility Audit
                </h3>
                <AccessibilityAudit />
              </div>
            )}

            {/* Export Panel */}
            {showExport && (
              <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface rounded-card border border-divider dark:border-divider-dark reverent:border-rev-border p-6">
                <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
                  Export Options
                </h3>
                <ExportPanel />
              </div>
            )}

            {/* Theme Info */}
            <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface rounded-card border border-divider dark:border-divider-dark reverent:border-rev-border p-6">
              <h3 className="text-lg font-semibold text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface mb-4">
                Current Theme
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
                  Active: {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </span>
                <div className={`w-4 h-4 rounded-full ${
                  theme === 'light' ? 'bg-yellow-400' : 
                  theme === 'dark'? 'bg-blue-600' : 'bg-amber-600'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemTokens;