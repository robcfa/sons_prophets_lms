import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Shield, Target } from 'lucide-react';
import { useTheme } from '../../../lib/theme-context';
import Icon from '../../../components/AppIcon';


const AccessibilityAudit = () => {
  const { theme } = useTheme();
  const [auditResults, setAuditResults] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  // Simulate accessibility audit
  const runAudit = async () => {
    setIsAuditing(true);
    setAuditResults(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock audit results based on current theme
    const results = {
      light: {
        contrast: {
          score: 95,
          status: 'pass',
          issues: 1,
          details: [
            { element: 'Primary text on background', ratio: '14.2:1', status: 'AAA' },
            { element: 'Secondary text on background', ratio: '8.1:1', status: 'AAA' },
            { element: 'Muted text on background', ratio: '4.3:1', status: 'AA' },
            { element: 'Border on background', ratio: '3.8:1', status: 'Fail' },
          ]
        },
        touchTargets: {
          score: 100,
          status: 'pass',
          issues: 0,
          details: [
            { element: 'Primary buttons', size: '44px × 44px', status: 'Pass' },
            { element: 'Secondary buttons', size: '44px × 44px', status: 'Pass' },
            { element: 'Icon buttons', size: '44px × 44px', status: 'Pass' },
          ]
        },
        focusIndicators: {
          score: 90,
          status: 'warning',
          issues: 2,
          details: [
            { element: 'Form inputs', visibility: 'Visible', status: 'Pass' },
            { element: 'Navigation links', visibility: 'Visible', status: 'Pass' },
            { element: 'Card components', visibility: 'Needs improvement', status: 'Warning' },
          ]
        }
      },
      dark: {
        contrast: {
          score: 92,
          status: 'pass',
          issues: 2,
          details: [
            { element: 'Primary text on background', ratio: '12.8:1', status: 'AAA' },
            { element: 'Secondary text on background', ratio: '6.9:1', status: 'AA' },
            { element: 'Muted text on background', ratio: '4.1:1', status: 'AA' },
            { element: 'Border on background', ratio: '3.2:1', status: 'Fail' },
          ]
        },
        touchTargets: {
          score: 100,
          status: 'pass',
          issues: 0,
          details: [
            { element: 'Primary buttons', size: '44px × 44px', status: 'Pass' },
            { element: 'Secondary buttons', size: '44px × 44px', status: 'Pass' },
            { element: 'Icon buttons', size: '44px × 44px', status: 'Pass' },
          ]
        },
        focusIndicators: {
          score: 88,
          status: 'warning',
          issues: 3,
          details: [
            { element: 'Form inputs', visibility: 'Visible', status: 'Pass' },
            { element: 'Navigation links', visibility: 'Needs improvement', status: 'Warning' },
            { element: 'Card components', visibility: 'Needs improvement', status: 'Warning' },
          ]
        }
      },
      reverent: {
        contrast: {
          score: 98,
          status: 'pass',
          issues: 0,
          details: [
            { element: 'Primary text on background', ratio: '15.1:1', status: 'AAA' },
            { element: 'Secondary text on background', ratio: '9.2:1', status: 'AAA' },
            { element: 'Muted text on background', ratio: '5.8:1', status: 'AA' },
            { element: 'Border on background', ratio: '4.7:1', status: 'AA' },
          ]
        },
        touchTargets: {
          score: 100,
          status: 'pass',
          issues: 0,
          details: [
            { element: 'Primary buttons', size: '48px × 48px', status: 'Pass' },
            { element: 'Secondary buttons', size: '48px × 48px', status: 'Pass' },
            { element: 'Icon buttons', size: '48px × 48px', status: 'Pass' },
          ]
        },
        focusIndicators: {
          score: 95,
          status: 'pass',
          issues: 0,
          details: [
            { element: 'Form inputs', visibility: 'Highly visible', status: 'Pass' },
            { element: 'Navigation links', visibility: 'Visible', status: 'Pass' },
            { element: 'Card components', visibility: 'Visible', status: 'Pass' },
          ]
        }
      }
    };
    
    setAuditResults(results[theme] || results.light);
    setIsAuditing(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AAA':
        return 'text-green-600';
      case 'AA':
        return 'text-yellow-600';
      case 'Pass':
        return 'text-green-600';
      case 'Warning':
        return 'text-yellow-600';
      case 'Fail':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const AuditSection = ({ title, data, icon: Icon }) => (
    <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface" />
          <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
            {title}
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(data.status)}
          <span className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
            {data.score}%
          </span>
        </div>
      </div>
      
      {data.issues > 0 && (
        <div className="mb-3 text-sm text-yellow-600 dark:text-yellow-400">
          {data.issues} issue{data.issues > 1 ? 's' : ''} found
        </div>
      )}
      
      <div className="space-y-2">
        {data.details.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
              {item.element}
            </span>
            <div className="flex items-center space-x-2">
              {item.ratio && (
                <span className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
                  {item.ratio}
                </span>
              )}
              {item.size && (
                <span className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
                  {item.size}
                </span>
              )}
              {item.visibility && (
                <span className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
                  {item.visibility}
                </span>
              )}
              <span className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Audit Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
            Accessibility Audit
          </h4>
          <p className="text-xs text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted mt-1">
            Current theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </p>
        </div>
        <button
          onClick={runAudit}
          disabled={isAuditing}
          className="flex items-center px-3 py-2 bg-primary text-white rounded-card hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <Shield className="w-4 h-4 mr-2" />
          {isAuditing ? 'Auditing...' : 'Run Audit'}
        </button>
      </div>

      {/* Loading State */}
      {isAuditing && (
        <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
            Running accessibility audit...
          </p>
        </div>
      )}

      {/* Audit Results */}
      {auditResults && !isAuditing && (
        <div className="space-y-4">
          {/* Overall Score */}
          <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-on-surface dark:text-on-surface-dark reverent:text-rev-on-surface">
                Overall Score
              </h4>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-primary">
                  {Math.round((auditResults.contrast.score + auditResults.touchTargets.score + auditResults.focusIndicators.score) / 3)}%
                </div>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <AuditSection 
            title="Color Contrast" 
            data={auditResults.contrast} 
            icon={Target}
          />
          <AuditSection 
            title="Touch Targets" 
            data={auditResults.touchTargets} 
            icon={Target}
          />
          <AuditSection 
            title="Focus Indicators" 
            data={auditResults.focusIndicators} 
            icon={Target}
          />
        </div>
      )}

      {/* Initial State */}
      {!auditResults && !isAuditing && (
        <div className="bg-surface dark:bg-surface-dark reverent:bg-rev-surface border border-divider dark:border-divider-dark reverent:border-rev-border rounded-card p-8 text-center">
          <Shield className="w-12 h-12 text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted mx-auto mb-4" />
          <p className="text-sm text-muted dark:text-on-surface-dark-secondary reverent:text-rev-muted">
            Run an accessibility audit to check WCAG compliance
          </p>
        </div>
      )}

      {/* Guidelines */}
      <div className="bg-blue-50 dark:bg-blue-900/20 reverent:bg-amber-50 border border-blue-200 dark:border-blue-800 reverent:border-amber-200 rounded-card p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 reverent:text-amber-900 mb-2">
          Accessibility Guidelines
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 reverent:text-amber-700 space-y-1">
          <li>• Contrast ratio ≥ 4.5:1 for AA, ≥ 7:1 for AAA</li>
          <li>• Touch targets ≥ 44px × 44px</li>
          <li>• Visible focus indicators for all interactive elements</li>
          <li>• Test all themes for compliance</li>
        </ul>
      </div>
    </div>
  );
};

export default AccessibilityAudit;