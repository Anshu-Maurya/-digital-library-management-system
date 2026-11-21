import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminUser")) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/admin/students/")
      .then((res) => {
        setStudents(res.data.students);
        setTotalStudents(res.data.total_students);
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || "Failed to load students")
      )
      .finally(() => setLoading(false));
  }, [navigate]);

  const visibleStudents = students.filter((student) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      student.full_name.toLowerCase().includes(term) ||
      student.student_id.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term)
    );
  });

  return (
    <div
      className="min-h-screen py-5"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold">
              <i className="fa-solid fa-users mr-2 text-blue-600"></i>
              Students
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              {totalStudents} registered student{totalStudents === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex w-full items-center rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm sm:w-72">
            <i className="fa-solid fa-magnifying-glass mr-2 text-gray-400"></i>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search student..."
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {loading ? (
            <div className="py-12 text-center">
              <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
            </div>
          ) : visibleStudents.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              {students.length === 0
                ? "No student accounts found."
                : "No students match your search."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Registered</th>
                    <th className="px-4 py-3">Issued</th>
                    <th className="px-4 py-3">Pending Return</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-800">
                          {student.full_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student.student_id}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-gray-700">{student.email}</p>
                        <p className="text-xs text-gray-500">
                          {student.mobile}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {new Date(student.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {student.total_issued}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            student.active_issued > 0
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {student.active_issued}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            student.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminStudents;
