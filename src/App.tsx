import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import "./services/axiosInterceptor";
import DefaultLayout from "./layout/DefaultLayout";
import { Toaster } from "./components/ui/toaster";
import { AppRoutes } from "./routes";
import { AuthContextProvider } from "./providers/login-provider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DefaultLayout>
          <AppRoutes />
          <Toaster />
        </DefaultLayout>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
