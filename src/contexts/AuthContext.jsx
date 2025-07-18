import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../utils/authService";
import { safeGet } from "../utils/safeObjectUtils";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Initialize auth state
    const initializeAuth = async () => {
      try {
        setLoading(true);
        setAuthError(null);

        // Check localStorage for existing session (mock authentication)
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const userRole = localStorage.getItem('userRole');
        const userEmail = localStorage.getItem('userEmail');

        if (isAuthenticated === 'true' && userRole && userEmail && isMounted) {
          // Create mock user object
          const mockUser = {
            id: `user_${userRole}_${Date.now()}`,
            email: userEmail,
            role: userRole,
            name: userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1)
          };

          setUser(mockUser);
          setUserProfile({
            id: mockUser.id,
            email: mockUser.email,
            role: mockUser.role,
            name: mockUser.name,
            created_at: new Date().toISOString()
          });
        } else {
          // Try Supabase authentication as fallback
          const sessionResult = await authService.getSession();

          if (
            sessionResult?.success &&
            safeGet(sessionResult, 'data.session.user') &&
            isMounted
          ) {
            const authUser = sessionResult.data.session.user;
            setUser(authUser);

            // Fetch user profile
            const profileResult = await authService.getUserProfile(authUser.id);

            if (profileResult?.success && profileResult?.data && isMounted) {
              setUserProfile(profileResult.data);
            }
          }
        }
      } catch (error) {
        if (isMounted) {
          setAuthError("Failed to initialize authentication");
          console.log("Auth initialization error:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = authService.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      setAuthError(null);

      if (event === "SIGNED_IN" && safeGet(session, 'user')) {
        setUser(session.user);

        // Fetch user profile for signed in user
        authService.getUserProfile(session.user.id).then((profileResult) => {
          if (profileResult?.success && profileResult?.data && isMounted) {
            setUserProfile(profileResult.data);
          } else if (isMounted) {
            setAuthError(profileResult?.error || "Failed to load user profile");
          }
        });
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setUserProfile(null);
        // Clear localStorage on sign out
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('rememberMe');
      } else if (event === "TOKEN_REFRESHED" && safeGet(session, 'user')) {
        setUser(session.user);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  // Sign in function - supports both mock and Supabase authentication
  const signIn = async (email, password) => {
    try {
      setAuthError(null);
      
      // Mock credentials for different user roles
      const mockCredentials = {
        learner: { email: 'learner@sonsprophets.com', password: 'learner123' },
        coach: { email: 'coach@sonsprophets.com', password: 'coach123' },
        admin: { email: 'admin@sonsprophets.com', password: 'admin123' }
      };

      // Check mock credentials first
      let userRole = null;
      let isValidCredentials = false;

      Object.entries(mockCredentials).forEach(([role, credentials]) => {
        if (email === credentials.email && password === credentials.password) {
          userRole = role;
          isValidCredentials = true;
        }
      });

      if (isValidCredentials) {
        // Mock authentication success
        const mockUser = {
          id: `user_${userRole}_${Date.now()}`,
          email: email,
          role: userRole,
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
        };

        setUser(mockUser);
        setUserProfile({
          id: mockUser.id,
          email: mockUser.email,
          role: mockUser.role,
          name: mockUser.name,
          created_at: new Date().toISOString()
        });

        // Store in localStorage
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isAuthenticated', 'true');

        return { success: true, data: { user: mockUser } };
      } else {
        // Try Supabase authentication as fallback
        const result = await authService.signIn(email, password);

        if (!result?.success) {
          setAuthError(result?.error || "Invalid email or password");
          return { success: false, error: result?.error || "Invalid email or password" };
        }

        return { success: true, data: result.data };
      }
    } catch (error) {
      const errorMsg = "Something went wrong during login. Please try again.";
      setAuthError(errorMsg);
      console.log("Sign in error:", error);
      return { success: false, error: errorMsg };
    }
  };

  // Sign up function
  const signUp = async (email, password, userData = {}) => {
    try {
      setAuthError(null);
      const result = await authService.signUp(email, password, userData);

      if (!result?.success) {
        setAuthError(result?.error || "Signup failed");
        return { success: false, error: result?.error };
      }

      return { success: true, data: result.data };
    } catch (error) {
      const errorMsg = "Something went wrong during signup. Please try again.";
      setAuthError(errorMsg);
      console.log("Sign up error:", error);
      return { success: false, error: errorMsg };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setAuthError(null);
      
      // Clear localStorage first
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('rememberMe');
      
      // Clear state
      setUser(null);
      setUserProfile(null);

      // Try Supabase sign out as well
      await authService.signOut();

      return { success: true };
    } catch (error) {
      const errorMsg = "Something went wrong during logout. Please try again.";
      setAuthError(errorMsg);
      console.log("Sign out error:", error);
      return { success: false, error: errorMsg };
    }
  };

  // Update profile function
  const updateProfile = async (updates) => {
    try {
      setAuthError(null);

      if (!safeGet(user, 'id')) {
        const errorMsg = "User not authenticated";
        setAuthError(errorMsg);
        return { success: false, error: errorMsg };
      }

      const result = await authService.updateUserProfile(user.id, updates);

      if (!result?.success) {
        setAuthError(result?.error || "Profile update failed");
        return { success: false, error: result?.error };
      }

      setUserProfile(result.data || {});
      return { success: true, data: result.data };
    } catch (error) {
      const errorMsg =
        "Something went wrong updating profile. Please try again.";
      setAuthError(errorMsg);
      console.log("Update profile error:", error);
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
        return { success: false, error: result?.error };
      }

      return { success: true };
    } catch (error) {
      const errorMsg =
        "Something went wrong sending reset email. Please try again.";
      setAuthError(errorMsg);
      console.log("Reset password error:", error);
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