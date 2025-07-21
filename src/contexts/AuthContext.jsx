import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../utils/authService";
import { initializeSchema } from "../utils/database";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Initialize database schema and auth state
    const initializeAuth = async () => {
      try {
        setLoading(true);
        setAuthError(null);

        // Initialize database schema
        await initializeSchema();

        // Check for existing token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (token && isMounted) {
          // Verify token and get user session
          const sessionResult = await authService.getSession(token);
          
          if (sessionResult?.success && isMounted) {
            setUser(sessionResult.data.user);
            setUserProfile(sessionResult.data.user);
          } else {
            // Token invalid, remove it
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
          }
        }
      } catch (error) {
        if (isMounted) {
          setAuthError("Failed to initialize authentication");
          console.error("Auth initialization error:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setAuthError(null);
      setLoading(true);

      const result = await authService.signIn(email, password);

      if (!result?.success) {
        setAuthError(result?.error || "Invalid email or password");
        return { success: false, error: result?.error || "Invalid email or password" };
      }

      // Store token and user data
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('userRole', result.data.user.role);
      localStorage.setItem('userEmail', result.data.user.email);

      setUser(result.data.user);
      setUserProfile(result.data.user);

      return { success: true, data: result.data };
    } catch (error) {
      const errorMsg = "Something went wrong during login. Please try again.";
      setAuthError(errorMsg);
      console.error("Sign in error:", error);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email, password, userData = {}) => {
    try {
      setAuthError(null);
      setLoading(true);

      const result = await authService.signUp(email, password, userData);

      if (!result?.success) {
        setAuthError(result?.error || "Registration failed");
        return { success: false, error: result?.error || "Registration failed" };
      }

      return { success: true, data: result.data };
    } catch (error) {
      const errorMsg = "Something went wrong during registration. Please try again.";
      setAuthError(errorMsg);
      console.error("Sign up error:", error);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setAuthError(null);
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      
      // Clear state
      setUser(null);
      setUserProfile(null);

      // Call auth service signOut (for cleanup)
      await authService.signOut();

      return { success: true };
    } catch (error) {
      const errorMsg = "Something went wrong during logout. Please try again.";
      setAuthError(errorMsg);
      console.error("Sign out error:", error);
      return { success: false, error: errorMsg };
    }
  };

  // Update profile function
  const updateProfile = async (updates) => {
    try {
      setAuthError(null);

      if (!user?.id) {
        const errorMsg = "User not authenticated";
        setAuthError(errorMsg);
        return { success: false, error: errorMsg };
      }

      const result = await authService.updateUserProfile(user.id, updates);

      if (!result?.success) {
        setAuthError(result?.error || "Profile update failed");
        return { success: false, error: result?.error || "Profile update failed" };
      }

      setUserProfile(result.data);
      return { success: true, data: result.data };
    } catch (error) {
      const errorMsg = "Something went wrong updating profile. Please try again.";
      setAuthError(errorMsg);
      console.error("Update profile error:", error);
      return { success: false, error: errorMsg };
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      setAuthError(null);
      const result = await authService.resetPassword(email);

      if (!result?.success) {
        setAuthError(result?.error || "Password reset failed");
        return { success: false, error: result?.error || "Password reset failed" };
      }

      return { success: true, message: result.message };
    } catch (error) {
      const errorMsg = "Something went wrong sending reset email. Please try again.";
      setAuthError(errorMsg);
      console.error("Reset password error:", error);
      return { success: false, error: errorMsg };
    }
  };

  // Verify email function
  const verifyEmail = async (token) => {
    try {
      setAuthError(null);
      const result = await authService.verifyEmail(token);

      if (!result?.success) {
        setAuthError(result?.error || "Email verification failed");
        return { success: false, error: result?.error || "Email verification failed" };
      }

      return { success: true, data: result.data };
    } catch (error) {
      const errorMsg = "Something went wrong verifying email. Please try again.";
      setAuthError(errorMsg);
      console.error("Verify email error:", error);
      return { success: false, error: errorMsg };
    }
  };

  // Reset password with token
  const resetPasswordWithToken = async (token, newPassword) => {
    try {
      setAuthError(null);
      const result = await authService.resetPasswordWithToken(token, newPassword);

      if (!result?.success) {
        setAuthError(result?.error || "Password reset failed");
        return { success: false, error: result?.error || "Password reset failed" };
      }

      return { success: true, message: result.message };
    } catch (error) {
      const errorMsg = "Something went wrong resetting password. Please try again.";
      setAuthError(errorMsg);
      console.error("Reset password with token error:", error);
      return { success: false, error: errorMsg };
    }
  };

  const value = {
    user: user || null,
    userProfile: userProfile || null,
    loading,
    authError,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
    verifyEmail,
    resetPasswordWithToken,
    clearError: () => setAuthError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;