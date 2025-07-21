import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword = () => {
  const { resetPasswordWithToken, loading, authError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [token, setToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm();

  const password = watch('password');

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
    } else {
      // No token provided, redirect to forgot password
      navigate('/forgot-password');
    }
  }, [searchParams, navigate]);

  const onSubmit = async (data) => {
    try {
      if (!token) {
        setError('root', { message: 'Invalid reset token. Please request a new password reset.' });
        return;
      }

      // Validate password confirmation
      if (data.password !== data.confirmPassword) {
        setError('confirmPassword', { message: 'Passwords do not match' });
        return;
      }

      const result = await resetPasswordWithToken(token, data.password);
      
      if (result.success) {
        setResetSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError('root', { message: result.error });
      }
    } catch (error) {
      setError('root', { message: 'An unexpected error occurred. Please try again.' });
    }
  };

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Password Reset Successful!</h2>
            <p className="mt-2 text-text-secondary">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
          </div>

          <div className="bg-surface rounded-lg shadow-lg p-8">
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-4">
                You will be redirected to the login page in a few seconds...
              </p>
              
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">Reset your password</h2>
          <p className="mt-2 text-text-secondary">
            Enter your new password below.
          </p>
        </div>

        <div className="bg-surface rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.password ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Create a new password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-text-secondary hover:text-text-primary" />
                  ) : (
                    <Eye className="h-5 w-5 text-text-secondary hover:text-text-primary" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.confirmPassword ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Confirm your new password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-text-secondary hover:text-text-primary" />
                  ) : (
                    <Eye className="h-5 w-5 text-text-secondary hover:text-text-primary" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="text-sm text-text-secondary">
              <p className="mb-2">Password requirements:</p>
              <ul className="space-y-1">
                <li className={`flex items-center ${password && password.length >= 8 ? 'text-green-600' : ''}`}>
                  <span className="mr-2">•</span>
                  At least 8 characters
                </li>
                <li className={`flex items-center ${password && /[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
                  <span className="mr-2">•</span>
                  At least one uppercase letter
                </li>
                <li className={`flex items-center ${password && /[a-z]/.test(password) ? 'text-green-600' : ''}`}>
                  <span className="mr-2">•</span>
                  At least one lowercase letter
                </li>
                <li className={`flex items-center ${password && /\d/.test(password) ? 'text-green-600' : ''}`}>
                  <span className="mr-2">•</span>
                  At least one number
                </li>
              </ul>
            </div>

            {/* Error Message */}
            {(authError || errors.root) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm text-red-700">
                    {authError || errors.root?.message}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Resetting...
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;