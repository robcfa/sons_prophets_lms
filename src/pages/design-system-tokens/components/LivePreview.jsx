import React from 'react';
import { Eye, Bell, User, Settings, Search } from 'lucide-react';

const LivePreview = () => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted mb-4">
        Preview of components using current theme tokens
      </div>
      
      {/* Mini Application Preview */}
      <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface dark:bg-surface-dark reverent:bg-rev-surface border-b border-divider dark:border-divider-dark reverent:border-rev-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-card flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
              Preview App
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-card">
              <Bell className="w-4 h-4 text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-card">
              <Settings className="w-4 h-4 text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Cards */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-3 shadow-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-card flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
                    User Profile
                  </h4>
                  <p className="text-sm text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
                    Manage your account settings
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-3 shadow-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
                    Settings
                  </h4>
                  <p className="text-sm text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
                    Configure preferences
                  </p>
                </div>
                <button className="px-3 py-1 bg-primary text-white rounded-card text-sm">
                  Open
                </button>
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-card hover:bg-primary-dark transition-colors">
              Primary
            </button>
            <button className="px-4 py-2 bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface rounded-card hover:bg-primary hover:text-white transition-colors">
              Secondary
            </button>
          </div>
        </div>
      </div>
      
      {/* Theme Adaptation Info */}
      <div className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted bg-gray-50 dark:bg-gray-800 reverent:bg-amber-50 p-3 rounded-card">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Live preview adapts automatically to theme changes</span>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;