import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [stats, setStats] = useState({
    total_books: 0,
    total_issued: 0,
    not_returned: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("studentUser") || "null");

    if (!storedUser) {
      navigate("/user/login");
      return;
    }

    let isMounted = true;

    const fetchStatus = async () => {
      try {
        setLoading(true);
        const studentId = storedUser.student_id || storedUser.id;

        const res = await axios.get("http://127.0.0.1:8000/api/user/stats/", {
          params: { student_id: studentId },
        });

        const nextStats = res.data?.stats || {
          total_books: 0,
          total_issued: 0,
          not_returned: 0,
        };

        if (isMounted) {
          setStats(nextStats);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          toast.error(error.response?.data?.message || "Failed to fetch stats");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStatus();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const studentUser = JSON.parse(localStorage.getItem("studentUser") || "null");

  return (
    <div
      className="py-5 min-h-screen"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h4 className="font-semibold">
            <i className="fa-solid fa-user-graduate mr-1"></i> My Library Dashboard
          </h4>
          <p className="text-gray-500 text-sm">
            Welcome {studentUser?.full_name || "Student"}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
            <p className="text-gray-500 text-sm mt-3">Loading....</p>
          </div>
        )}

        {/* Stats Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Total Books */}
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h6 className="text-xs uppercase text-gray-500 mb-1">Total Books</h6>
                  <h3 className="text-2xl font-bold">{stats.total_books ?? 0}</h3>
                </div>
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: "#e0e7ff" }}
                >
                  <i className="fa-solid fa-book text-lg text-blue-600"></i>
                </span>
              </div>
              <p className="text-gray-500 text-xs mt-auto">
                All books currently in the library catalogue
              </p>
              <div className="mt-3">
                <Link to="/user/books" className="text-sm text-blue-600 hover:underline">
                  View Books <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
              </div>
            </div>

            {/* Pending Returns */}
            <div
              className="rounded-2xl shadow-sm p-5 flex flex-col h-full text-white"
              style={{ background: "linear-gradient(135deg, #f97316cc, #f59e0b)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h6 className="text-xs uppercase mb-1">Pending Returns</h6>
                  <h3 className="text-2xl font-bold">{stats.not_returned ?? 0}</h3>
                </div>
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: "#fff3e0" }}
                >
                  <i className="fa-solid fa-clock text-lg" style={{ color: "#fff" }}></i>
                </span>
              </div>
              <p className="text-xs mt-auto" style={{ color: "rgba(255,255,255,0.9)" }}>
                Return the books at time as given
              </p>
            </div>

            {/* Total Issued */}
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h6 className="text-xs uppercase text-gray-500 mb-1">Total Books Issued</h6>
                  <h3 className="text-2xl font-bold">{stats.total_issued ?? 0}</h3>
                </div>
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: "#e0e7ff" }}
                >
                  <i className="fa-solid fa-book-open text-lg text-blue-600"></i>
                </span>
              </div>
              <p className="text-gray-500 text-xs mt-auto">
                Count of all books issued to you
              </p>
              <div className="mt-3">
                <Link to="/user/books" className="text-sm text-blue-600 hover:underline">
                  View issue history <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;