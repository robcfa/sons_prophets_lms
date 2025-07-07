import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { hasAccess, getUserPlan } from '../../utils/planUtils';

const WithPlan = (allowedPlans) => (WrappedComponent) => {
  const PlanGatedComponent = (props) => {
    const { user, userProfile } = useAuth();
    const userPlan = getUserPlan({ user, userProfile });
    
    if (!hasAccess(userPlan, allowedPlans)) {
      return (
        <div className="min-h-screen bg-page flex items-center justify-center">
          <div className="card max-w-md mx-auto text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-warning rounded-full flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h2 className="text-2xl font-heading font-heading-bold text-primary mb-2">
                Upgrade Required
              </h2>
              <p className="text-secondary font-body">
                This feature requires a {allowedPlans.join(' or ')} plan.
              </p>
            </div>
            <div className="space-y-2">
              <button className="w-full button bg-primary text-white">
                Upgrade Now
              </button>
              <button className="w-full button bg-secondary text-primary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
  
  PlanGatedComponent.displayName = `WithPlan(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return PlanGatedComponent;
};

export default WithPlan;