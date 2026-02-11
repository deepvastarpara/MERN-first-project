import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import VerifyOtp from "../pages/VerifyOtp/VerifyOtp";
import Home from "../pages/Home/Home";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyOtp />} />
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;
