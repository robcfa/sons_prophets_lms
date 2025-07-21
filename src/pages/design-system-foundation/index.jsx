import React, { useState } from 'react';
import { useTheme } from '../../lib/theme-context';
import GlobalHeader from '../../components/ui/GlobalHeader';
import TokenManagementTab from './components/TokenManagementTab';
import TypographySystemTab from './components/TypographySystemTab';
import ThemeConfigurationTab from './components/ThemeConfigurationTab';
import ComponentLibraryTab from './components/ComponentLibraryTab';
import ExportPanel from './components/ExportPanel';
import AccessibilityControls from './components/AccessibilityControls';

const DesignSystemFoundation = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('tokens');
  const [sanctuaryMode, setSanctuaryMode] = useState(false);
  const [fontSize, setFontSize] = useState('base');
  const [lineHeight, setLineHeight] = useState('normal');

  const tabs = [
    { id: 'tokens', label: 'Token Management' },
    { id: 'typography', label: 'Typography System' },
    { id: 'themes', label: 'Theme Configuration' },
    { id: 'components', label: 'Component Library' },
  ];

  const handleSanctuaryModeToggle = () => {
    setSanctuaryMode(!sanctuaryMode);
    document.documentElement.classList.toggle('sanctuary-mode', !sanctuaryMode);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    document.documentElement.style.setProperty('--text-base', 
      size === 'small' ? '0.875rem' : 
      size === 'large' ? '1.125rem' : '1rem'
    );
  };

  const handleLineHeightChange = (height) => {
    setLineHeight(height);
    document.documentElement.style.setProperty('--leading-normal', 
      height === 'tight' ? '1.25' : 
      height === 'relaxed' ? '1.75' : 
      height === 'loose' ? '2' : '1.5'
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Design System Foundation
          </h1>
          <p className="text-lg text-secondary max-w-4xl">
            Comprehensive control over the platform's core visual architecture through a token-first approach. 
            Manage spacing, typography, colors, and components with real-time preview capabilities.
          </p>
        </div>

        {/* Accessibility Controls */}
        <AccessibilityControls
          sanctuaryMode={sanctuaryMode}
          onSanctuaryModeToggle={handleSanctuaryModeToggle}
          fontSize={fontSize}
          onFontSizeChange={handleFontSizeChange}
          lineHeight={lineHeight}
          onLineHeightChange={handleLineHeightChange}
        />

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-divider">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm focus-ring transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-secondary hover:text-primary hover:border-border'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === 'tokens' && <TokenManagementTab />}
            {activeTab === 'typography' && <TypographySystemTab />}
            {activeTab === 'themes' && <ThemeConfigurationTab />}
            {activeTab === 'components' && <ComponentLibraryTab />}
          </div>

          {/* Export Panel */}
          <div className="lg:col-span-1">
            <ExportPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemFoundation;