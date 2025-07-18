// Global safe utility functions to prevent common JavaScript errors
// These functions should be used throughout the application to prevent runtime errors

// Safe object property access
export const safeAccess = (obj, path, defaultValue = null) => {
  try {
    if (!obj || typeof obj !== 'object') {
      return defaultValue;
    }
    
    if (typeof path === 'string') {
      return path.split('.').reduce((current, prop) => {
        return current && current[prop] !== undefined ? current[prop] : defaultValue;
      }, obj);
    }
    
    return defaultValue;
  } catch (error) {
    console.warn('safeAccess error:', error);
    return defaultValue;
  }
};

// Safe Object.entries wrapper
export const safeObjectEntries = (obj) => {
  try {
    if (!obj || typeof obj !== 'object' || obj === null) {
      return [];
    }
    return Object.entries(obj);
  } catch (error) {
    console.warn('safeObjectEntries error:', error);
    return [];
  }
};

// Safe Object.keys wrapper
export const safeObjectKeys = (obj) => {
  try {
    if (!obj || typeof obj !== 'object' || obj === null) {
      return [];
    }
    return Object.keys(obj);
  } catch (error) {
    console.warn('safeObjectKeys error:', error);
    return [];
  }
};

// Safe Object.values wrapper
export const safeObjectValues = (obj) => {
  try {
    if (!obj || typeof obj !== 'object' || obj === null) {
      return [];
    }
    return Object.values(obj);
  } catch (error) {
    console.warn('safeObjectValues error:', error);
    return [];
  }
};

// Safe array iteration
export const safeArrayMap = (arr, callback) => {
  try {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.map(callback);
  } catch (error) {
    console.warn('safeArrayMap error:', error);
    return [];
  }
};

// Safe array filtering
export const safeArrayFilter = (arr, predicate) => {
  try {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.filter(predicate);
  } catch (error) {
    console.warn('safeArrayFilter error:', error);
    return [];
  }
};

// Safe JSON parsing
export const safeJSONParse = (str, fallback = null) => {
  try {
    if (typeof str !== 'string') {
      return fallback;
    }
    return JSON.parse(str);
  } catch (error) {
    console.warn('safeJSONParse error:', error);
    return fallback;
  }
};

// Safe state update helper
export const safeStateUpdate = (prevState, updates) => {
  try {
    if (!prevState || typeof prevState !== 'object') {
      return updates || {};
    }
    if (!updates || typeof updates !== 'object') {
      return prevState;
    }
    return { ...prevState, ...updates };
  } catch (error) {
    console.warn('safeStateUpdate error:', error);
    return prevState || {};
  }
};

// Safe function execution
export const safeExecute = (fn, ...args) => {
  try {
    if (typeof fn !== 'function') {
      return null;
    }
    return fn(...args);
  } catch (error) {
    console.warn('safeExecute error:', error);
    return null;
  }
};

// Safe event handler
export const safeEventHandler = (handler, event) => {
  try {
    if (typeof handler === 'function') {
      return handler(event);
    }
  } catch (error) {
    console.warn('safeEventHandler error:', error);
  }
};

// Safe property check
export const safeHasProperty = (obj, property) => {
  try {
    if (!obj || typeof obj !== 'object') {
      return false;
    }
    return Object.prototype.hasOwnProperty.call(obj, property);
  } catch (error) {
    console.warn('safeHasProperty error:', error);
    return false;
  }
};

// Safe type checking
export const safeTypeCheck = (value, expectedType) => {
  try {
    if (expectedType === 'array') {
      return Array.isArray(value);
    }
    return typeof value === expectedType;
  } catch (error) {
    console.warn('safeTypeCheck error:', error);
    return false;
  }
};

// Safe data validation
export const safeValidateData = (data, schema) => {
  try {
    if (!data || !schema || typeof schema !== 'object') {
      return false;
    }
    
    return safeObjectEntries(schema).every(([key, validator]) => {
      const value = data[key];
      if (typeof validator === 'function') {
        return validator(value);
      }
      if (typeof validator === 'string') {
        return safeTypeCheck(value, validator);
      }
      return true;
    });
  } catch (error) {
    console.warn('safeValidateData error:', error);
    return false;
  }
};

// Safe default value assignment
export const safeDefault = (value, defaultValue) => {
  try {
    return value !== null && value !== undefined ? value : defaultValue;
  } catch (error) {
    console.warn('safeDefault error:', error);
    return defaultValue;
  }
};