import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const studentUser = JSON.parse(localStorage.getItem("studentUser") || "null");
    if (!studentUser) {
      navigate("/user/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/user/profile/", {
          params: { student_id: studentUser.student_id },
        });
        setProfile(res.data.profile);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const details = profile
    ? [
        ["Student ID", profile.student_id, "fa-solid fa-id-card"],
        ["Full Name", profile.full_name, "fa-solid fa-user"],
        ["Email", profile.email, "fa-solid fa-envelope"],
        ["Mobile", profile.mobile, "fa-solid fa-phone"],
      ]
    : [];

  return (
    <div className="min-h-screen py-5" style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}>
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-6 text-center">
          <h4 className="mb-1 font-semibold">
            <i className="fa-solid fa-id-badge mr-2 text-blue-600"></i>
            My Profile
          </h4>
          <p className="text-sm text-gray-500">View your student account details</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {loading ? (
            <div className="py-10 text-center">
              <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <i className="fa-solid fa-user-graduate text-2xl"></i>
                </div>
                <div>
                  <h5 className="font-semibold">{profile?.full_name}</h5>
                  <span className="text-sm text-gray-500">{profile?.student_id}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {details.map(([label, value, icon]) => (
                  <div key={label} className="rounded-xl border border-gray-200 p-4">
                    <p className="mb-1 text-xs font-medium uppercase text-gray-500">{label}</p>
                    <p className="break-all text-sm font-medium text-gray-800">
                      <i className={`${icon} mr-2 text-blue-600`}></i>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  to="/user/dashboard"
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i>
                  Back
                </Link>
                <Link
                  to="/user/change_password"
                  className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  <i className="fa-solid fa-key mr-2"></i>
                  Change Password
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
