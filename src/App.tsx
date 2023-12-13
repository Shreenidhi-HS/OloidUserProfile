import React, { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import "./services/axiosInterceptor";
import DefaultLayout from "./layout/DefaultLayout";
import { Toaster } from "./components/ui/toaster";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient();

export const LoginContext = createContext();

function App() {
  const localStorageData = JSON.parse(
    localStorage.getItem("authContext") || "null"
  );
  const [authContext, setAuthContext] = useState(localStorageData);

  return (
    <LoginContext.Provider value={{ authContext, setAuthContext }}>
      <QueryClientProvider client={queryClient}>
        <DefaultLayout>
          <AppRoutes />
          <Toaster />
        </DefaultLayout>
      </QueryClientProvider>
    </LoginContext.Provider>
  );
}

export default App;
