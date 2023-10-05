import { createContext, useState, ReactNode, FC } from "react";

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
  const localStorageData = JSON.parse(
    localStorage.getItem("authContext") || "{}"
  );

  const [authContext, setAuthContext] = useState<AuthData | undefined>(
    localStorageData
  );

  return (
    <LoginContext.Provider value={{ authContext, setAuthContext }}>
      {children}
    </LoginContext.Provider>
  );
};
