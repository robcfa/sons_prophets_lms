import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user roles
  const mockCredentials = {
    learner: { email: 'learner@sonsprophets.com', password: 'learner123' },
    coach: { email: 'coach@sonsprophets.com', password: 'coach123' },
    admin: { email: 'admin@sonsprophets.com', password: 'admin123' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials and determine user role
      let userRole = null;
      let isValidCredentials = false;

      Object.entries(mockCredentials).forEach(([role, credentials]) => {
        if (formData.email === credentials.email && formData.password === credentials.password) {
          userRole = role;
          isValidCredentials = true;
        }
      });

      if (isValidCredentials) {
        // Store user session (in real app, this would be handled by auth context)
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('isAuthenticated', 'true');
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Navigate to appropriate dashboard based on role
        switch (userRole) {
          case 'learner': navigate('/learner-dashboard');
            break;
          case 'coach': navigate('/coach-dashboard');
            break;
          case 'admin': navigate('/admin-content-management');
            break;
          default:
            navigate('/learner-dashboard');
        }
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred during login. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In real app, this would open forgot password modal or navigate to reset page
    alert('Forgot password functionality would be implemented here');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error Message */}
      {errors.general && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm font-body text-error">{errors.general}</p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-body font-body-semibold text-text-primary">
          Email Address
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isLoading}
          className={`w-full ${errors.email ? 'border-error focus:ring-error' : ''}`}
        />
        {errors.email && (
          <p className="text-sm text-error font-body flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-body font-body-semibold text-text-primary">
          Password
        </label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          disabled={isLoading}
          className={`w-full ${errors.password ? 'border-error focus:ring-error' : ''}`}
        />
        {errors.password && (
          <p className="text-sm text-error font-body flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-4 h-4"
          />
          <span className="text-sm font-body text-text-secondary">Remember me</span>
        </label>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm font-body text-primary hover:text-primary-600 transition-color"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      {/* Sign In Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading}
        loading={isLoading}
        iconName={isLoading ? "Loader2" : "LogIn"}
        iconPosition="left"
        className="mt-6"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      {/* Mock Credentials Helper */}
      <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
        <p className="text-xs font-caption text-accent-700 mb-2 font-body-semibold">Demo Credentials:</p>
        <div className="space-y-1 text-xs font-data">
          <p className="text-accent-600">Learner: learner@sonsprophets.com / learner123</p>
          <p className="text-accent-600">Coach: coach@sonsprophets.com / coach123</p>
          <p className="text-accent-600">Admin: admin@sonsprophets.com / admin123</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;