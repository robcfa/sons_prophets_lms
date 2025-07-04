import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ userEmail, userRole }) => {
  const getRoleSpecificMessage = (role) => {
    const messages = {
      learner: {
        title: 'Welcome to Your Learning Journey!',
        description: 'You\'re now registered as a Learner. Get ready to explore theological courses, engage with the community, and grow in your faith.',
        nextSteps: [
          'Check your email for the verification link',
          'Complete your email verification',
          'Explore the course catalog',
          'Join community discussions',
          'Start your first Bible study'
        ]
      },
      coach: {
        title: 'Welcome, Coach!',
        description: 'You\'re now registered as a Coach. You can guide learners, create content, and facilitate meaningful discussions.',
        nextSteps: [
          'Check your email for the verification link',
          'Complete your email verification',
          'Set up your coaching profile',
          'Review available mentoring tools',
          'Connect with learners in your area'
        ]
      },
      admin: {
        title: 'Welcome, Administrator!',
        description: 'You\'re now registered as an Admin. You have full access to manage the platform and create educational content.',
        nextSteps: [
          'Check your email for the verification link',
          'Complete your email verification',
          'Access the admin dashboard',
          'Review platform management tools',
          'Set up your first course with AI assistance'
        ]
      }
    };
    return messages[role] || messages.learner;
  };

  const roleMessage = getRoleSpecificMessage(userRole);

  return (
    <div className="text-center space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h2 className="text-3xl font-heading font-bold text-text-primary">
          Account Created Successfully!
        </h2>
        <h3 className="text-xl font-heading font-semibold text-primary">
          {roleMessage.title}
        </h3>
        <p className="text-text-secondary font-body max-w-md mx-auto">
          {roleMessage.description}
        </p>
      </div>

      {/* Email Verification Notice */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={24} className="text-accent flex-shrink-0 mt-1" />
          <div className="text-left">
            <h4 className="font-body font-semibold text-accent-700 mb-2">
              Verify Your Email Address
            </h4>
            <p className="text-sm text-accent-600 font-body mb-3">
              We've sent a verification email to:
            </p>
            <p className="text-sm font-data text-accent-800 bg-accent-100 px-3 py-2 rounded border">
              {userEmail}
            </p>
            <p className="text-sm text-accent-600 font-body mt-3">
              Please check your inbox and click the verification link to activate your account.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-surface border border-subtle rounded-lg p-6 max-w-md mx-auto">
        <h4 className="font-heading font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="List" size={20} className="mr-2 text-primary" />
          Next Steps
        </h4>
        <ul className="space-y-3 text-left">
          {roleMessage.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-data font-semibold text-primary">
                  {index + 1}
                </span>
              </div>
              <span className="text-sm font-body text-text-secondary">
                {step}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => {
              // Simulate opening email client
              window.location.href = `mailto:${userEmail}`;
            }}
            iconName="Mail"
            iconPosition="left"
          >
            Open Email
          </Button>
          <Link to="/login">
            <Button
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Go to Sign In
            </Button>
          </Link>
        </div>

        {/* Resend Email */}
        <div className="text-center">
          <p className="text-sm text-text-muted font-body mb-2">
            Didn't receive the email?
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Handle resend verification email
              alert('Verification email resent! Please check your inbox.');
            }}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Resend Verification Email
          </Button>
        </div>
      </div>

      {/* Help Section */}
      <div className="border-t border-subtle pt-6">
        <p className="text-sm text-text-muted font-body mb-3">
          Need help getting started?
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            variant="ghost"
            size="sm"
            iconName="HelpCircle"
            iconPosition="left"
          >
            View Help Center
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
  );
};

export default SuccessMessage;