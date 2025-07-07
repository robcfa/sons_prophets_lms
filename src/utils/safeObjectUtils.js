// Safe object utility functions to prevent Object.entries() errors

/**
 * Safely get object entries, returning empty array if object is null/undefined
 * @param {Object} obj - The object to get entries from
 * @returns {Array} Array of [key, value] pairs or empty array
 */
export const safeObjectEntries = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return [];
  }
  return Object.entries(obj);
};

/**
 * Safely get object keys, returning empty array if object is null/undefined
 * @param {Object} obj - The object to get keys from
 * @returns {Array} Array of keys or empty array
 */
export const safeObjectKeys = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return [];
  }
  return Object.keys(obj);
};

/**
 * Safely get object values, returning empty array if object is null/undefined
 * @param {Object} obj - The object to get values from
 * @returns {Array} Array of values or empty array
 */
export const safeObjectValues = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return [];
  }
  return Object.values(obj);
};

/**
 * Safely access nested object properties
 * @param {Object} obj - The object to access
 * @param {string} path - Dot-separated path (e.g., 'user.profile.name')
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} The value at path or defaultValue
 */
export const safeGet = (obj, path, defaultValue = null) => {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }
  
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
};

/**
 * Safely merge objects with null/undefined checks
 * @param {...Object} objects - Objects to merge
 * @returns {Object} Merged object
 */
export const safeMerge = (...objects) => {
  return objects.reduce((acc, obj) => {
    if (obj && typeof obj === 'object') {
      return { ...acc, ...obj };
    }
    return acc;
  }, {});
};

/**
 * Check if an object is empty (null, undefined, or has no properties)
 * @param {*} obj - The object to check
 * @returns {boolean} True if object is empty
 */
export const isEmpty = (obj) => {
  if (obj == null) return true;
  if (typeof obj !== 'object') return false;
  return Object.keys(obj).length === 0;
};