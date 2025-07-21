import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import BasicInfoStep from './components/BasicInfoStep';
import RoleSelectionStep from './components/RoleSelectionStep';
import ProfileDetailsStep from './components/ProfileDetailsStep';
import ProgressIndicator from './components/ProgressIndicator';
import SuccessMessage from './components/SuccessMessage';
import TermsAndPrivacy from './components/TermsAndPrivacy';

const RegisterPage = () => {
  const { signUp, loading, authError } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Information', component: BasicInfoStep },
    { id: 2, title: 'Role Selection', component: RoleSelectionStep },
    { id: 3, title: 'Profile Details', component: ProfileDetailsStep },
    { id: 4, title: 'Terms & Privacy', component: TermsAndPrivacy },
  ];

  const handleNext = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - submit registration
      handleSubmitRegistration({ ...formData, ...stepData });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitRegistration = async (data) => {
    try {
      const { confirmPassword, termsAccepted, privacyAccepted, ...registrationData } = data;
      
      // Prepare user data for registration
      const userData = {
        full_name: registrationData.fullName,
        role: registrationData.role,
        plan: registrationData.plan || 'free',
        phone: registrationData.phone,
        location: registrationData.location,
        ministry_focus: registrationData.ministryFocus,
        spiritual_gifts: registrationData.spiritualGifts,
        years_experience: registrationData.yearsExperience,
        is_available_for_coaching: registrationData.isAvailableForCoaching,
        coaching_rate: registrationData.coachingRate,
        bio: registrationData.bio,
        coaching_bio: registrationData.coachingBio,
      };

      const result = await signUp(registrationData.email, registrationData.password, userData);

      if (result.success) {
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const getCurrentStepComponent = () => {
    const step = steps.find(s => s.id === currentStep);
    if (!step) return null;

    const Component = step.component;
    return (
      <Component
        onNext={handleNext}
        onBack={handleBack}
        initialData={formData}
        isLastStep={currentStep === steps.length}
      />
    );
  };

  if (registrationSuccess) {
    return <SuccessMessage />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-text-secondary hover:text-text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Join Sons of Prophets</h1>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />

        {/* Registration Form */}
        <div className="bg-surface rounded-lg shadow-lg p-8">
          {getCurrentStepComponent()}
        </div>

        {/* Navigation Buttons */}
        {currentStep > 1 && (
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 border border-border rounded-lg text-sm font-medium text-text-primary bg-surface hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
        )}

        {/* Already have account link */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;