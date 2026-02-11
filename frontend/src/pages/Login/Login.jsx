import { useState, useContext } from "react";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      loginUser(res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
  <div className="min-h-screen bg-[#FFF4EA] flex items-center justify-center px-4">
    <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-[#EDDCC6]">

      <h2 className="text-3xl font-bold text-center text-[#BF4646] mb-2">
        Welcome Back
      </h2>

      <p className="text-center text-gray-500 mb-6 text-sm">
        Login to access your dashboard
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-[#EDDCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EACB5]"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <span
              onClick={() => navigate("/forgot-password")}
              className="text-xs text-[#7EACB5] cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          <input
            type="password"
            required
            placeholder="Enter your password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 border border-[#EDDCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EACB5]"
          />
        </div>

        {/* Button */}
        <button
          className="w-full bg-[#BF4646] hover:bg-[#a33b3b] text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
        >
          Login
        </button>

      </form>

      {/* Bottom Navigation */}
      <p className="text-sm text-center mt-6 text-gray-500">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-[#7EACB5] cursor-pointer font-medium hover:underline"
        >
          Create Account
        </span>
      </p>

    </div>
  </div>
);
};

export default Login;
