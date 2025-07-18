import React from 'react';
import { safeEntries } from '../utils/safeObjectUtils';

// Safe component for rendering data objects
const SafeDataRenderer = ({ 
  data = {}, 
  renderItem, 
  emptyMessage = 'No data available',
  errorMessage = 'Error loading data'
}) => {
  // Enhanced error boundary for data rendering
  try {
    // Additional safety checks
    if (!data || typeof data !== 'object' || data === null) {
      return (
        <div className="text-gray-500 text-center py-4">
          {emptyMessage}
        </div>
      );
    }

    // Use safe entries function to prevent Object.entries errors
    const entries = safeEntries(data);
    
    if (entries.length === 0) {
      return (
        <div className="text-gray-500 text-center py-4">
          {emptyMessage}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {entries.map(([key, value], index) => (
          <div key={`${key}-${index}`}>
            {renderItem ? renderItem(key, value) : (
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{key}</span>
                <span>{value != null ? String(value) : 'N/A'}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('SafeDataRenderer error:', error);
    return (
      <div className="text-red-500 text-center py-4 border border-red-200 rounded bg-red-50">
        <p className="font-medium">{errorMessage}</p>
        <p className="text-sm mt-1">Please check the data structure and try again.</p>
      </div>
    );
  }
};

export default SafeDataRenderer;