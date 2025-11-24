import { Pool } from 'pg';

// Neon Database Connection Configuration
// IMPORTANT: Use environment variable for database URL to avoid exposing credentials
const pool = new Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL || process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Database query wrapper with error handling
export const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return { success: true, data: result };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  } finally {
    client.release();
  }
};

// Transaction wrapper
export const transaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return { success: true, data: result };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error);
    return { success: false, error: error.message };
  } finally {
    client.release();
  }
};

// Check database connection
export const checkConnection = async () => {
  try {
    const result = await query('SELECT NOW()');
    return result.success;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

// Initialize database schema
export const initializeSchema = async () => {
  try {
    // Create types and enums
    await query(`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('admin', 'coach', 'member');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await query(`
      DO $$ BEGIN
        CREATE TYPE account_status AS ENUM ('active', 'inactive', 'suspended');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await query(`
      DO $$ BEGIN
        CREATE TYPE plan_type AS ENUM ('free', 'plus', 'premium');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email_verified BOOLEAN DEFAULT FALSE,
        verification_token VARCHAR(255),
        reset_token VARCHAR(255),
        reset_token_expires TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create user_profiles table
    await query(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        email VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        bio TEXT,
        avatar_url TEXT,
        role user_role DEFAULT 'member',
        status account_status DEFAULT 'active',
        plan plan_type DEFAULT 'free',
        phone VARCHAR(20),
        location VARCHAR(255),
        website VARCHAR(255),
        spiritual_gifts TEXT[],
        ministry_focus VARCHAR(255),
        years_experience INTEGER DEFAULT 0,
        is_available_for_coaching BOOLEAN DEFAULT FALSE,
        coaching_rate DECIMAL(10,2),
        coaching_bio TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
      CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);
      CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
      CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles(status);
    `);

    // Create trigger for updating updated_at
    await query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await query(`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    await query(`
      DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
      CREATE TRIGGER update_user_profiles_updated_at
        BEFORE UPDATE ON user_profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    return { success: true };
  } catch (error) {
    console.error('Schema initialization error:', error);
    return { success: false, error: error.message };
  }
};

export default { query, transaction, checkConnection, initializeSchema };