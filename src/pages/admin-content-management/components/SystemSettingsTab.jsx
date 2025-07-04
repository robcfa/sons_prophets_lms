import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SystemSettingsTab = () => {
  const [settings, setSettings] = useState({});
  const [activeSection, setActiveSection] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Mock system settings
    const mockSettings = {
      general: {
        siteName: 'Sons Prophets LMS',
        siteDescription: 'Theological Education Platform for Old Testament Prophecy',
        adminEmail: 'admin@sonsprophets.edu',
        timezone: 'America/New_York',
        language: 'en',
        maintenanceMode: false
      },
      authentication: {
        allowRegistration: true,
        requireEmailVerification: true,
        passwordMinLength: 8,
        sessionTimeout: 30,
        twoFactorAuth: false,
        socialLogin: {
          google: false,
          facebook: false,
          microsoft: true
        }
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        digestFrequency: 'weekly',
        notificationTypes: {
          courseUpdates: true,
          forumReplies: true,
          achievements: true,
          systemAlerts: true
        }
      },
      gamification: {
        xpSystem: true,
        badges: true,
        leaderboards: true,
        streaks: true,
        xpRates: {
          lessonCompletion: 50,
          quizCompletion: 100,
          forumPost: 25,
          forumReply: 15
        }
      },
      content: {
        autoSave: true,
        versionControl: true,
        contentModeration: true,
        aiAssistance: true,
        scormSupport: true,
        maxFileSize: 100,
        allowedFileTypes: ['pdf', 'doc', 'docx', 'mp4', 'mp3', 'jpg', 'png']
      },
      integrations: {
        aws: {
          enabled: true,
          region: 'us-east-1',
          bucket: 'sonsprophets-media'
        },
        analytics: {
          enabled: true,
          provider: 'google'
        },
        ai: {
          enabled: true,
          provider: 'openai',
          model: 'gpt-4'
        }
      }
    };
    setSettings(mockSettings);
  }, []);

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleNestedSettingChange = (section, parentKey, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentKey]: {
          ...prev[section][parentKey],
          [key]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setHasChanges(false);
  };

  const sections = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'authentication', label: 'Authentication', icon: 'Shield' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'gamification', label: 'Gamification', icon: 'Award' },
    { id: 'content', label: 'Content', icon: 'FileText' },
    { id: 'integrations', label: 'Integrations', icon: 'Plug' }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
          Site Name
        </label>
        <Input
          type="text"
          value={settings.general?.siteName || ''}
          onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
          placeholder="Enter site name"
        />
      </div>

      <div>
        <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
          Site Description
        </label>
        <textarea
          value={settings.general?.siteDescription || ''}
          onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
          placeholder="Enter site description"
          rows={3}
          className="w-full px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
          Admin Email
        </label>
        <Input
          type="email"
          value={settings.general?.adminEmail || ''}
          onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
          placeholder="admin@example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
            Timezone
          </label>
          <select
            value={settings.general?.timezone || ''}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="UTC">UTC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
            Default Language
          </label>
          <select
            value={settings.general?.language || ''}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="pt">Portuguese</option>
            <option value="ko">Korean</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-warning-50 border border-warning-200 rounded-lg">
        <div>
          <h4 className="font-body font-body-semibold text-warning-800">Maintenance Mode</h4>
          <p className="text-sm text-warning-700">
            Enable to temporarily disable access for maintenance
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.general?.maintenanceMode || false}
            onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
    </div>
  );

  const renderAuthenticationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
          <div>
            <h4 className="font-body font-body-semibold text-text-primary">Allow Registration</h4>
            <p className="text-sm text-text-secondary">
              Allow new users to register accounts
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.authentication?.allowRegistration || false}
              onChange={(e) => handleSettingChange('authentication', 'allowRegistration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
          <div>
            <h4 className="font-body font-body-semibold text-text-primary">Email Verification</h4>
            <p className="text-sm text-text-secondary">
              Require email verification for new accounts
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.authentication?.requireEmailVerification || false}
              onChange={(e) => handleSettingChange('authentication', 'requireEmailVerification', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
            Minimum Password Length
          </label>
          <Input
            type="number"
            value={settings.authentication?.passwordMinLength || 8}
            onChange={(e) => handleSettingChange('authentication', 'passwordMinLength', parseInt(e.target.value))}
            min="6"
            max="32"
          />
        </div>

        <div>
          <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
            Session Timeout (minutes)
          </label>
          <Input
            type="number"
            value={settings.authentication?.sessionTimeout || 30}
            onChange={(e) => handleSettingChange('authentication', 'sessionTimeout', parseInt(e.target.value))}
            min="5"
            max="1440"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-body font-body-semibold text-text-primary">Social Login</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(settings.authentication?.socialLogin || {}).map(([provider, enabled]) => (
            <div key={provider} className="flex items-center justify-between p-4 bg-surface rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name={provider === 'google' ? 'Chrome' : provider === 'facebook' ? 'Facebook' : 'Microsoft'} size={20} />
                <span className="font-body font-body-semibold text-text-primary capitalize">
                  {provider}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => handleNestedSettingChange('authentication', 'socialLogin', provider, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGamificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries({
          xpSystem: 'XP System',
          badges: 'Badges',
          leaderboards: 'Leaderboards',
          streaks: 'Learning Streaks'
        }).map(([key, label]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-surface rounded-lg">
            <div>
              <h4 className="font-body font-body-semibold text-text-primary">{label}</h4>
              <p className="text-sm text-text-secondary">
                Enable {label.toLowerCase()} feature
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.gamification?.[key] || false}
                onChange={(e) => handleSettingChange('gamification', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="font-body font-body-semibold text-text-primary">XP Rates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(settings.gamification?.xpRates || {}).map(([activity, xp]) => (
            <div key={activity}>
              <label className="block text-sm font-body font-body-semibold text-text-primary mb-2 capitalize">
                {activity.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <Input
                type="number"
                value={xp}
                onChange={(e) => handleNestedSettingChange('gamification', 'xpRates', activity, parseInt(e.target.value))}
                min="0"
                max="1000"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'authentication':
        return renderAuthenticationSettings();
      case 'gamification':
        return renderGamificationSettings();
      default:
        return (
          <div className="text-center py-12">
            <Icon name="Settings" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="font-heading font-heading-semibold text-text-primary mb-2">
              Settings Section
            </h3>
            <p className="text-text-secondary">
              This section is under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Settings Navigation */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-card border border-subtle rounded-lg p-4">
          <h3 className="font-heading font-heading-semibold text-text-primary mb-4">
            Settings
          </h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-color ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <Icon name={section.icon} size={16} />
                <span className="font-body">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1">
        <div className="bg-card border border-subtle rounded-lg">
          <div className="p-6 border-b border-subtle">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-heading-semibold text-text-primary text-xl">
                  {sections.find(s => s.id === activeSection)?.label} Settings
                </h2>
                <p className="text-text-secondary mt-1">
                  Configure your system {activeSection} settings
                </p>
              </div>
              
              {hasChanges && (
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={saving}
                  iconName={saving ? 'Loader2' : 'Save'}
                  className={saving ? 'animate-spin' : ''}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              )}
            </div>
          </div>

          <div className="p-6">
            {renderCurrentSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsTab;