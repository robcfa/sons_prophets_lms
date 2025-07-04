import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      {/* Create Account Section */}
      <div className="text-center p-6 bg-surface rounded-lg border border-subtle">
        <p className="text-text-secondary font-body mb-4">
          Don't have an account yet?
        </p>
        <Link to="/register">
          <Button
            variant="outline"
            size="md"
            fullWidth
            iconName="UserPlus"
            iconPosition="left"
          >
            Create New Account
          </Button>
        </Link>
      </div>

      {/* Help & Support */}
      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-6">
          <button className="flex items-center space-x-1 text-sm font-body text-text-secondary hover:text-primary transition-color">
            <Icon name="HelpCircle" size={16} />
            <span>Help Center</span>
          </button>
          <button className="flex items-center space-x-1 text-sm font-body text-text-secondary hover:text-primary transition-color">
            <Icon name="MessageCircle" size={16} />
            <span>Contact Support</span>
          </button>
        </div>

        {/* System Status */}
        <div className="flex items-center justify-center space-x-2 text-xs font-caption text-text-muted">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle"></div>
          <span>All systems operational</span>
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-center space-y-3 pt-4 border-t border-subtle">
        <div className="flex justify-center space-x-4 text-xs font-caption text-text-muted">
          <button className="hover:text-primary transition-color">
            Terms of Service
          </button>
          <span>•</span>
          <button className="hover:text-primary transition-color">
            Privacy Policy
          </button>
          <span>•</span>
          <button className="hover:text-primary transition-color">
            Accessibility
          </button>
        </div>
        
        <p className="text-xs font-caption text-text-muted">
          © {currentYear} Sons Prophets LMS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;