import api from "./api";

export const register = (data) => api.post("/auth/register", data);
export const verifyOtp = (data) => api.post("/auth/verify-otp", data);
export const login = (data) => api.post("/auth/login", data);


export const forgotPassword = (data) =>
  api.post("/password/forgot-password", data);

export const verifyResetOtp = (data) =>
  api.post("/password/verify-reset-otp", data);

export const resetPassword = (data) =>
  api.post("/password/reset-password", data);
