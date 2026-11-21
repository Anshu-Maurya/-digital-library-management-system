import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminIssuedBooks() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminUser")) {
      navigate("/admin/login");
      return;
    }

    fetchIssues();
  }, [navigate]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/api/admin/issued-books/");
      setIssues(res.data.issues);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load issued books");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (issueId) => {
    setReturningId(issueId);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/admin/return-book/", {
        issue_id: issueId,
      });
      toast.success(res.data.message || "Book returned successfully");
      setIssues((currentIssues) =>
        currentIssues.map((issue) =>
          issue.id === issueId
            ? { ...issue, is_return: true, retrun_at: new Date().toISOString() }
            : issue
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to return book");
    } finally {
      setReturningId(null);
    }
  };

  return (
    <div
      className="min-h-screen py-5"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <h4 className="font-semibold">
            <i className="fa-solid fa-arrow-right-arrow-left mr-2 text-blue-600"></i>
            Issued Books
          </h4>
          <p className="mt-1 text-sm text-gray-500">
            View and complete student book returns
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {loading ? (
            <div className="py-12 text-center">
              <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
            </div>
          ) : issues.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              No issued books found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Book</th>
                    <th className="px-4 py-3">Issued</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-800">{issue.student_name}</p>
                        <p className="text-xs text-gray-500">{issue.student_id}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-800">{issue.title}</p>
                        <p className="text-xs text-gray-500">
                          {issue.author_name} | ISBN: {issue.isbn}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {new Date(issue.issued_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            issue.is_return
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {issue.is_return ? "Returned" : "Not Returned"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {!issue.is_return && (
                          <button
                            type="button"
                            onClick={() => handleReturn(issue.id)}
                            disabled={returningId === issue.id}
                            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {returningId === issue.id ? (
                              <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              <>
                                <i className="fa-solid fa-check mr-1"></i>
                                Mark Returned
                              </>
                            )}
                          </button>
                        )}
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

export default AdminIssuedBooks;
