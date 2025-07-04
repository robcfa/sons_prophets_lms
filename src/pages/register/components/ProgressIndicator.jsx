import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'Basic Info', icon: 'User' },
    { number: 2, label: 'Role Selection', icon: 'Users' },
    { number: 3, label: 'Profile Details', icon: 'FileText' }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-border z-0">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center relative z-10">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
              ${currentStep >= step.number 
                ? 'bg-primary border-primary text-white' 
                : currentStep === step.number - 1
                  ? 'bg-primary-50 border-primary text-primary animate-pulse-gentle' :'bg-background border-border text-text-muted'
              }
            `}>
              {currentStep > step.number ? (
                <Icon name="Check" size={20} />
              ) : (
                <Icon name={step.icon} size={20} />
              )}
            </div>
            <span className={`
              mt-2 text-xs font-caption text-center
              ${currentStep >= step.number ? 'text-primary font-semibold' : 'text-text-muted'}
            `}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;