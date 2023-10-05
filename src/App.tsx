import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import DefaultLayout from "./layout/DefaultLayout";
import Homepage from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Transaction from "./pages/transaction";
import Credential from "./pages/credential";
import "./services/axiosInterceptor"
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
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Homepage />}>
              <Route path="profile" element={<Profile />} />
              <Route path="credential" element={<Credential />} />
              <Route path="transaction" element={<Transaction />} />
            </Route>
          </Routes>
          <Toaster />
      </QueryClientProvider>
    </LoginContext.Provider>
  );
}

export default App;
