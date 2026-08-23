import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ManageAuthor() {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const [author, setAuthor] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
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
    setLoadingList(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/author/");
      setAuthor(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load author");
    } finally {
      setLoadingList(false);
    }
  };

  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
  };

  const cancleEdit = () => {
    setEditId(null);
    setEditName("");
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete_author/${id}/`
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAuthor();
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const HandleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/update_author/${editId}/`,
        { name: editName }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Author updated");
        cancleEdit();
        fetchAuthor();
      } else {
        toast.error(res.data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="py-5 min-h-screen"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="max-w-5xl mx-auto px-4 min-w-[620px]">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-semibold mb-1">
              <i className="fa-solid fa-layer-group text-blue-600"></i> Manage Author
            </h4>
            <p className="text-gray-500 text-sm">
              Manage the Author <code className="bg-gray-100 px-1 rounded text-xs">createsuperuser</code>
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/admin/author/add")}
          >
            Add New
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-5">
          {/* Edit Panel */}
          <div className="col-span-4">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h6 className="font-semibold mb-3">
                {editId ? "Edit Author" : "Select for edit"}
              </h6>
              {editId ? (
                <form onSubmit={HandleUpdate}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      AuthorName
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g Programming,Science"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors mb-2"
                    onClick={() => cancleEdit()}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Updating......
                      </span>
                    ) : (
                      <span>
                        <i className="fa-solid fa-check mr-1"></i> Update
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                <p className="text-gray-400 text-sm">
                  Click on edit button to modify the Author
                </p>
              )}
            </div>
          </div>

          {/* Table Panel */}
          <div className="col-span-8">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h6 className="font-semibold mb-3">Existing Author</h6>

              {author.length === 0 ? (
                <p className="text-gray-500 text-sm">No author found. Add from list</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-gray-500 text-xs">
                        <th className="py-2.5 pr-3 w-10">#</th>
                        <th className="py-2.5 pr-3">Name</th>
                        <th className="py-2.5 pr-3 w-28">Created</th>
                        <th className="py-2.5 pr-3 w-28">Updated</th>
                        <th className="py-2.5 text-center w-44">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {author.map((cat, index) => (
                        <tr
                          key={cat.id}
                          className={`border-b last:border-0 ${
                            editId === cat.id ? "bg-blue-50" : "hover:bg-gray-50"
                          } transition-colors`}
                        >
                          <td className="py-2.5 pr-3 text-gray-600">{index + 1}</td>
                          <td className="py-2.5 pr-3 font-medium text-gray-800">
                            {cat.name}
                          </td>
                          <td className="py-2.5 pr-3 text-gray-600 text-xs">
                            {new Date(cat.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-2.5 pr-3 text-gray-600 text-xs">
                            {new Date(cat.updated_at).toLocaleDateString()}
                          </td>
                          <td className="py-2.5">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="border border-blue-600 text-blue-600 px-3 py-1 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors"
                                onClick={() => startEdit(cat)}
                              >
                                <i className="fa-solid fa-pen-to-square mr-1"></i>
                                Edit
                              </button>
                              <button
                                className="border border-red-500 text-red-500 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors"
                                onClick={() => handleDelete(cat.id)}
                              >
                                <i className="fa-solid fa-trash mr-1"></i>
                                Delete
                              </button>
                            </div>
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

export default ManageAuthor;