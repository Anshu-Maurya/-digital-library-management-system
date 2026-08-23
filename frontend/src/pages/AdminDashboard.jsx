import { Link } from "react-router-dom";

function AdminDashboard() {
  const adminUser = localStorage.getItem("adminUser");

  return (
    <div className="max-w-3xl mx-auto px-4 py-5">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
        <p className="text-gray-500 mb-4">Logged in as {adminUser || "admin"}</p>
        <Link
          to="/admin/login"
          className="inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;