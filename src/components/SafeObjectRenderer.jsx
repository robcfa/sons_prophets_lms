import React from 'react';
import { safeEntries } from '../utils/safeObjectUtils';

/**
 * A safe component for rendering object data with comprehensive error handling
 * Prevents Object.entries errors by using safe utilities
 */
const SafeObjectRenderer = ({ 
  data = null, 
  renderItem = null, 
  emptyMessage = 'No data available',
  errorMessage = 'Error loading data',
  className = '',
  showKeys = true,
  maxItems = null
}) => {
  // Enhanced error boundary for object rendering
  try {
    // Multiple safety checks for different data types
    if (data === null || data === undefined) {
      return (
        <div className={`text-gray-500 text-center py-4 ${className}`}>
          {emptyMessage}
        </div>
      );
    }

    if (typeof data !== 'object') {
      return (
        <div className={`text-gray-500 text-center py-4 ${className}`}>
          <p>{emptyMessage}</p>
          <p className="text-sm mt-1">Expected object data, received {typeof data}</p>
        </div>
      );
    }

    // Handle arrays separately
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return (
          <div className={`text-gray-500 text-center py-4 ${className}`}>
            {emptyMessage}
          </div>
        );
      }
      
      const itemsToShow = maxItems ? data.slice(0, maxItems) : data;
      return (
        <div className={`space-y-2 ${className}`}>
          {itemsToShow.map((item, index) => (
            <div key={index} className="p-2 bg-gray-50 rounded">
              {renderItem ? renderItem(index, item) : (
                <div className="text-sm">
                  <span className="font-medium">Item {index + 1}:</span>
                  <span className="ml-2">{item != null ? String(item) : 'N/A'}</span>
                </div>
              )}
            </div>
          ))}
          {maxItems && data.length > maxItems && (
            <div className="text-sm text-gray-500 text-center">
              ... and {data.length - maxItems} more items
            </div>
          )}
        </div>
      );
    }

    // Use safe entries function to prevent Object.entries errors
    const entries = safeEntries(data, []);
    
    if (entries.length === 0) {
      return (
        <div className={`text-gray-500 text-center py-4 ${className}`}>
          {emptyMessage}
        </div>
      );
    }

    const itemsToShow = maxItems ? entries.slice(0, maxItems) : entries;

    return (
      <div className={`space-y-2 ${className}`}>
        {itemsToShow.map(([key, value], index) => (
          <div key={`${key}-${index}`} className="p-2 bg-gray-50 rounded">
            {renderItem ? renderItem(key, value) : (
              <div className="flex justify-between items-start">
                {showKeys && (
                  <span className="font-medium text-gray-700 capitalize mr-2">
                    {key.replace(/_/g, ' ')}:
                  </span>
                )}
                <span className="text-gray-600 text-right">
                  {value != null ? String(value) : 'N/A'}
                </span>
              </div>
            )}
          </div>
        ))}
        {maxItems && entries.length > maxItems && (
          <div className="text-sm text-gray-500 text-center">
            ... and {entries.length - maxItems} more properties
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('SafeObjectRenderer error:', error);
    return (
      <div className={`text-red-500 text-center py-4 border border-red-200 rounded bg-red-50 ${className}`}>
        <div className="flex items-center justify-center mb-2">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{errorMessage}</span>
        </div>
        <p className="text-sm mt-1">Please check the data structure and try again.</p>
        <p className="text-xs mt-2 text-gray-400">Error: {error.message}</p>
      </div>
    );
  }
};

export default SafeObjectRenderer;