import { useState } from "react";
import { resetPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await resetPassword(form);
    alert("Password changed");
    navigate("/login");
  };

return (
  <div className="min-h-screen bg-[#FFF4EA] flex items-center justify-center px-4">
    <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-[#EDDCC6]">

      <h2 className="text-3xl font-bold text-center text-[#BF4646] mb-2">
        Reset Password
      </h2>

      <p className="text-center text-gray-500 mb-6 text-sm">
        Enter the OTP and your new password
      </p>

      <form onSubmit={submit} className="space-y-5">

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-[#EDDCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EACB5]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            OTP Code
          </label>
          <input
            required
            placeholder="------"
            onChange={e => setForm({ ...form, otp: e.target.value })}
            className="w-full px-4 py-3 border border-[#EDDCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EACB5] tracking-widest text-center text-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            required
            placeholder="Enter new password"
            onChange={e => setForm({ ...form, newPassword: e.target.value })}
            className="w-full px-4 py-3 border border-[#EDDCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EACB5]"
          />
        </div>

        <button
          className="w-full bg-[#BF4646] hover:bg-[#a33b3b] text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
        >
          Reset Password
        </button>

      </form>

      <p className="text-sm text-center mt-6 text-gray-500">
        Back to{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-[#7EACB5] cursor-pointer font-medium hover:underline"
        >
          Login
        </span>
      </p>

    </div>
  </div>
);

};

export default ResetPassword;
