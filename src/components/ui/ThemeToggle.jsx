import React from 'react';
import { Sun, Moon, Scroll } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

const ThemeToggle = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className={`theme-toggle-container ${className}`}>
      <select
        value={theme}
        onChange={handleThemeChange}
        className="bg-surface text-on-surface dark:bg-surface-dark dark:text-on-surface-dark reverent:bg-rev-surface reverent:text-rev-on-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        aria-label="Select theme"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="reverent">Reverent</option>
      </select>
      
      <div className="theme-icon ml-2">
        {theme === 'light' && <Sun className="w-4 h-4 text-on-surface" />}
        {theme === 'dark' && <Moon className="w-4 h-4 text-on-surface-dark" />}
        {theme === 'reverent' && <Scroll className="w-4 h-4 text-rev-on-surface" />}
      </div>
    </div>
  );
};

export default ThemeToggle;