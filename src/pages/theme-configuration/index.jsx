import React, { useState, useEffect } from 'react';
import { useTheme } from '../../lib/theme-context';
import { Settings, Palette, Type, Layers, Download, Eye, RotateCcw, Database } from 'lucide-react';
import { checkConnection } from '../../utils/database';
import ThemeSelectionTab from './components/ThemeSelectionTab';
import ColorCustomizationTab from './components/ColorCustomizationTab';
import TypographySettingsTab from './components/TypographySettingsTab';
import ComponentStylingTab from './components/ComponentStylingTab';
import PreviewPanel from './components/PreviewPanel';
import ExportModal from './components/ExportModal';
import Icon from '../../components/AppIcon';

const ThemeConfiguration = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('theme-selection');
  const [showPreview, setShowPreview] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [dbStatus, setDbStatus] = useState('checking');
  const [customThemeData, setCustomThemeData] = useState({
    colors: {},
    typography: {},
    components: {}
  });

  useEffect(() => {
    // Check database connection on component mount
    const checkDatabaseStatus = async () => {
      try {
        const isConnected = await checkConnection();
        setDbStatus(isConnected ? 'connected' : 'disconnected');
      } catch (error) {
        setDbStatus('error');
      }
    };

    checkDatabaseStatus();
  }, []);

  const tabs = [
    { id: 'theme-selection', label: 'Theme Selection', icon: Settings },
    { id: 'color-customization', label: 'Color Customization', icon: Palette },
    { id: 'typography', label: 'Typography Settings', icon: Type },
    { id: 'component-styling', label: 'Component Styling', icon: Layers }
  ];

  const handleThemeDataChange = (section, data) => {
    setCustomThemeData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleResetTheme = () => {
    setCustomThemeData({
      colors: {},
      typography: {},
      components: {}
    });
    // Reset CSS variables to default
    const root = document.documentElement;
    const defaultStyles = getComputedStyle(root);
    // Reset logic would go here
  };

  const handleExportTheme = () => {
    setShowExportModal(true);
  };

  const getDatabaseStatusColor = () => {
    switch (dbStatus) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-red-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getDatabaseStatusText = () => {
    switch (dbStatus) {
      case 'connected':
        return 'Neon Database Connected';
      case 'disconnected':
        return 'Database Disconnected';
      case 'error':
        return 'Database Error';
      default:
        return 'Checking Database...';
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'theme-selection':
        return <ThemeSelectionTab onThemeChange={setTheme} currentTheme={theme} />;
      case 'color-customization':
        return (
          <ColorCustomizationTab
            currentTheme={theme}
            customColors={customThemeData.colors}
            onColorChange={(colors) => handleThemeDataChange('colors', colors)}
          />
        );
      case 'typography':
        return (
          <TypographySettingsTab
            currentTheme={theme}
            customTypography={customThemeData.typography}
            onTypographyChange={(typography) => handleThemeDataChange('typography', typography)}
          />
        );
      case 'component-styling':
        return (
          <ComponentStylingTab
            currentTheme={theme}
            customComponents={customThemeData.components}
            onComponentChange={(components) => handleThemeDataChange('components', components)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Settings className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-heading font-semibold text-text-primary">
                Theme Configuration
              </h1>
              {/* Database Status Indicator */}
              <div className="flex items-center space-x-2 text-sm">
                <Database className={`w-4 h-4 ${getDatabaseStatusColor()}`} />
                <span className={getDatabaseStatusColor()}>
                  {getDatabaseStatusText()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`inline-flex items-center px-3 py-2 border border-border rounded-md text-sm font-medium transition-colors ${
                  showPreview
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-text-primary hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={handleResetTheme}
                className="inline-flex items-center px-3 py-2 border border-border rounded-md text-sm font-medium bg-surface text-text-primary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
              <button
                onClick={handleExportTheme}
                className="inline-flex items-center px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className={`flex-1 ${showPreview ? 'pr-8' : ''}`}>
            {/* Database Connection Notice */}
            {dbStatus === 'connected' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Database className="w-5 h-5 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Successfully connected to Neon Database
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      Theme configurations will be saved to your production database
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="bg-surface rounded-lg border border-border mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {renderActiveTab()}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="w-96 flex-shrink-0">
              <PreviewPanel
                theme={theme}
                customThemeData={customThemeData}
                onClose={() => setShowPreview(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          themeData={customThemeData}
          currentTheme={theme}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

export default ThemeConfiguration;