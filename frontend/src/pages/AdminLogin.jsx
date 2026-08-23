import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/admin/login/", {
        username,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Login successful");
        localStorage.setItem("adminUser", res.data.username);
        navigate("/admin/dashboard");
      } else {
        toast.error(res.data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="py-5 min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="w-full max-w-md px-4">
        {/* Heading */}
        <div className="text-center mb-6">
          <h4 className="font-semibold mb-1">
            <i className="fa-solid fa-shield-halved text-blue-600"></i> Admin Sign In
          </h4>
          <p className="text-gray-500 text-sm">
            use admin account create via <code className="bg-gray-100 px-1 rounded text-xs">createsuperuser</code>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={HandleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                User Name
              </label>
              <div className="flex">
                <span className="flex items-center px-3 bg-transparent border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
                  <i className="fa-regular fa-user"></i>
                </span>
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="enter admin username"
                  required
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                Password
              </label>
              <div className="flex">
                <span className="flex items-center px-3 bg-transparent border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="password"
                  className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Signing In.....
                </span>
              ) : (
                <span>
                  <i className="fa-solid fa-right-to-bracket mr-1"></i> Sign In
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;