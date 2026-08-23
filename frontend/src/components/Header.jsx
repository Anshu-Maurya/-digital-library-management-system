import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const adminUser = localStorage.getItem("adminUser");
  const studentUser = localStorage.getItem("studentUser");
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const handleStudentLogout = () => {
    localStorage.removeItem("studentUser");
    navigate("/user/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-blue-600 font-semibold" : "";

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const navButtonClass =
    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100 lg:w-auto lg:rounded-lg lg:px-3 lg:py-2";

  const dropdownButtonClass =
    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100 lg:w-auto lg:justify-start lg:rounded-lg lg:px-3 lg:py-2";

  const submenuLinkClass =
    "flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl">
              <i className="fa-solid fa-book-open-reader"></i>
            </span>
            <span className="font-bold text-lg">Digital Library</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-gray-600 text-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>

          {/* Nav Links */}
          <div
            className={`${
              mobileOpen ? "flex" : "hidden"
            } absolute left-0 right-0 top-full z-40 flex-col gap-1 border-b bg-white px-4 pb-4 pt-3 shadow-lg lg:static lg:z-auto lg:flex lg:w-auto lg:flex-row lg:items-center lg:justify-end lg:gap-1 lg:border-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:shadow-none lg:mt-0`}
          >
            {/* Guest Menu */}
            {!adminUser && !studentUser && (
              <>
                <Link
                  to="/"
                  className={`${navButtonClass} ${isActive("/")}`}
                >
                  <i className="fa-solid fa-home w-5 text-center"></i>
                  <span>Home</span>
                </Link>
                <Link
                  to="/user/login"
                  className={`${navButtonClass} ${isActive("/user/login")}`}
                >
                  <i className="fa-solid fa-user w-5 text-center"></i>
                  <span>User Login</span>
                </Link>
                <Link
                  to="/user/signup"
                  className={`${navButtonClass} ${isActive("/user/signup")}`}
                >
                  <i className="fa-solid fa-user-plus w-5 text-center"></i>
                  <span>User Signup</span>
                </Link>
                <Link
                  to="/admin/login"
                  className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 lg:ml-2 lg:rounded-lg lg:px-4 lg:py-2"
                >
                  <i className="fa-solid fa-shield-halved w-5 text-center"></i>
                  <span>Admin Login</span>
                </Link>
              </>
            )}

            {/* Admin Menu */}
            {adminUser && (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`${navButtonClass} ${isActive("/admin/dashboard")}`}
                >
                  <i className="fa-solid fa-gauge-high w-5 text-center"></i>
                  <span>Dashboard</span>
                </Link>

                {/* Categories Dropdown */}
                <div className="relative w-full lg:w-auto">
                  <button
                    onClick={() => toggleDropdown("category")}
                    className={dropdownButtonClass}
                  >
                    <i className="fa-solid fa-layer-group w-5 text-center"></i>
                    <span className="flex-1 text-left">Categories</span>
                    <i className="fa-solid fa-chevron-down text-xs text-slate-500"></i>
                  </button>
                  {openDropdown === "category" && (
                    <div className="mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:absolute lg:right-0 lg:top-full lg:mt-1 lg:min-w-45 lg:w-auto z-50">
                      <Link
                        to="/admin/category/add"
                        className={submenuLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fa-solid fa-plus w-5 text-center text-slate-500"></i>
                        <span>Add Category</span>
                      </Link>
                      <Link
                        to="/admin/category/manage"
                        className={submenuLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fa-solid fa-list w-5 text-center text-slate-500"></i>
                        <span>Manage Category</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Author Dropdown */}
                <div className="relative w-full lg:w-auto">
                  <button
                    onClick={() => toggleDropdown("author")}
                    className={dropdownButtonClass}
                  >
                    <i className="fa-solid fa-user-pen w-5 text-center"></i>
                    <span className="flex-1 text-left">Author</span>
                    <i className="fa-solid fa-chevron-down text-xs text-slate-500"></i>
                  </button>
                  {openDropdown === "author" && (
                    <div className="mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:absolute lg:right-0 lg:top-full lg:mt-1 lg:min-w-45 lg:w-auto z-50">
                      <Link
                        to="/admin/author/add"
                        className={submenuLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fa-solid fa-plus w-5 text-center text-slate-500"></i>
                        <span>Add Author</span>
                      </Link>
                      <Link
                        to="/admin/author/manage"
                        className={submenuLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fa-solid fa-list w-5 text-center text-slate-500"></i>
                        <span>Manage Author</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Book Dropdown */}
                <div className="relative w-full lg:w-auto">
                  <button
                    onClick={() => toggleDropdown("book")}
                    className={dropdownButtonClass}
                  >
                    <i className="fa-solid fa-book w-5 text-center"></i>
                    <span className="flex-1 text-left">Book</span>
                    <i className="fa-solid fa-chevron-down text-xs text-slate-500"></i>
                  </button>
                  {openDropdown === "book" && (
                    <div className="mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:absolute lg:right-0 lg:top-full lg:mt-1 lg:min-w-45 lg:w-auto z-50">
                      <Link
                        to="/admin/book/add"
                        className={submenuLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fa-solid fa-plus w-5 text-center text-slate-500"></i>
                        <span>Add Book</span>
                      </Link>
                      <Link
                        to="/admin/book/manage"
                        className={submenuLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fa-solid fa-list w-5 text-center text-slate-500"></i>
                        <span>Manage Book</span>
                      </Link>
                      <Link
                        to="/admin/category/add"
                        className={submenuLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fa-solid fa-arrow-right-arrow-left w-5 text-center text-slate-500"></i>
                        <span>Issued Book</span>
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/admin/dashboard"
                  className={navButtonClass}
                >
                  <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
                  <span>Issue Book</span>
                </Link>

                <Link
                  to="/admin/dashboard"
                  className={navButtonClass}
                >
                  <i className="fa-solid fa-users w-5 text-center"></i>
                  <span>Student</span>
                </Link>

                <Link
                  to="/admin/change_password"
                  className={`${navButtonClass} ${isActive("/admin/change_password")}`}
                >
                  <i className="fa-solid fa-key w-5 text-center"></i>
                  <span>Change Password</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 lg:w-auto lg:rounded-lg lg:px-3 lg:py-2"
                >
                  <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
                  <span>Logout</span>
                </button>
              </>
            )}

            {/* Student Menu */}
            {studentUser && (
              <>
                <Link
                  to="/user/dashboard"
                  className={`${navButtonClass} ${isActive("/user/dashboard")}`}
                >
                  <i className="fa-solid fa-gauge w-5 text-center"></i>
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/user/books"
                  className={`${navButtonClass} ${isActive("/user/books")}`}
                >
                  <i className="fa-solid fa-book-open w-5 text-center"></i>
                  <span>My Library</span>
                </Link>

                <Link
                  to="/user/issued-books"
                  className={`${navButtonClass} ${isActive("/user/issued-books")}`}
                >
                  <i className="fa-solid fa-receipt w-5 text-center"></i>
                  <span>Issued Book</span>
                </Link>

                {/* Account Dropdown */}
                <div className="relative w-full lg:w-auto">
                  <button
                    onClick={() => toggleDropdown("account")}
                    className={dropdownButtonClass}
                  >
                    <i className="fa-solid fa-circle-users w-5 text-center"></i>
                    <span className="flex-1 text-left">My Account</span>
                    <i className="fa-solid fa-chevron-down text-xs text-slate-500"></i>
                  </button>
                  {openDropdown === "account" && (
                    <div className="mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:absolute lg:right-0 lg:top-full lg:mt-1 lg:min-w-45 lg:w-auto z-50">
                      <Link
                        to="/user/profile"
                        className={submenuLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fa-solid fa-id-badge w-5 text-center text-slate-500"></i>
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/user/change_password"
                        className={submenuLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <i className="fa-solid fa-key w-5 text-center text-slate-500"></i>
                        <span>Change Password</span>
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleStudentLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                      >
                        <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;