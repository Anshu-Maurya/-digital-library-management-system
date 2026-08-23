import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin/login");
    } else {
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories/");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/categories/add/",
        { name, status }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Category Created");
        setStatus("");
        setName("");
        fetchCategories();
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
        {/* Header */}
        <div className="text-center mb-6">
          <h4 className="font-semibold mb-1">
            <i className="fa-solid fa-layer-group text-blue-600"></i> Add Category
          </h4>
          <p className="text-gray-500 text-sm">
            Create new book categories manage their active status
            <code className="bg-gray-100 px-1 rounded text-xs ml-1">createsuperuser</code>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-5">
          {/* Form Section */}
          <div className="col-span-5">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <form onSubmit={HandleSubmit}>
                {/* Category Name Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">
                    CategoryName
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g Programming,Science"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Status Radio Buttons */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Status
                  </label>
                  <div className="flex items-center gap-6">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        value="1"
                        checked={status === "1"}
                        onChange={(e) => setStatus(e.target.value)}
                        name="status"
                      />
                      <span className="text-sm text-gray-600">Active</span>
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        value="0"
                        checked={status === "0"}
                        onChange={(e) => setStatus(e.target.value)}
                        name="status"
                      />
                      <span className="text-sm text-gray-600">Inactive</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      Creating......
                    </span>
                  ) : (
                    <span>
                      <i className="fa-solid fa-plus mr-1"></i> Create Category
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Categories Table Section */}
          <div className="col-span-7">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h6 className="font-semibold mb-4 text-gray-800">Existing Categroies</h6>
              
              {categories.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">
                  No categories found. Add from list
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2.5 pr-4 font-medium text-gray-600 w-10">#</th>
                        <th className="text-left py-2.5 pr-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-2.5 pr-4 font-medium text-gray-600 w-28">Status</th>
                        <th className="text-left py-2.5 font-medium text-gray-600 w-28">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((cat, index) => (
                        <tr key={cat.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="py-2.5 pr-4 text-gray-600">{index + 1}</td>
                          <td className="py-2.5 pr-4 font-medium text-gray-800">{cat.name}</td>
                          <td className="py-2.5 pr-4">
                            {cat.is_active ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 text-gray-600">
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

export default AddCategory;