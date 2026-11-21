import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminChangePassword() {
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const [showcurrent_password, setShowCurrentPassword] = useState(false);
  const [shownewpassword, setShowNewPassword] = useState(false);
  const [showconfimpassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin/login");
    }
  }, [adminUser, navigate]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (new_password !== confirm_password) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (new_password.length < 8) {
      toast.error("password should be at least 8 character");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/admin/change-password/",
        {
          username: adminUser,
          current_password,
          new_password,
          confirm_password,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.data.message || "Password update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="py-5 min-h-screen"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="max-w-2xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-6">
          <h4 className="font-semibold mb-1">
            <i className="fa-solid fa-key text-blue-600 mr-2"></i>
            Admin Change Password
          </h4>
          <p className="text-gray-500 text-sm">
            Change your password for the next login.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={HandleSubmit}>
            {/* Current Password */}
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Current Password
            </label>
            <div className="flex mb-4">
              <span className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={showcurrent_password ? "text" : "password"}
                className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your current password"
                required
                value={current_password}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="flex items-center px-3 bg-white border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:text-gray-700"
                onClick={() => setShowCurrentPassword(!showcurrent_password)}
              >
                <i className={showcurrent_password ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
              </button>
            </div>

            {/* New Password */}
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              New Password
            </label>
            <div className="flex mb-4">
              <span className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={shownewpassword ? "text" : "password"}
                className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your new password"
                required
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="flex items-center px-3 bg-white border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewPassword(!shownewpassword)}
              >
                <i className={shownewpassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
              </button>
            </div>

            {/* Confirm Password */}
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Confirm Password
            </label>
            <div className="flex mb-6">
              <span className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={showconfimpassword ? "text" : "password"}
                className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your new password"
                required
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="flex items-center px-3 bg-white border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showconfimpassword)}
              >
                <i className={showconfimpassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                onClick={() => navigate("/admin/dashboard")}
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Back to Dashboard
              </button>

              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Updating...
                  </span>
                ) : (
                  <span>
                    <i className="fa-solid fa-key mr-2"></i>
                    Update Password
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminChangePassword;