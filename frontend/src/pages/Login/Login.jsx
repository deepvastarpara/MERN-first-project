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
      
      <h2 className="text-3xl font-bold text-center text-[#BF4646] mb-6">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 border border-[#EDDCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EACB5]"
            placeholder="Enter your email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full px-4 py-3 border border-[#EDDCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EACB5]"
            placeholder="Enter your password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          className="w-full bg-[#BF4646] hover:bg-[#a33b3b] text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
        >
          Login
        </button>

      </form>

      <p className="text-sm text-center mt-6 text-gray-500">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-[#7EACB5] cursor-pointer font-medium hover:underline"
        >
          Register
        </span>
      </p>

    </div>
  </div>
);
};

export default Login;
