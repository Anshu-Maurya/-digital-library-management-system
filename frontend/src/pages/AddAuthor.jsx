import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddAuthor() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin/login");
    } else {
      fetchAuthor();
    }
  }, []);

  const fetchAuthor = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/author/");
      setAuthor(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load author");
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/author/add/",
        { name }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Author Created");
        setName("");
        fetchAuthor();
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
      className="py-5 min-h-screen"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="max-w-5xl mx-auto px-4 min-w-[620px]">
        {/* Heading */}
        <div className="text-center mb-6">
          <h4 className="font-semibold mb-1">
            <i className="fa-solid fa-layer-group text-blue-600"></i> Add Author
          </h4>
          <p className="text-gray-500 text-sm">
            Add the Author <code className="bg-gray-100 px-1 rounded text-xs">createsuperuser</code>
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-12 gap-4">
          {/* Form Card */}
          <div className="col-span-5">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <form onSubmit={HandleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    AuthorName
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g Dr.Ramesh"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      Adding......
                    </span>
                  ) : (
                    <span>
                      <i className="fa-solid fa-plus mr-1"></i> Add Author
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Table Card */}
          <div className="col-span-7">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h6 className="font-semibold mb-3">Existing Author</h6>

              {author.length === 0 ? (
                <p className="text-gray-500 text-sm">No Author found. Add from list</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-gray-500">
                        <th className="py-2 pr-3">#</th>
                        <th className="py-2 pr-3">Name</th>
                        <th className="py-2">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {author.map((cat, index) => (
                        <tr key={cat.id} className="border-b last:border-0">
                          <td className="py-2 pr-3">{index + 1}</td>
                          <td className="py-2 pr-3">{cat.name}</td>
                          <td className="py-2">
                            {new Date(cat.created_at).toLocaleDateString()}
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
      </div>
    </div>
  );
}

export default AddAuthor;