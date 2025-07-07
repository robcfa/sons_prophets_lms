// Location: src/utils/migrationHelper.js
// Utility functions for handling Supabase migration issues

import { supabase } from './supabase.js';

/**
 * Check if the user_role enum exists in the database
 * @returns {Promise<boolean>} True if the enum exists
 */
export const checkUserRoleEnumExists = async () => {
  try {
    const { data, error } = await supabase
      .rpc('verify_migration_fix')
      .select('*');
    
    if (error) {
      console.error('Error checking enum existence:', error);
      return false;
    }
    
    return data?.some(check => 
      check.check_name === 'user_role enum exists' && 
      check.status === 'OK'
    ) || false;
  } catch (error) {
    console.error('Error verifying migration:', error);
    return false;
  }
};

/**
 * Verify that the migration fix was successful
 * @returns {Promise<Object>} Migration verification results
 */
export const verifyMigrationFix = async () => {
  try {
    const { data, error } = await supabase
      .rpc('verify_migration_fix');
    
    if (error) {
      throw new Error(`Migration verification failed: ${error.message}`);
    }
    
    return {
      success: true,
      checks: data || [],
      allPassed: data?.every(check => check.status === 'OK') || false
    };
  } catch (error) {
    console.error('Migration verification error:', error);
    return {
      success: false,
      error: error.message,
      checks: [],
      allPassed: false
    };
  }
};

/**
 * Get detailed information about the current database state
 * @returns {Promise<Object>} Database state information
 */
export const getDatabaseState = async () => {
  try {
    const { data: profilesData, error: profilesError } = await supabase
      .from('user_profiles')
      .select('role, status, plan')
      .limit(1);
    
    if (profilesError && profilesError.code !== 'PGRST116') {
      throw new Error(`Profiles check failed: ${profilesError.message}`);
    }
    
    const { data: enumData, error: enumError } = await supabase
      .rpc('verify_migration_fix');
    
    if (enumError) {
      throw new Error(`Enum check failed: ${enumError.message}`);
    }
    
    return {
      tablesExist: !profilesError,
      enumsExist: enumData?.some(check => 
        check.check_name === 'user_role enum exists' && 
        check.status === 'OK'
      ) || false,
      migrationStatus: enumData || [],
      canQueryProfiles: !profilesError
    };
  } catch (error) {
    console.error('Database state check error:', error);
    return {
      tablesExist: false,
      enumsExist: false,
      migrationStatus: [],
      canQueryProfiles: false,
      error: error.message
    };
  }
};

/**
 * Handle migration errors gracefully
 * @param {Error} error - The migration error
 * @returns {Object} Error handling result
 */
export const handleMigrationError = (error) => {
  const errorMessage = error?.message || 'Unknown migration error';
  
  // Common migration error patterns
  const errorPatterns = {
    'type "user_role" already exists': {
      type: 'ENUM_EXISTS',
      message: 'The user_role enum type already exists. Please run the migration fix.',
      solution: 'Run the 20241216120001_fix_user_role_enum_conflict.sql migration'
    },
    'relation "user_profiles" does not exist': {
      type: 'TABLE_MISSING',
      message: 'The user_profiles table does not exist.',
      solution: 'Ensure the initial migration has been run successfully'
    },
    'permission denied': {
      type: 'PERMISSION_ERROR',
      message: 'Insufficient permissions to perform migration.',
      solution: 'Check your database permissions and Supabase configuration'
    }
  };
  
  // Find matching error pattern
  const matchedPattern = Object.entries(errorPatterns).find(([pattern]) => 
    errorMessage.toLowerCase().includes(pattern.toLowerCase())
  );
  
  if (matchedPattern) {
    const [, errorInfo] = matchedPattern;
    return {
      handled: true,
      type: errorInfo.type,
      message: errorInfo.message,
      solution: errorInfo.solution,
      originalError: errorMessage
    };
  }
  
  return {
    handled: false,
    type: 'UNKNOWN_ERROR',
    message: 'An unknown migration error occurred',
    solution: 'Check the Supabase logs for more details',
    originalError: errorMessage
  };
};

/**
 * Retry a migration operation with exponential backoff
 * @param {Function} operation - The operation to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Result of the operation
 */
export const retryMigrationOperation = async (
  operation, 
  maxRetries = 3, 
  baseDelay = 1000
) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`Migration attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

export default {
  checkUserRoleEnumExists,
  verifyMigrationFix,
  getDatabaseState,
  handleMigrationError,
  retryMigrationOperation
};