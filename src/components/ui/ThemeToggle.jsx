import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(shouldUseDark);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', shouldUseDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update DaisyUI theme
    document.documentElement.setAttribute('data-theme', 
      newTheme === 'dark' ? 'sons-prophets-dark' : 'sons-prophets-light'
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        bg-card border border-default
        hover:bg-accent hover:border-accent
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${className}
      `}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`
            absolute inset-0 w-5 h-5 text-current
            transition-all duration-300 ease-in-out
            ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `}
        />
        <Moon 
          className={`
            absolute inset-0 w-5 h-5 text-current
            transition-all duration-300 ease-in-out
            ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;