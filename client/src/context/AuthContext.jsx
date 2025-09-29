// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser(); // fetches with cookie JWT
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // only runs once on mount

  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
