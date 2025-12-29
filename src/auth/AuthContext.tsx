import api from "@/interceptor/axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Interface for the raw user data returned by your API
interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  role?: { name: string };
}

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
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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

  const checkStatus = async () => {
    try {
      const response = await api<{ data: IUserResponse }>({
        method: "GET",
        url: "/user/me",
      });

      const userData = response.data.data;

      if (!userData) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      setUser({
        id: String(userData._id),
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobileNumber: userData.mobileNumber,
        phone: userData.mobileNumber,
        email: userData.email,
        role: userData.role?.name || "NA",
      });

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <>...Loading</>;
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
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
