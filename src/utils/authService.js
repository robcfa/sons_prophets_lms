import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query, transaction } from './database';
import { sendVerificationEmail, sendPasswordResetEmail } from './emailService';

// CRITICAL: JWT_SECRET must be set in environment variables for production
const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;
if (!JWT_SECRET) {
  console.error('CRITICAL SECURITY WARNING: VITE_JWT_SECRET is not set in environment variables!');
  console.error('Authentication will NOT work. Please set VITE_JWT_SECRET in your .env file.');
}

const JWT_EXPIRES_IN = '7d';
const RESET_TOKEN_EXPIRES_HOURS = 24;

const authService = {
  // Sign up with email and password
  signUp: async (email, password, userData = {}) => {
    try {
      // Check if user already exists
      const existingUser = await query(
        'SELECT id FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (existingUser.success && existingUser.data.rows.length > 0) {
        return { success: false, error: 'User already exists with this email' };
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      
      // Generate verification token
      const verificationToken = uuidv4();

      // Create user and profile in transaction
      const result = await transaction(async (client) => {
        // Insert user
        const userResult = await client.query(
          `INSERT INTO users (email, password_hash, verification_token) 
           VALUES ($1, $2, $3) 
           RETURNING id, email, created_at`,
          [email.toLowerCase(), passwordHash, verificationToken]
        );

        const user = userResult.rows[0];

        // Insert profile
        await client.query(
          `INSERT INTO user_profiles (id, email, full_name, role, plan) 
           VALUES ($1, $2, $3, $4, $5)`,
          [
            user.id,
            user.email,
            userData.full_name || email.split('@')[0],
            userData.role || 'member',
            userData.plan || 'free'
          ]
        );

        return { user, verificationToken };
      });

      if (!result.success) {
        return { success: false, error: result.error };
      }

      // Send verification email
      const emailResult = await sendVerificationEmail(email, verificationToken);
      if (!emailResult.success) {
        console.error('Failed to send verification email:', emailResult.error);
      }

      return { 
        success: true, 
        data: { 
          user: result.data.user,
          message: 'Registration successful! Please check your email to verify your account.'
        }
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      // Get user with password hash
      const userResult = await query(
        `SELECT u.*, up.full_name, up.role, up.status, up.plan 
         FROM users u 
         JOIN user_profiles up ON u.id = up.id 
         WHERE u.email = $1`,
        [email.toLowerCase()]
      );

      if (!userResult.success || userResult.data.rows.length === 0) {
        return { success: false, error: 'Invalid email or password' };
      }

      const user = userResult.data.rows[0];

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Check if email is verified
      if (!user.email_verified) {
        return { 
          success: false, 
          error: 'Please verify your email address before signing in. Check your inbox for the verification link.' 
        };
      }

      // Check account status
      if (user.status !== 'active') {
        return { success: false, error: 'Account is suspended. Please contact support.' };
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Return user data without password
      const { password_hash, verification_token, reset_token, reset_token_expires, ...userWithoutPassword } = user;

      return { 
        success: true, 
        data: { 
          user: userWithoutPassword,
          token,
          expiresIn: JWT_EXPIRES_IN
        }
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'Sign in failed. Please try again.' };
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const result = await query(
        `UPDATE users 
         SET email_verified = true, verification_token = null, updated_at = CURRENT_TIMESTAMP
         WHERE verification_token = $1 
         RETURNING id, email`,
        [token]
      );

      if (!result.success || result.data.rows.length === 0) {
        return { success: false, error: 'Invalid or expired verification token' };
      }

      return { success: true, data: result.data.rows[0] };
    } catch (error) {
      console.error('Email verification error:', error);
      return { success: false, error: 'Email verification failed. Please try again.' };
    }
  },

  // Request password reset
  resetPassword: async (email) => {
    try {
      // Check if user exists
      const userResult = await query(
        'SELECT id, email FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (!userResult.success || userResult.data.rows.length === 0) {
        // Don't reveal if email exists for security
        return { success: true, message: 'If the email exists, a reset link has been sent.' };
      }

      const user = userResult.data.rows[0];

      // Generate reset token
      const resetToken = uuidv4();
      const resetTokenExpires = new Date(Date.now() + RESET_TOKEN_EXPIRES_HOURS * 60 * 60 * 1000);

      // Update user with reset token
      const updateResult = await query(
        `UPDATE users 
         SET reset_token = $1, reset_token_expires = $2, updated_at = CURRENT_TIMESTAMP
         WHERE id = $3`,
        [resetToken, resetTokenExpires, user.id]
      );

      if (!updateResult.success) {
        return { success: false, error: 'Failed to generate reset token' };
      }

      // Send password reset email
      const emailResult = await sendPasswordResetEmail(email, resetToken);
      if (!emailResult.success) {
        console.error('Failed to send password reset email:', emailResult.error);
      }

      return { 
        success: true, 
        message: 'If the email exists, a reset link has been sent.' 
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Password reset failed. Please try again.' };
    }
  },

  // Reset password with token
  resetPasswordWithToken: async (token, newPassword) => {
    try {
      // Verify token and check expiration
      const userResult = await query(
        `SELECT id, email, reset_token_expires 
         FROM users 
         WHERE reset_token = $1`,
        [token]
      );

      if (!userResult.success || userResult.data.rows.length === 0) {
        return { success: false, error: 'Invalid or expired reset token' };
      }

      const user = userResult.data.rows[0];

      // Check if token is expired
      if (new Date() > new Date(user.reset_token_expires)) {
        return { success: false, error: 'Reset token has expired. Please request a new one.' };
      }

      // Hash new password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(newPassword, saltRounds);

      // Update password and clear reset token
      const updateResult = await query(
        `UPDATE users 
         SET password_hash = $1, reset_token = null, reset_token_expires = null, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2`,
        [passwordHash, user.id]
      );

      if (!updateResult.success) {
        return { success: false, error: 'Failed to update password' };
      }

      return { 
        success: true, 
        message: 'Password has been reset successfully. You can now sign in with your new password.' 
      };
    } catch (error) {
      console.error('Password reset with token error:', error);
      return { success: false, error: 'Password reset failed. Please try again.' };
    }
  },

  // Get user profile
  getUserProfile: async (userId) => {
    try {
      const result = await query(
        `SELECT up.*, u.email_verified, u.created_at as user_created_at
         FROM user_profiles up
         JOIN users u ON up.id = u.id
         WHERE up.id = $1`,
        [userId]
      );

      if (!result.success || result.data.rows.length === 0) {
        return { success: false, error: 'User profile not found' };
      }

      return { success: true, data: result.data.rows[0] };
    } catch (error) {
      console.error('Get user profile error:', error);
      return { success: false, error: 'Failed to load user profile' };
    }
  },

  // Update user profile
  updateUserProfile: async (userId, updates) => {
    try {
      const allowedFields = [
        'full_name', 'bio', 'avatar_url', 'phone', 'location', 'website',
        'spiritual_gifts', 'ministry_focus', 'years_experience',
        'is_available_for_coaching', 'coaching_rate', 'coaching_bio'
      ];

      const updateFields = [];
      const updateValues = [];
      let paramIndex = 1;

      Object.keys(updates).forEach(key => {
        if (allowedFields.includes(key)) {
          updateFields.push(`${key} = $${paramIndex}`);
          updateValues.push(updates[key]);
          paramIndex++;
        }
      });

      if (updateFields.length === 0) {
        return { success: false, error: 'No valid fields to update' };
      }

      updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
      updateValues.push(userId);

      const query_text = `
        UPDATE user_profiles 
        SET ${updateFields.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING *
      `;

      const result = await query(query_text, updateValues);

      if (!result.success || result.data.rows.length === 0) {
        return { success: false, error: 'Failed to update profile' };
      }

      return { success: true, data: result.data.rows[0] };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  },

  // Verify JWT token
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: 'Invalid or expired token' };
    }
  },

  // Sign out (client-side token removal)
  signOut: async () => {
    // In a stateless JWT system, signout is handled client-side
    // by removing the token from localStorage
    return { success: true };
  },

  // Get current session (verify token)
  getSession: async (token) => {
    try {
      if (!token) {
        return { success: false, error: 'No token provided' };
      }

      const verifyResult = authService.verifyToken(token);
      if (!verifyResult.success) {
        return { success: false, error: verifyResult.error };
      }

      const { userId } = verifyResult.data;
      const profileResult = await authService.getUserProfile(userId);

      if (!profileResult.success) {
        return { success: false, error: 'User not found' };
      }

      return { 
        success: true, 
        data: { 
          user: profileResult.data,
          token 
        }
      };
    } catch (error) {
      console.error('Get session error:', error);
      return { success: false, error: 'Session validation failed' };
    }
  },

  // Mock method for compatibility (no-op)
  onAuthStateChange: (callback) => {
    // JWT is stateless, so we don't have real-time auth state changes
    // This is kept for compatibility with existing code
    return { 
      data: { 
        subscription: { 
          unsubscribe: () => {} 
        } 
      } 
    };
  }
};

export default authService;