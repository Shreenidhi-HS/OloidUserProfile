import { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Credential from "./pages/credential";
import "./services/axiosInterceptor";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();
export const LoginContext = createContext();

function App() {
  const localStorageData = JSON.parse(
    localStorage.getItem("authContext") || null
  );
  const [authContext, setAuthContext] = useState(localStorageData || null);

  return (
    <LoginContext.Provider value={{ authContext, setAuthContext }}>
      <QueryClientProvider client={queryClient}>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/credentials" element={<Credential />} />
          </Routes>
          <Toaster />
        </DefaultLayout>
      </QueryClientProvider>
    </LoginContext.Provider>
  );
}

export default App;
