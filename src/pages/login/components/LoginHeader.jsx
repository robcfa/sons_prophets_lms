import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-contemplative">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-soft-md">
            <Icon name="BookOpen" size={28} color="white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-heading-semibold text-primary">
              Sons Prophets
            </h1>
            <p className="text-sm font-caption text-text-secondary -mt-1">
              Learning Management System
            </p>
          </div>
        </Link>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-heading-semibold text-text-primary">
          Welcome Back
        </h2>
        <p className="text-text-secondary font-body">
          Sign in to continue your theological education journey
        </p>
      </div>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
        <div className="flex flex-col items-center space-y-2 p-3 bg-primary-50 rounded-lg">
          <Icon name="BookOpen" size={20} className="text-primary" />
          <span className="text-xs font-caption text-primary-700 text-center">
            Interactive Courses
          </span>
        </div>
        <div className="flex flex-col items-center space-y-2 p-3 bg-secondary-50 rounded-lg">
          <Icon name="Users" size={20} className="text-secondary" />
          <span className="text-xs font-caption text-secondary-700 text-center">
            Community Learning
          </span>
        </div>
        <div className="flex flex-col items-center space-y-2 p-3 bg-accent-50 rounded-lg">
          <Icon name="Award" size={20} className="text-accent" />
          <span className="text-xs font-caption text-accent-700 text-center">
            Earn Achievements
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;