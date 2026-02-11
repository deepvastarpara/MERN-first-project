import { useEffect, useContext, useState } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/home")
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage("Unauthorized"));
  }, []);
  
return (
  <div className="min-h-screen bg-[#FFF4EA] flex items-center justify-center p-6">
    <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 border border-[#EDDCC6]">
      
      <h1 className="text-3xl font-bold text-[#BF4646] mb-4 text-center">
        Dashboard
      </h1>

      <div className="bg-[#EDDCC6] text-[#333] rounded-lg p-4 text-center font-medium">
        {message}
      </div>

      <button
        onClick={logout}
        className="mt-6 w-full bg-[#BF4646] hover:bg-[#a33b3b] text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
      >
        Logout
      </button>

    </div>
  </div>
);
};

export default Home;
