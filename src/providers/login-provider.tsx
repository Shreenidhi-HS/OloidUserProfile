import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";

interface AuthData {
  Code: string;
  Email: string;
  Session: string;
  Tenant: string;
}

interface AuthContext {
  authContext: AuthData | undefined;
  setAuthContext: (authContext: AuthData | undefined) => void;
}

export const LoginContext = createContext<AuthContext | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const storedData = localStorage.getItem("authContext");
  const localStorageData = storedData ? JSON.parse(storedData) : undefined;

  const [authContext, setAuthContext] = useState<AuthData | undefined>(
    localStorageData
  );

  const contextValue: AuthContext = { authContext, setAuthContext };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
