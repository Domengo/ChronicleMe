import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStorageState } from "./useStorageState";
import { login } from "@/services/api";
import { getToken, removeToken } from "@/services/api";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";


interface User {
  id: number;
  username: string;
}

const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  user?: User | null;
  isLoading: boolean;
  message: string;
  isSuccess: boolean;
}>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
  user: null,
  isLoading: false,
  message: "",
  isSuccess: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const loadSession = async () => {
      const token = await getToken();
      if (token) {
        setSession(token);
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
        setIsSuccess(true);
      } else {
        setUser(null);
        setIsSuccess(false);
      }
    };

    loadSession();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const success = await login(username, password);
      if (success) {
        const token = await getToken();
        setSession(token);
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
        setMessage("Login successful!");
        setIsSuccess(true);
      } else {
        setMessage("Login failed. Please check your credentials.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Login failed. Please try again later.");
      setIsSuccess(false);
    }
  };

  const signOut = async () => {
    await removeToken();
    setSession(null); // Clear the session
    setUser(null); // Clear user info
    setIsSuccess(false); // Reset isSuccess when signing out
    hasRedirected.current = false; // Reset the redirect flag
  };

  // Handle redirection after signing in or out
  useEffect(() => {
    if (isLoading) return; // Wait until the session is fully loaded from storage
    if (isSuccess && session && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace('/'); // Navigate to the home page after login
    } else if (!session && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace('/sign-in'); // Navigate to the sign-in page after logout
    }
  }, [isSuccess, session, isLoading]);

  if (isLoading) {
    return <Text>Loading...</Text>;// Show loading indicator while loading session
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        user,
        isLoading,
        message,
        isSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
