import { useState, useEffect, useCallback } from 'react';


/**
 * Custom hook for fetching and managing API data with enhanced error handling
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch }
 */
export function useApiData(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body = null,
    params = {},
    defaultData = null,
    immediate = true,
    dependencies = [],
    onSuccess = null,
    onError = null,
    transform = null,
    retries = 0,
    retryDelay = 1000,
    timeout = 10000
  } = options;

  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Build query string from params
  const buildQueryString = useCallback((params) => {
    const queryParams = new URLSearchParams();
    
    // Safe iteration over params object
    try {
      if (params && typeof params === 'object') {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            queryParams.append(key, String(value));
          }
        });
      }
    } catch (error) {
      console.warn('Error building query string:', error);
    }
    
    return queryParams.toString();
  }, []);

  // Fetch data function with comprehensive error handling
  const fetchData = useCallback(async (retryAttempt = 0) => {
    try {
      setLoading(true);
      setError(null);

      // Build full URL with query parameters
      const queryString = buildQueryString(params);
      const fullUrl = queryString ? `${url}?${queryString}` : url;

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      // Apply transform function if provided
      if (transform && typeof transform === 'function') {
        try {
          responseData = transform(responseData);
        } catch (transformError) {
          console.warn('Transform function error:', transformError);
        }
      }

      // Safe data setting with additional validation
      const finalData = responseData !== null && responseData !== undefined ? responseData : defaultData;
      setData(finalData);
      setRetryCount(0);

      // Call success callback with safe data access
      if (onSuccess && typeof onSuccess === 'function') {
        try {
          onSuccess(finalData);
        } catch (callbackError) {
          console.warn('Success callback error:', callbackError);
        }
      }

    } catch (err) {
      console.error('API fetch error:', err);
      
      // Handle different error types
      let errorMessage = 'An unexpected error occurred';
      
      if (err.name === 'AbortError') {
        errorMessage = 'Request timed out';
      } else if (err.message) {
        errorMessage = err.message;
      }

      // Retry logic
      if (retryAttempt < retries) {
        console.log(`Retrying request (${retryAttempt + 1}/${retries})`);
        setTimeout(() => {
          setRetryCount(retryAttempt + 1);
          fetchData(retryAttempt + 1);
        }, retryDelay);
        return;
      }

      setError(errorMessage);
      
      // Call error callback
      if (onError && typeof onError === 'function') {
        try {
          onError(errorMessage);
        } catch (callbackError) {
          console.warn('Error callback error:', callbackError);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, body, params, defaultData, transform, onSuccess, onError, retries, retryDelay, timeout, buildQueryString]);

  // Refetch function
  const refetch = useCallback(() => {
    setRetryCount(0);
    fetchData(0);
  }, [fetchData]);

  // Effect for initial fetch and dependency changes
  useEffect(() => {
    if (immediate) {
      fetchData(0);
    }
  }, [immediate, fetchData, ...dependencies]);

  return {
    data,
    loading,
    error,
    refetch,
    retryCount
  };
}

// Export additional utility functions
export const createApiHook = (baseUrl, defaultOptions = {}) => {
  return (endpoint, options = {}) => {
    const fullUrl = `${baseUrl}${endpoint}`;
    const mergedOptions = { ...defaultOptions, ...options };
    return useApiData(fullUrl, mergedOptions);
  };
};

export default useApiData;