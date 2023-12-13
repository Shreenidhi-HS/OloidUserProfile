import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Credential from "./pages/credential";
import { Badge, Bluetooth, Face, Pin, QRcode } from "./components";
import ConsentForm from "./components/consent";

export const AppRoutes: React.FC = () => (
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
);
