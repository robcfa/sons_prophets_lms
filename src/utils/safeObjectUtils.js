// Enhanced safe utility functions for object and array operations
// Prevents TypeError when calling methods on null/undefined values

export function safeReduce(arr, fn, initialValue) {
  if (!Array.isArray(arr)) {
    return initialValue;
  }
  try {
    return arr.reduce(fn, initialValue);
  } catch (error) {
    console.warn('safeReduce: Error during reduce operation', error);
    return initialValue;
  }
}

export function safeMap(arr, fn) {
  if (!Array.isArray(arr)) {
    return [];
  }
  try {
    return arr.map(fn);
  } catch (error) {
    console.warn('safeMap: Error during map operation', error);
    return [];
  }
}

export function safeFilter(arr, fn) {
  if (!Array.isArray(arr)) {
    return [];
  }
  try {
    return arr.filter(fn);
  } catch (error) {
    console.warn('safeFilter: Error during filter operation', error);
    return [];
  }
}

export function safeFind(arr, fn) {
  if (!Array.isArray(arr)) {
    return undefined;
  }
  try {
    return arr.find(fn);
  } catch (error) {
    console.warn('safeFind: Error during find operation', error);
    return undefined;
  }
}

export function safeLength(arr) {
  if (!Array.isArray(arr)) {
    return 0;
  }
  return arr.length;
}

export function safeObjectEntries(obj) {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return [];
  }
  try {
    return Object.entries(obj);
  } catch (error) {
    console.warn('safeObjectEntries: Error calling Object.entries', error);
    return [];
  }
}

export function safeObjectKeys(obj) {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return [];
  }
  try {
    return Object.keys(obj);
  } catch (error) {
    console.warn('safeObjectKeys: Error calling Object.keys', error);
    return [];
  }
}

export function safeObjectValues(obj) {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return [];
  }
  try {
    return Object.values(obj);
  } catch (error) {
    console.warn('safeObjectValues: Error calling Object.values', error);
    return [];
  }
}

// Enhanced Object.entries with comprehensive error handling
export function safeEntries(obj, fallback = []) {
  if (obj === null || obj === undefined) {
    return fallback;
  }
  
  if (typeof obj !== 'object') {
    return fallback;
  }
  
  // Handle special cases that might cause errors
  if (obj === null || obj === undefined) {
    return fallback;
  }
  
  // Check for circular references or problematic objects
  try {
    // Test if the object can be stringified (basic check for circular refs)
    JSON.stringify(obj);
  } catch (error) {
    console.warn('safeEntries: Object may have circular references', error);
    return fallback;
  }
  
  try {
    const entries = Object.entries(obj);
    return Array.isArray(entries) ? entries : fallback;
  } catch (error) {
    console.warn('safeEntries: Failed to get object entries', error);
    return fallback;
  }
}

// Global Object.entries override for maximum safety
export function patchGlobalObjectEntries() {
  if (typeof window !== 'undefined' && window.Object && !window.Object._originalEntries) {
    // Store original method
    window.Object._originalEntries = window.Object.entries;
    
    // Override with safe version
    window.Object.entries = function(obj) {
      try {
        if (obj === null || obj === undefined) {
          console.warn('Object.entries called with null/undefined, returning empty array');
          return [];
        }
        
        if (typeof obj !== 'object') {
          console.warn('Object.entries called with non-object, returning empty array');
          return [];
        }
        
        return window.Object._originalEntries(obj);
      } catch (error) {
        console.warn('Object.entries error caught:', error);
        return [];
      }
    };
  }
}

// Initialize the patch
if (typeof window !== 'undefined') {
  patchGlobalObjectEntries();
}

// Enhanced Object.keys with comprehensive error handling
export function safeKeys(obj, fallback = []) {
  if (obj === null || obj === undefined) {
    return fallback;
  }
  
  if (typeof obj !== 'object') {
    return fallback;
  }
  
  try {
    const keys = Object.keys(obj);
    return Array.isArray(keys) ? keys : fallback;
  } catch (error) {
    console.warn('safeKeys: Failed to get object keys', error);
    return fallback;
  }
}

// Enhanced Object.values with comprehensive error handling
export function safeValues(obj, fallback = []) {
  if (obj === null || obj === undefined) {
    return fallback;
  }
  
  if (typeof obj !== 'object') {
    return fallback;
  }
  
  try {
    const values = Object.values(obj);
    return Array.isArray(values) ? values : fallback;
  } catch (error) {
    console.warn('safeValues: Failed to get object values', error);
    return fallback;
  }
}

