import React, { createContext, useContext, useState, useEffect } from "react";
import { api, getAuthToken, setAuthToken } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.getMe();
        setUser(data.user);
        setProgress(data.progress);
      } catch (err) {
        console.warn("Session expired or invalid, logging out:", err.message);
        setAuthToken(null);
        setUser(null);
        setProgress(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const res = await api.login({ email, password });
      setAuthToken(res.token);
      setUser(res.user);
      setProgress(res.progress);
      return res;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  const signup = async (name, email, password) => {
    setAuthError(null);
    try {
      const res = await api.signup({ name, email, password });
      setAuthToken(res.token);
      setUser(res.user);
      setProgress(res.progress);
      return res;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setProgress(null);
  };

  const refreshProgress = async () => {
    try {
      const data = await api.getProgress();
      setProgress(data.progress);
      return data.progress;
    } catch (err) {
      console.warn("Failed to refresh progress:", err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        loading,
        authError,
        login,
        signup,
        logout,
        refreshProgress,
        isAuthenticated: Boolean(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
