import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would handle OAuth flow
      alert(`${provider} login would be implemented here with OAuth flow`);
    } catch (error) {
      console.error(`${provider} login error:`, error);
      alert(`${provider} login failed. Please try again.`);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome', // Using Chrome as closest to Google icon
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-muted font-body">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.name}
            variant="outline"
            size="md"
            onClick={() => handleSocialLogin(provider.name)}
            disabled={loadingProvider !== null}
            loading={loadingProvider === provider.name}
            className={`
              border-2 ${provider.borderColor} ${provider.bgColor} 
              transition-all duration-200 hover:shadow-soft-sm
              ${loadingProvider === provider.name ? 'opacity-75' : ''}
            `}
          >
            <div className="flex items-center justify-center space-x-2">
              {loadingProvider === provider.name ? (
                <Icon name="Loader2" size={18} className="animate-spin" />
              ) : (
                <Icon name={provider.icon} size={18} className={provider.color} />
              )}
              <span className="font-body text-text-primary">
                {loadingProvider === provider.name ? 'Connecting...' : provider.name}
              </span>
            </div>
          </Button>
        ))}
      </div>

      {/* Social Login Info */}
      <div className="text-center">
        <p className="text-xs font-caption text-text-muted">
          By signing in with social accounts, you agree to our{' '}
          <button className="text-primary hover:text-primary-600 underline transition-color">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary-600 underline transition-color">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;