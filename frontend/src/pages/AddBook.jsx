import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isbn, setISBSN] = useState("");
  const [price, setPrise] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [author, setAuthor] = useState("");
  const [authors, setAuthors] = useState([]);

  const [coverFile, setCoverFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingDropdown, setLoadingDropdown] = useState(false);

  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin/login");
    } else {
      fetchDropdownData();
    }
  }, []);

  const fetchDropdownData = async () => {
    setLoadingDropdown(true);
    try {
      const [authorRes, categoryRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/author/"),
        axios.get("http://127.0.0.1:8000/api/categories/"),
      ]);

      setAuthors(authorRes.data || []);
      setCategories((categoryRes.data || []).filter((c) => c.is_active));
    } catch (error) {
      console.error("Dropdown load failed:", error);
      toast.error("Failed to load author and category data");
    } finally {
      setLoadingDropdown(false);
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("category", category);
    formdata.append("isbn", isbn);
    formdata.append("price", price);
    formdata.append("author", author);
    formdata.append("quantity", quantity);
    if (coverFile) {
      formdata.append("cover_image", coverFile);
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/book/add/",
        formdata
      );

      if (res.data.success) {
        toast.success(res.data.message || "Book Added Successfully");
        setAuthor("");
        setCategory("");
        setISBSN("");
        setPrise("");
        setQuantity("");
        setCoverFile(null);
        setTitle("");
        fetchDropdownData();
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
      <div className="max-w-4xl mx-auto px-4 min-w-[620px]">
        {/* Heading */}
        <div className="text-center mb-6">
          <h4 className="font-semibold mb-1">
            <i className="fa-solid fa-book text-blue-600"></i> Add Book
          </h4>
          <p className="text-gray-500 text-sm">
            Add the Book <code className="bg-gray-100 px-1 rounded text-xs">createsuperuser</code>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {loadingDropdown ? (
            <div className="text-center py-10">
              <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
            </div>
          ) : (
            <form onSubmit={HandleSubmit}>
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Book Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter book name"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    ISBN
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter ISBN"
                    required
                    value={isbn}
                    onChange={(e) => setISBSN(e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Author
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  >
                    <option value="">Select Author</option>
                    {authors.map((auth) => (
                      <option key={auth.id} value={auth.id}>
                        {auth.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files[0])}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter price"
                    required
                    value={price}
                    onChange={(e) => setPrise(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter quantity"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Adding...
                  </span>
                ) : (
                  <span>
                    <i className="fa-solid fa-plus mr-1"></i> Submit
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddBook;