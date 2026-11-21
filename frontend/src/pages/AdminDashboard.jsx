import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const adminUser = localStorage.getItem("adminUser");
  const [counts, setCounts] = useState({
    totalStudents: 0,
    totalIssues: 0,
    activeIssues: 0,
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://127.0.0.1:8000/api/admin/students/"),
      axios.get("http://127.0.0.1:8000/api/admin/issued-books/"),
    ])
      .then(([studentRes, issueRes]) => {
        const issues = issueRes.data.issues || [];
        setCounts({
          totalStudents: studentRes.data.total_students || 0,
          totalIssues: issues.length,
          activeIssues: issues.filter((issue) => !issue.is_return).length,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div
      className="min-h-screen py-5"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <h4 className="font-semibold">
            <i className="fa-solid fa-gauge-high mr-2 text-blue-600"></i>
            Admin Dashboard
          </h4>
          <p className="mt-1 text-sm text-gray-500">
            Logged in as {adminUser || "admin"}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            ["Registered Students", counts.totalStudents, "fa-users", "text-blue-600", "/admin/students"],
            ["Total Issued Records", counts.totalIssues, "fa-book-open", "text-green-600", "/admin/issued-books"],
            ["Pending Returns", counts.activeIssues, "fa-clock", "text-orange-600", "/admin/issued-books"],
          ].map(([label, value, icon, color, path]) => (
            <Link
              key={label}
              to={path}
              className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-500">{label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                  <i className={`fa-solid ${icon} ${color}`}></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Manage Categories", "/admin/category/manage", "fa-layer-group"],
            ["Manage Authors", "/admin/author/manage", "fa-user-pen"],
            ["Manage Books", "/admin/book/manage", "fa-book"],
            ["Students", "/admin/students", "fa-users"],
            ["Issued Books", "/admin/issued-books", "fa-arrow-right-arrow-left"],
            ["Add a Book", "/admin/book/add", "fa-plus"],
            ["Change Password", "/admin/change_password", "fa-key"],
          ].map(([title, path, icon]) => (
            <Link
              key={path}
              to={path}
              className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <i className={`fa-solid ${icon}`}></i>
              </div>
              <p className="font-semibold text-gray-800">{title}</p>
              <p className="mt-1 text-sm text-blue-600">
                Open <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;