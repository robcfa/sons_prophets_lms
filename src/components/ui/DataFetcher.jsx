import React from 'react';
import PropTypes from 'prop-types';
import { useApiData } from '../../hooks/useApiData';


/**
 * Generic data fetcher component that handles loading, error, and success states
 * @param {Object} props - Component props
 * @param {string} props.url - API endpoint URL
 * @param {Object} props.params - Query parameters
 * @param {Function} props.children - Render function that receives data
 * @param {React.Component} props.LoadingComponent - Custom loading component
 * @param {React.Component} props.ErrorComponent - Custom error component
 * @param {any} props.defaultData - Default data value
 * @param {boolean} props.immediate - Whether to fetch immediately
 * @param {Array} props.dependencies - Dependencies to trigger refetch
 * @returns {React.Component} - DataFetcher component
 */
const DataFetcher = ({
  url,
  params = {},
  children,
  LoadingComponent = null,
  ErrorComponent = null,
  defaultData = null,
  immediate = true,
  dependencies = [],
  ...apiOptions
}) => {
  const { data, loading, error, refetch } = useApiData(url, {
    params,
    defaultData,
    immediate,
    dependencies,
    ...apiOptions
  });

  // Loading state
  if (loading) {
    if (LoadingComponent) {
      return <LoadingComponent />;
    }
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    if (ErrorComponent) {
      return <ErrorComponent error={error} retry={refetch} />;
    }
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={refetch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Success state - render children with data
  return children({ data, refetch });
};

DataFetcher.propTypes = {
  url: PropTypes.string.isRequired,
  params: PropTypes.object,
  children: PropTypes.func.isRequired,
  LoadingComponent: PropTypes.elementType,
  ErrorComponent: PropTypes.elementType,
  defaultData: PropTypes.any,
  immediate: PropTypes.bool,
  dependencies: PropTypes.array
};

export default DataFetcher;