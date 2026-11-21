import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ManageBooks() {
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editAuthorId, setEditAuthorId] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editCoverFile, setEditCoverFile] = useState(null);
  const [editCoverUrl, setEditCoverUrl] = useState("");

  const [author, setAuthor] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin/login");
    } else {
      fetchAll();
    }
  }, []);

  const fetchAll = async () => {
    setLoadingList(true);
    try {
      const [bookRes, categoryRes, authorRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/book/"),
        axios.get("http://127.0.0.1:8000/api/categories/"),
        axios.get("http://127.0.0.1:8000/api/author/"),
      ]);

      setBook(bookRes.data);
      setCategory(categoryRes.data);
      setAuthor(authorRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load All");
    } finally {
      setLoadingList(false);
    }
  };

  const startEdit = (book) => {
    setEditId(book.id);
    setEditName(book.title || book.titel || "");
    setEditCategoryId(book.category || book.category_id || "");
    setEditAuthorId(book.author || book.author_id || "");
    setEditPrice(book.price || "");
    setEditIsbn(book.isbn || "");
    setEditQuantity(book.quantity || "");
    setEditCoverFile(null);
    setEditCoverUrl(book.cover_image || "");
  };

  const cancleEdit = () => {
    setEditId(null);
    setEditName("");
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete_book/${id}/`
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAll();
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
      const formData = new FormData();
      formData.append("title", editName);
      if (editCategoryId) formData.append("category", editCategoryId);
      if (editAuthorId) formData.append("author", editAuthorId);
      if (editIsbn) formData.append("isbn", editIsbn);
      if (editPrice !== "") formData.append("price", editPrice);
      if (editQuantity !== "") formData.append("quantity", editQuantity);
      if (editCoverFile) formData.append("cover_image", editCoverFile);

      const res = await axios.put(
        `http://127.0.0.1:8000/api/update_book/${editId}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Book updated");
        cancleEdit();
        fetchAll();
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

  const getFullUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `http://127.0.0.1:8000${path}`;
  };

  const getCoverUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `http://127.0.0.1:8000${path}`;
  };

  return (
    <div
      className="py-5 min-h-screen"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-semibold mb-1">
              <i className="fa-solid fa-layer-group text-blue-600"></i> Manage Books
            </h4>
            <p className="text-gray-500 text-sm">
              Manage the Books <code className="bg-gray-100 px-1 rounded text-xs">createsuperuser</code>
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/admin/book/add")}
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
                {editId ? "Edit Book" : "Select for edit"}
              </h6>
              {editId ? (
                <form onSubmit={HandleUpdate}>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      value={editCategoryId}
                      onChange={(e) => setEditCategoryId(e.target.value)}
                      disabled={category.length === 0}
                    >
                      <option value="">-- Select --</option>
                      {category.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1 text-gray-700">Author</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      value={editAuthorId}
                      onChange={(e) => setEditAuthorId(e.target.value)}
                      disabled={author.length === 0}
                    >
                      <option value="">-- Select --</option>
                      {author.map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1 text-gray-700">ISBN</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editIsbn}
                      onChange={(e) => setEditIsbn(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1 text-gray-700">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1 text-gray-700">Quantity</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-700">Cover Image</label>
                    {editCoverUrl && (
                      <div className="mb-2">
                        <img
                          src={getFullUrl(editCoverUrl)}
                          alt="cover"
                          className="w-[120px] h-[140px] object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      accept="image/*"
                      onChange={(e) => setEditCoverFile(e.target.files[0])}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      onClick={cancleEdit}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      disabled={saving}
                    >
                      {saving ? (
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-spinner fa-spin"></i>
                          Updating......
                        </span>
                      ) : (
                        <span>
                          <i className="fa-solid fa-check mr-1"></i> Update
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-gray-400 text-sm">
                  Click on edit button to modify the Book
                </p>
              )}
            </div>
          </div>

          {/* Table Panel */}
          <div className="col-span-8">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h6 className="font-semibold mb-3">Existing Books</h6>

              {book.length === 0 ? (
                <p className="text-gray-500 text-sm">No books found. Add from list</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-gray-500 text-xs">
                        <th className="py-2.5 pr-2 w-8">#</th>
                        <th className="py-2.5 pr-2">Name</th>
                        <th className="py-2.5 pr-2 w-16">Cover</th>
                        <th className="py-2.5 pr-2">Category</th>
                        <th className="py-2.5 pr-2">ISBN</th>
                        <th className="py-2.5 pr-2 w-16">Price</th>
                        <th className="py-2.5 pr-2">Author</th>
                        <th className="py-2.5 pr-2 w-16">Qty</th>
                        <th className="py-2.5 text-center w-40">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {book.map((cat, index) => (
                        <tr
                          key={cat.id}
                          className={`border-b last:border-0 ${
                            editId === cat.id ? "bg-blue-50" : "hover:bg-gray-50"
                          } transition-colors`}
                        >
                          <td className="py-2.5 pr-2 text-gray-600">{index + 1}</td>
                          <td className="py-2.5 pr-2 font-medium text-gray-800 max-w-[120px] truncate">
                            {cat.title || cat.titel}
                          </td>
                          <td className="py-2.5 pr-2">
                            {cat.cover_image ? (
                              <img
                                src={getCoverUrl(cat.cover_image)}
                                alt="cover"
                                className="w-[40px] h-[50px] object-cover rounded border border-gray-200"
                              />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-2.5 pr-2 text-gray-600">
                            {cat.category_name || cat.category || cat.category_id}
                          </td>
                          <td className="py-2.5 pr-2 text-gray-600">{cat.isbn}</td>
                          <td className="py-2.5 pr-2 text-gray-600">{cat.price}</td>
                          <td className="py-2.5 pr-2 text-gray-600">
                            {cat.author_name || cat.author || cat.author_id}
                          </td>
                          <td className="py-2.5 pr-2 text-gray-600">{cat.quantity}</td>
                          <td className="py-2.5">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="border border-blue-600 text-blue-600 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors"
                                onClick={() => startEdit(cat)}
                              >
                                <i className="fa-solid fa-pen-to-square mr-0.5"></i>
                                Edit
                              </button>
                              <button
                                className="border border-red-500 text-red-500 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors"
                                onClick={() => handleDelete(cat.id)}
                              >
                                <i className="fa-solid fa-trash mr-0.5"></i>
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

export default ManageBooks;