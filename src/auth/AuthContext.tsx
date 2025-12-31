import api from "@/interceptor/axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Interface for the user stored in context
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  phone: string;
  email: string;
  role: string;
}

// Interface for AuthContext
interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  // setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  // setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  // Restore auth from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("snapfin_token");
    const storedUser = localStorage.getItem("snapfin_user");
    console.log('toekn', token)
    console.log('storeduser', storedUser)

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setLoading(false);
  }, []);

  // 🔹 LOGIN (single source of truth)
  const login = (token: string, userData: User) => {
    localStorage.setItem("snapfin_token", token);
    localStorage.setItem("snapfin_user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("snapfin_token");
    localStorage.removeItem("snapfin_user");

    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return <>...Loading</>;
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
