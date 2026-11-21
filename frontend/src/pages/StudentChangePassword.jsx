import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function StudentChangePassword() {
  const [studentUser, setStudentUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("studentUser") || "null");
    if (!storedUser) {
      navigate("/user/login");
      return;
    }
    setStudentUser(storedUser);
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/user/change-password/",
        {
          student_id: studentUser.student_id,
          email: studentUser.email,
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }
      );
      toast.success(res.data.message || "Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const inputType = showPasswords ? "text" : "password";

  return (
    <div className="min-h-screen py-5" style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}>
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 text-center">
          <h4 className="mb-1 font-semibold">
            <i className="fa-solid fa-key mr-2 text-blue-600"></i>
            Change Password
          </h4>
          <p className="text-sm text-gray-500">Update your account password</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            {[
              ["Current Password", "Enter your current password", currentPassword, setCurrentPassword],
              ["New Password", "Enter your new password", newPassword, setNewPassword],
              ["Confirm Password", "Confirm your new password", confirmPassword, setConfirmPassword],
            ].map(([label, placeholder, value, setValue]) => (
              <div key={label} className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
                <div className="flex">
                  <span className="flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type={inputType}
                    className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                    required
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                  />
                  <button
                    type="button"
                    className="flex items-center rounded-r-lg border border-l-0 border-gray-300 px-3 text-gray-500"
                    onClick={() => setShowPasswords((current) => !current)}
                  >
                    <i className={`fa-solid ${showPasswords ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/user/profile")}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
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

export default StudentChangePassword;
