import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import LoginFooter from './components/LoginFooter';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');

    if (isAuthenticated === 'true' && userRole) {
      // Redirect to appropriate dashboard based on role
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
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent('8B4513').substring(1)}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-card rounded-2xl shadow-soft-lg border border-subtle overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Header */}
              <LoginHeader />

              {/* Login Form */}
              <LoginForm />

              {/* Social Login */}
              <SocialLogin />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <LoginFooter />
          </div>
        </div>
      </div>

      {/* Mobile Optimization */}
      <style jsx>{`
        @media (max-width: 640px) {
          .bg-gradient-to-br {
            background: var(--color-background);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
