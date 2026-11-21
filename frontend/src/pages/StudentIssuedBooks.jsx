import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function StudentIssuedBooks() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const studentUser = JSON.parse(localStorage.getItem("studentUser") || "null");
    if (!studentUser) {
      navigate("/user/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/user/issued-books/", {
        params: { student_id: studentUser.student_id },
      })
      .then((res) => setIssues(res.data.issues))
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load issued books"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleReturn = async (issueId) => {
    const studentUser = JSON.parse(localStorage.getItem("studentUser") || "null");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/user/return-book/", {
        student_id: studentUser.student_id,
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
    }
  };

  return (
    <div className="min-h-screen py-5" style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <h4 className="font-semibold">
            <i className="fa-solid fa-receipt mr-2 text-blue-600"></i>
            Issued Books
          </h4>
          <p className="mt-1 text-sm text-gray-500">View your issue history and pending returns</p>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
          </div>
        ) : issues.length === 0 ? (
          <div className="rounded-2xl bg-white py-12 text-center shadow-sm">
            <i className="fa-solid fa-book-open mb-3 text-4xl text-gray-300"></i>
            <p className="text-sm text-gray-500">You have no issued books.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <div key={issue.id} className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm">
                <h6 className="mb-2 truncate font-semibold">{issue.title}</h6>
                <p className="mb-1 text-sm text-gray-500">
                  <i className="fa-solid fa-user-pen mr-2"></i>
                  {issue.author_name}
                </p>
                <p className="mb-1 text-sm text-gray-600">
                  <i className="fa-solid fa-barcode mr-2"></i>
                  ISBN: {issue.isbn}
                </p>
                <p className="mb-3 text-sm text-gray-600">
                  <i className="fa-solid fa-calendar-days mr-2"></i>
                  Issued: {new Date(issue.issued_at).toLocaleDateString()}
                </p>
                <div className="mt-auto">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    issue.is_return
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {issue.is_return ? "Returned" : "Not Returned"}
                  </span>
                  {!issue.is_return && (
                    <button
                      type="button"
                      onClick={() => handleReturn(issue.id)}
                      className="ml-3 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      <i className="fa-solid fa-arrow-right-arrow-left mr-1"></i>
                      Return
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentIssuedBooks;