// Safe object iteration with callback
export function safeForEachEntry(obj, callback) {
  if (!obj || typeof obj !== 'object' || typeof callback !== 'function') {
    return;
  }
  
  try {
    safeEntries(obj).forEach(([key, value]) => {
      try {
        callback(key, value);
      } catch (error) {
        console.warn('safeForEachEntry: Error in callback', error);
      }
    });
  } catch (error) {
    console.warn('safeForEachEntry: Error during iteration', error);
  }
}

// Safe object property enumeration
export function safeHasOwnProperty(obj, prop) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  
  try {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  } catch (error) {
    console.warn('safeHasOwnProperty: Error checking property', error);
    return false;
  }
}

export function safeSum(arr, keyOrFn) {
  return safeReduce(arr, (acc, item) => {
    try {
      const value = typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn];
      return acc + (Number(value) || 0);
    } catch (error) {
      console.warn('safeSum: Error processing item', error);
      return acc;
    }
  }, 0);
}

export function safeAverage(arr, keyOrFn) {
  const total = safeSum(arr, keyOrFn);
  const count = safeLength(arr);
  return count > 0 ? total / count : 0;
}

export function safeForEach(arr, fn) {
  if (Array.isArray(arr) && typeof fn === 'function') {
    try {
      arr.forEach(fn);
    } catch (error) {
      console.warn('safeForEach: Error during forEach', error);
    }
  }
}

export function safeSlice(arr, start, end) {
  if (!Array.isArray(arr)) {
    return [];
  }
  try {
    return arr.slice(start, end);
  } catch (error) {
    console.warn('safeSlice: Error during slice', error);
    return [];
  }
}

export function safeSome(arr, fn) {
  if (!Array.isArray(arr)) {
    return false;
  }
  try {
    return arr.some(fn);
  } catch (error) {
    console.warn('safeSome: Error during some operation', error);
    return false;
  }
}

export function safeEvery(arr, fn) {
  if (!Array.isArray(arr)) {
    return true;
  }
  try {
    return arr.every(fn);
  } catch (error) {
    console.warn('safeEvery: Error during every operation', error);
    return true;
  }
}

// Safe nested property access function
export function safeGet(obj, path, defaultValue = undefined) {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }
  
  if (typeof path !== 'string') {
    return defaultValue;
  }
  
  try {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (current == null || typeof current !== 'object' || !(key in current)) {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current;
  } catch (error) {
    console.warn('safeGet: Error accessing nested property', error);
    return defaultValue;
  }
}

// Safe object merging function
export function safeMerge(target, ...sources) {
  if (!target || typeof target !== 'object') {
    target = {};
  }
  
  try {
    for (let source of sources) {
      if (source && typeof source === 'object') {
        for (let key in source) {
          if (safeHasOwnProperty(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  } catch (error) {
    console.warn('safeMerge: Error merging objects', error);
    return target;
  }
}

// Safe array conversion function
export function safeArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value == null) {
    return [];
  }
  return [value];
}

// Safe property access with fallback
export function safeProp(obj, prop, fallback = null) {
  if (!obj || typeof obj !== 'object') {
    return fallback;
  }
  
  try {
    return safeHasOwnProperty(obj, prop) ? obj[prop] : fallback;
  } catch (error) {
    console.warn('safeProp: Error accessing property', error);
    return fallback;
  }
}

// Safe JSON parsing
export function safeJSONParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.warn('safeJSONParse: Error parsing JSON', e);
    return fallback;
  }
}

// Safe string operations
export function safeString(value, fallback = '') {
  if (typeof value === 'string') {
    return value;
  }
  if (value == null) {
    return fallback;
  }
  try {
    return String(value);
  } catch (error) {
    console.warn('safeString: Error converting to string', error);
    return fallback;
  }
}

// Safe number operations
export function safeNumber(value, fallback = 0) {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  try {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
  } catch (error) {
    console.warn('safeNumber: Error converting to number', error);
    return fallback;
  }
}

// Safe boolean operations
export function safeBoolean(value, fallback = false) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value == null) {
    return fallback;
  }
  try {
    return Boolean(value);
  } catch (error) {
    console.warn('safeBoolean: Error converting to boolean', error);
    return fallback;
  }
}

// Safe object spread operation
export function safeSpread(obj, fallback = {}) {
  if (!obj || typeof obj !== 'object') {
    return fallback;
  }
  
  try {
    return { ...obj };
  } catch (error) {
    console.warn('safeSpread: Error spreading object', error);
    return fallback;
  }
}

// Safe object assign operation
export function safeAssign(target, ...sources) {
  if (!target || typeof target !== 'object') {
    target = {};
  }
  
  try {
    const validSources = sources.filter(source => source && typeof source === 'object');
    return Object.assign(target, ...validSources);
  } catch (error) {
    console.warn('safeAssign: Error assigning objects', error);
    return target;
  }
}