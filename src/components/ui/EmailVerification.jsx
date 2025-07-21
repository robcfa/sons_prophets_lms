import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { sendWelcomeEmail } from '../../utils/emailService';

const EmailVerification = () => {
  const { verifyEmail, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const verificationToken = searchParams.get('token');
    if (verificationToken) {
      setToken(verificationToken);
      handleVerification(verificationToken);
    } else {
      setVerificationStatus('error');
      setErrorMessage('Invalid verification link. Please check your email for the correct link.');
    }
  }, [searchParams]);

  const handleVerification = async (verificationToken) => {
    try {
      const result = await verifyEmail(verificationToken);
      
      if (result.success) {
        setVerificationStatus('success');
        
        // Send welcome email
        await sendWelcomeEmail(
          result.data.email,
          result.data.email.split('@')[0]
        );
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setVerificationStatus('error');
        setErrorMessage(result.error || 'Email verification failed. Please try again.');
      }
    } catch (error) {
      setVerificationStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  const getStatusContent = () => {
    switch (verificationStatus) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Verifying your email...</h2>
            <p className="mt-2 text-text-secondary">
              Please wait while we verify your email address.
            </p>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Email verified successfully!</h2>
            <p className="mt-2 text-text-secondary">
              Your email has been verified. You can now access your account.
            </p>
            <div className="mt-4 text-sm text-text-secondary">
              You will be redirected to the login page in a few seconds...
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Verification failed</h2>
            <p className="mt-2 text-text-secondary">
              {errorMessage}
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getActionButtons = () => {
    switch (verificationStatus) {
      case 'success':
        return (
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in now
            </Link>
          </div>
        );
      
      case 'error':
        return (
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-4">
                Need help? Try these options:
              </p>
              
              <div className="space-y-2">
                <Link
                  to="/register"
                  className="block w-full px-4 py-2 border border-primary rounded-lg text-sm font-medium text-primary bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Create a new account
                </Link>
                
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {getStatusContent()}

        <div className="bg-surface rounded-lg shadow-lg p-8">
          {getActionButtons()}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-xs text-text-secondary">
            Having trouble? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;