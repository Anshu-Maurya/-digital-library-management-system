import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/user/login/",
        formData
      );

      if (res.data.success) {
        toast.success(res.data.message || "Login successful");
        localStorage.setItem("studentUser", JSON.stringify(res.data.user));
        setFormData({ password: "", email: "" });
        navigate("/user/dashboard");
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
            <i className="fa-solid fa-shield-halved text-blue-600"></i> User Login
          </h4>
          <p className="text-gray-500 text-sm">
            use admin account create via <code className="bg-gray-100 px-1 rounded text-xs">createsuperuser</code>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={HandleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                Email
              </label>
              <div className="flex">
                <span className="flex items-center px-3 bg-transparent border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
                  <i className="fa-regular fa-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="enter your email"
                  required
                  value={formData.email}
                  onChange={HandleChange}
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
                  name="password"
                  className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="password"
                  required
                  value={formData.password}
                  onChange={HandleChange}
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
                  Logging In.....
                </span>
              ) : (
                <span>
                  <i className="fa-solid fa-right-to-bracket mr-1"></i> Login
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            Have No account?{" "}
            <Link to="/user/signup" className="text-blue-600 hover:underline font-medium">
              SignUp here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;