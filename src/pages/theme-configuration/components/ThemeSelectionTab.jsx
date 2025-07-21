import React, { useState } from 'react';
import { Sun, Moon, Scroll, Check, Settings } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const ThemeSelectionTab = ({ onThemeChange, currentTheme }) => {
  const [userSwitchingEnabled, setUserSwitchingEnabled] = useState(true);
  const [defaultTheme, setDefaultTheme] = useState('light');

  const themes = [
    {
      id: 'light',
      name: 'Light Theme',
      description: 'Clean and bright interface perfect for daytime use',
      icon: Sun,
      preview: {
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#1a202c',
        primary: '#8b4513',
        accent: '#d69e2e'
      }
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      description: 'Comfortable low-light interface that reduces eye strain',
      icon: Moon,
      preview: {
        background: '#121212',
        surface: '#1e1e1e',
        text: '#f8f9fa',
        primary: '#d69e2e',
        accent: '#fbbf24'
      }
    },
    {
      id: 'reverent',
      name: 'Reverent Theme',
      description: 'Contemplative design with enhanced readability for spiritual study',
      icon: Scroll,
      preview: {
        background: '#f7f5f3',
        surface: '#fefefe',
        text: '#2d3748',
        primary: '#8b6914',
        accent: '#d4c5b0'
      }
    }
  ];

  const handleThemeSelect = (themeId) => {
    onThemeChange(themeId);
  };

  const handleDefaultThemeChange = (themeId) => {
    setDefaultTheme(themeId);
    // Store default theme preference
    localStorage.setItem('defaultTheme', themeId);
  };

  return (
    <div className="space-y-8">
      {/* Theme Cards */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Available Themes
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isActive = currentTheme === theme.id;
            
            return (
              <div
                key={theme.id}
                className={`relative rounded-lg border-2 cursor-pointer transition-all ${
                  isActive
                    ? 'border-primary bg-primary-50' :'border-border hover:border-accent bg-surface'
                }`}
                onClick={() => handleThemeSelect(theme.id)}
              >
                {/* Preview */}
                <div className="p-4">
                  <div
                    className="w-full h-32 rounded-md mb-4 relative overflow-hidden"
                    style={{ backgroundColor: theme.preview.background }}
                  >
                    {/* Mini UI Preview */}
                    <div
                      className="absolute top-2 left-2 right-2 h-6 rounded"
                      style={{ backgroundColor: theme.preview.surface }}
                    >
                      <div
                        className="absolute top-1 left-2 w-4 h-4 rounded"
                        style={{ backgroundColor: theme.preview.primary }}
                      />
                      <div
                        className="absolute top-1 right-2 w-8 h-4 rounded"
                        style={{ backgroundColor: theme.preview.accent }}
                      />
                    </div>
                    <div
                      className="absolute bottom-2 left-2 right-2 h-16 rounded"
                      style={{ backgroundColor: theme.preview.surface }}
                    >
                      <div
                        className="absolute top-2 left-2 w-20 h-2 rounded"
                        style={{ backgroundColor: theme.preview.text }}
                      />
                      <div
                        className="absolute top-5 left-2 w-16 h-2 rounded"
                        style={{ backgroundColor: theme.preview.text, opacity: 0.6 }}
                      />
                      <div
                        className="absolute bottom-2 right-2 w-12 h-6 rounded"
                        style={{ backgroundColor: theme.preview.primary }}
                      />
                    </div>
                  </div>

                  {/* Theme Info */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{theme.name}</h4>
                      <p className="text-sm text-text-secondary mt-1">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Theme Settings
        </h3>
        
        <div className="space-y-6">
          {/* Default Theme */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Default Theme
            </label>
            <select
              value={defaultTheme}
              onChange={(e) => handleDefaultThemeChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-text-secondary mt-1">
              This theme will be applied for new users by default
            </p>
          </div>

          {/* User Theme Switching */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={userSwitchingEnabled}
                onChange={(e) => setUserSwitchingEnabled(e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <div>
                <span className="text-sm font-medium text-text-primary">
                  Enable User Theme Switching
                </span>
                <p className="text-xs text-text-secondary">
                  Allow users to change their theme preference
                </p>
              </div>
            </label>
          </div>

          {/* System Theme Detection */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <div>
                <span className="text-sm font-medium text-text-primary">
                  Respect System Theme
                </span>
                <p className="text-xs text-text-secondary">
                  Automatically switch between light and dark themes based on system preference
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelectionTab;