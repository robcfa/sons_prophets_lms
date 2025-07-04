import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BasicInfoStep = ({ formData, onFormChange, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Very Weak', color: 'bg-error' },
      { strength: 2, label: 'Weak', color: 'bg-warning' },
      { strength: 3, label: 'Fair', color: 'bg-accent' },
      { strength: 4, label: 'Good', color: 'bg-success' },
      { strength: 5, label: 'Strong', color: 'bg-success' }
    ];

    return levels[score];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Create Your Account
        </h2>
        <p className="text-text-secondary font-body">
          Let's start with your basic information
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-body font-semibold text-text-primary mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => onFormChange('fullName', e.target.value)}
            className={errors.fullName ? 'border-error' : ''}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-error font-body flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-body font-semibold text-text-primary mb-2">
            Email Address *
          </label>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => onFormChange('email', e.target.value)}
            className={errors.email ? 'border-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error font-body flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-body font-semibold text-text-primary mb-2">
            Password *
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => onFormChange('password', e.target.value)}
              className={`pr-12 ${errors.password ? 'border-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-color"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 bg-border rounded-full h-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-caption text-text-muted">
                  {passwordStrength.label}
                </span>
              </div>
              <div className="text-xs text-text-muted font-body">
                Password should contain uppercase, lowercase, numbers, and special characters
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-sm text-error font-body flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-body font-semibold text-text-primary mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => onFormChange('confirmPassword', e.target.value)}
              className={`pr-12 ${errors.confirmPassword ? 'border-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-color"
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
            </button>
          </div>
          
          {/* Password Match Indicator */}
          {formData.confirmPassword && (
            <div className="mt-1 flex items-center">
              {formData.password === formData.confirmPassword ? (
                <div className="flex items-center text-success text-sm font-body">
                  <Icon name="Check" size={16} className="mr-1" />
                  Passwords match
                </div>
              ) : (
                <div className="flex items-center text-error text-sm font-body">
                  <Icon name="X" size={16} className="mr-1" />
                  Passwords don't match
                </div>
              )}
            </div>
          )}
          
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error font-body flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;