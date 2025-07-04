import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProgressIndicator from './components/ProgressIndicator';
import BasicInfoStep from './components/BasicInfoStep';
import RoleSelectionStep from './components/RoleSelectionStep';
import ProfileDetailsStep from './components/ProfileDetailsStep';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import SuccessMessage from './components/SuccessMessage';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Role Selection
    role: '',
    
    // Step 3: Profile Details
    educationLevel: '',
    theologicalInterests: [],
    learningPace: '',
    bio: '',
    
    // Terms and Privacy
    acceptTerms: false,
    acceptPrivacy: false,
    acceptEmails: false
  });

  const totalSteps = 3;

  useEffect(() => {
    // Clear errors when form data changes
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  }, [formData]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        
        if (!formData.email.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long';
        }
        
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 2:
        if (!formData.role) {
          newErrors.role = 'Please select your role';
        }
        break;

      case 3:
        if (!formData.educationLevel) {
          newErrors.educationLevel = 'Please select your education level';
        }
        
        if (!formData.theologicalInterests || formData.theologicalInterests.length < 2) {
          newErrors.theologicalInterests = 'Please select at least 2 theological interests';
        }
        
        if (!formData.learningPace) {
          newErrors.learningPace = 'Please select your preferred learning pace';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTermsAndPrivacy = () => {
    const newErrors = {};
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the Terms of Service to continue';
    }
    
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'You must accept the Privacy Policy to continue';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep) || !validateTermsAndPrivacy()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      console.log('Registration data:', formData);
      setRegistrationComplete(true);
      
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.password && formData.confirmPassword;
      case 2:
        return formData.role;
      case 3:
        return formData.educationLevel && formData.theologicalInterests.length >= 2 && formData.learningPace;
      default:
        return false;
    }
  };

  const canProceed = isStepComplete(currentStep);
  const canSubmit = canProceed && formData.acceptTerms && formData.acceptPrivacy;

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <SuccessMessage 
            userEmail={formData.email}
            userRole={formData.role}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/login" className="inline-flex items-center space-x-3 hover:opacity-80 transition-contemplative mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-soft-sm">
              <Icon name="BookOpen" size={28} color="white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-primary">
                Sons Prophets
              </h1>
              <p className="text-sm font-caption text-text-secondary -mt-1">
                Learning Management System
              </p>
            </div>
          </Link>
        </div>

        {/* Registration Form */}
        <div className="bg-card rounded-lg shadow-soft-lg border border-subtle p-6 md:p-8">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step Content */}
            {currentStep === 1 && (
              <BasicInfoStep
                formData={formData}
                onFormChange={handleFormChange}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <RoleSelectionStep
                formData={formData}
                onFormChange={handleFormChange}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <ProfileDetailsStep
                formData={formData}
                onFormChange={handleFormChange}
                errors={errors}
              />
            )}

            {/* Terms and Privacy (shown on last step) */}
            {currentStep === totalSteps && (
              <div className="border-t border-subtle pt-6">
                <TermsAndPrivacy
                  formData={formData}
                  onFormChange={handleFormChange}
                  errors={errors}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  className="sm:w-auto"
                >
                  Previous
                </Button>
              )}

              <div className="flex-1" />

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canProceed}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="sm:w-auto"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!canSubmit || isSubmitting}
                  loading={isSubmitting}
                  iconName="UserPlus"
                  iconPosition="left"
                  className="sm:w-auto"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
                  <p className="text-sm text-error font-body">
                    {errors.submit}
                  </p>
                </div>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-subtle text-center">
            <p className="text-sm text-text-secondary font-body">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary-600 font-semibold transition-color"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-text-muted font-body mb-2">
            Need help with registration?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              iconPosition="left"
            >
              Registration Help
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;