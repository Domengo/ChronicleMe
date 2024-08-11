import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";
import { useState } from "react";
import { login } from "@/services/api";

const AuthContext = createContext<{
  //   signIn: () => void;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  message: string;
  isSuccess: boolean;
}>({
  //   signIn: () => null,
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
  message: '',
  isSuccess: false
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
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const signIn = async (username: string, password: string) => {
    try {
      const success = await login(username, password);
      if (success) {
        setSession('xxx'); // Replace 'xxx' with the actual session/token from your API
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

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
    value={{
        signIn,
        signOut,
        session,
        isLoading,
        message,
        isSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
