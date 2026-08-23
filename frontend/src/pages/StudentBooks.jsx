import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentBook = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("studentUser") || "null"
    );

    if (!storedUser) {
      navigate("/user/login");
      return;
    }

    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/user/books/");
        setBooks(res.data);
        setFilter(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      setFilter(books);
      return;
    }

    const filterBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );
    setFilter(filterBooks);
  }, [search, books]);

  return (
    <div
      className="py-5 min-h-screen"
      style={{ background: "linear-gradient(135deg, #f3f4ff, #fdfbff)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="font-semibold">
              <span className="text-blue-600">
                <i className="fa-solid fa-book"></i>
              </span>{" "}
              Available Books
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              Explore all the books in the library catalogue with quantity and
              availiability
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-64">
            <i className="fa-solid fa-magnifying-glass text-gray-400 mr-2"></i>
            <input
              type="text"
              className="flex-1 text-sm focus:outline-none bg-transparent placeholder-gray-400"
              placeholder="search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
            <p className="text-gray-500 text-sm mt-3">Loading....</p>
          </div>
        )}

        {/* Book Cards */}
        {!loading && filter.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filter.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-sm p-5 flex flex-col h-full"
              >
                <h6 className="font-semibold mb-1 truncate">{book.title}</h6>

                <p className="text-gray-500 text-sm mb-1">
                  <i className="fa-solid fa-user-pen mr-1"></i>
                  {book.author_name}
                </p>

                <p className="mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border border-blue-200 text-blue-600 bg-blue-50">
                    <i className="fa-solid fa-tag"></i>
                    {book.category_name}
                  </span>
                </p>

                <p className="text-sm text-gray-600 mb-1 flex items-center">
                  <i className="fa-solid fa-barcode mr-2"></i>
                  <span>ISBN: {book.isbn}</span>
                </p>

                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="font-semibold text-green-600">
                    {book.price}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      book.is_available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {book.is_available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filter.length === 0 && books.length > 0 && (
          <div className="text-center py-12">
            <i className="fa-solid fa-book-open text-4xl text-gray-300 mb-3"></i>
            <p className="text-gray-500 text-sm">No books match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentBook;