import { useState } from "react";
import { verifyOtp } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [form, setForm] = useState({ email: "", otp: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(form);
      alert("Account verified");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
  <div className="min-h-screen bg-[#FFF4EA] flex items-center justify-center px-4">
    <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-[#EDDCC6]">
      
      <h2 className="text-3xl font-bold text-center text-[#BF4646] mb-2">
        Verify Account
      </h2>

      <p className="text-center text-gray-500 mb-6 text-sm">
        Enter the OTP sent to your email
      </p>

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
            OTP Code
          </label>
          <input
            required
            className="w-full px-4 py-3 border border-[#EDDCC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EACB5] tracking-widest text-center text-lg"
            placeholder="------"
            onChange={(e) => setForm({ ...form, otp: e.target.value })}
          />
        </div>

        <button
          className="w-full bg-[#BF4646] hover:bg-[#a33b3b] text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
        >
          Verify
        </button>

      </form>

    </div>
  </div>
);

};

export default VerifyOtp;
