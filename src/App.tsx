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
import { Badge, Bluetooth, Face, Pin, QRcode } from "./components";
import ConsentForm from "./components/consent";

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
            <Route path="/credentials/faces" element={<Face />} />
            <Route path="/credentials/faces/consent" element={<ConsentForm />} />
            <Route path="/credentials/badge" element={<Badge />} />
            <Route path="/credentials/bluetooth" element={<Bluetooth />} />
            <Route path="/credentials/pin" element={<Pin />} />
            <Route path="/credentials/qrcode" element={<QRcode />} />
          </Routes>
          <Toaster />
        </DefaultLayout>
      </QueryClientProvider>
    </LoginContext.Provider>
  );
}

export default App;
