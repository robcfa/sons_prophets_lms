import React from 'react';
import Icon from '../../../components/AppIcon';

const TermsAndPrivacy = ({ formData, onFormChange, errors }) => {
  return (
    <div className="space-y-4">
      {/* Terms of Service */}
      <div
        onClick={() => onFormChange('acceptTerms', !formData.acceptTerms)}
        className={`
          flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
          ${formData.acceptTerms 
            ? 'border-primary bg-primary-50' :'border-border bg-background hover:border-primary hover:bg-primary-50'
          }
        `}
      >
        <div className={`
          w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0
          ${formData.acceptTerms ? 'border-primary bg-primary' : 'border-border'}
        `}>
          {formData.acceptTerms && <Icon name="Check" size={14} color="white" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-body text-text-primary">
            I agree to the{' '}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                // Handle terms modal opening
              }}
              className="text-primary hover:text-primary-600 underline font-semibold"
            >
              Terms of Service
            </button>
            {' '}and understand the platform's usage guidelines and community standards.
          </p>
        </div>
      </div>

      {/* Privacy Policy */}
      <div
        onClick={() => onFormChange('acceptPrivacy', !formData.acceptPrivacy)}
        className={`
          flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
          ${formData.acceptPrivacy 
            ? 'border-primary bg-primary-50' :'border-border bg-background hover:border-primary hover:bg-primary-50'
          }
        `}
      >
        <div className={`
          w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0
          ${formData.acceptPrivacy ? 'border-primary bg-primary' : 'border-border'}
        `}>
          {formData.acceptPrivacy && <Icon name="Check" size={14} color="white" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-body text-text-primary">
            I acknowledge that I have read and agree to the{' '}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                // Handle privacy modal opening
              }}
              className="text-primary hover:text-primary-600 underline font-semibold"
            >
              Privacy Policy
            </button>
            {' '}and consent to the collection and use of my data as described.
          </p>
        </div>
      </div>

      {/* Email Communications */}
      <div
        onClick={() => onFormChange('acceptEmails', !formData.acceptEmails)}
        className={`
          flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
          ${formData.acceptEmails 
            ? 'border-primary bg-primary-50' :'border-border bg-background hover:border-primary hover:bg-primary-50'
          }
        `}
      >
        <div className={`
          w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0
          ${formData.acceptEmails ? 'border-primary bg-primary' : 'border-border'}
        `}>
          {formData.acceptEmails && <Icon name="Check" size={14} color="white" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-body text-text-primary">
            I would like to receive educational updates, course announcements, and community highlights via email.
          </p>
          <p className="text-xs text-text-muted font-caption mt-1">
            You can unsubscribe at any time from your account settings.
          </p>
        </div>
      </div>

      {/* Error Messages */}
      {(errors.acceptTerms || errors.acceptPrivacy) && (
        <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <div className="text-sm text-error font-body">
              {errors.acceptTerms && <p>{errors.acceptTerms}</p>}
              {errors.acceptPrivacy && <p>{errors.acceptPrivacy}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsAndPrivacy;