# 📚 Digital Library Management System

A full-stack **Digital Library Management System** built with **React.js** and **Django REST Framework**.

The application provides separate interfaces for **Administrators** and **Students** to manage books, authors, categories, student registration, authentication, and library statistics.

---

# ✨ Features

## 👨‍💼 Admin Panel

### Authentication

* Admin login
* Admin change password
* Login state management

### Category Management

* Add categories
* View categories
* Update categories
* Delete categories
* Manage category active/inactive status

### Author Management

* Add authors
* View authors
* Update authors
* Delete authors
* Inline editing interface

### Book Management

* Add books
* View books
* Update books
* Delete books
* Assign authors and categories
* ISBN management
* Price and quantity management
* Book cover image upload
* Multipart/FormData support

### Dashboard

* Library statistics
* Overview of available library data

---

## 🎓 Student Panel

### Registration

* Student signup
* Student ID
* Full name
* Email
* Mobile number
* Password validation

### Authentication

* Student login
* Login state stored using browser `localStorage`
* Protected student navigation

### Student Dashboard

* Total books
* Issued books
* Pending/unreturned books
* Student-specific library statistics

### Browse Books

* Display available books
* Search books by title
* Search books by author
* Book cover images
* Author information
* Category information
* ISBN
* Price
* Availability information

### In Progress

* My Library
* Issued Books
* Student Profile
* Student Change Password

---

# 🧭 Common Features

* Role-based navigation
* Responsive UI
* Mobile-friendly navigation
* Loading indicators
* Toast notifications
* Form validation
* API error handling
* Search functionality
* REST API integration
* Image upload support

---

# 🛠️ Tech Stack

## Frontend

| Technology       | Purpose                         |
| ---------------- | ------------------------------- |
| React.js 18      | Building user interfaces        |
| React Router DOM | Client-side routing             |
| Tailwind CSS     | Styling and responsive UI       |
| Axios            | HTTP requests                   |
| React Toastify   | Toast notifications             |
| Font Awesome     | Icons                           |
| Vite             | Frontend development/build tool |

## Backend

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| Python                | Backend programming language   |
| Django                | Web framework                  |
| Django REST Framework | REST API development           |
| SQLite                | Development database           |
| Django CORS Headers   | Frontend-backend communication |
| Pillow                | Image handling                 |

---

# 🏗️ Project Architecture

The project follows a separate frontend and backend architecture:

```text
React Frontend
      │
      │ HTTP / REST API
      ▼
Django REST Framework
      │
      ▼
Database
```

The React frontend communicates with Django through REST API endpoints using Axios.

---

# 📁 Project Structure

```text
digital-library-management-system/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   └── Header.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AddAuthor.jsx
│   │   │   ├── AddBook.jsx
│   │   │   ├── AddCategory.jsx
│   │   │   ├── AdminChangePassword.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── ManageAuthor.jsx
│   │   │   ├── ManageBooks.jsx
│   │   │   ├── ManageCategory.jsx
│   │   │   ├── StudentBooks.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   └── UserSignup.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── backend/
│   │
│   ├── library/
│   │   ├── models/
│   │   ├── serializers/
│   │   ├── views/
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── accounts/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
├── .gitignore
└── README.md
```

## Frontend Page Responsibilities

| File                      | Purpose                                |
| ------------------------- | -------------------------------------- |
| `AdminLogin.jsx`          | Admin authentication                   |
| `AdminDashboard.jsx`      | Admin dashboard and library statistics |
| `AdminChangePassword.jsx` | Change admin password                  |
| `AddCategory.jsx`         | Add a new category                     |
| `ManageCategory.jsx`      | View, update and delete categories     |
| `AddAuthor.jsx`           | Add a new author                       |
| `ManageAuthor.jsx`        | View, update and delete authors        |
| `AddBook.jsx`             | Add a new book with cover image        |
| `ManageBooks.jsx`         | View, update and delete books          |
| `UserSignup.jsx`          | Student registration                   |
| `UserLogin.jsx`           | Student login                          |
| `StudentDashboard.jsx`    | Student dashboard and statistics       |
| `StudentBooks.jsx`        | Browse and search books                |
| `Header.jsx`              | Navigation and login/logout handling   |
| `App.jsx`                 | Main React application and routing     |
| `main.jsx`                | React application entry point          |
| `App.css`                 | Application-specific styling           |
| `index.css`               | Global styling                         |


# 🚀 Getting Started

Follow the steps below to run the project locally.

## Prerequisites

Make sure the following are installed:

* **Python 3.10+**
* **Node.js 18+**
* **npm**
* **Git**

Verify the installations:

```bash
python --version
node --version
npm --version
git --version
```

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/digital-library-management-system.git
```

Move into the project directory:

```bash
cd digital-library-management-system
```

---

# 2️⃣ Backend Setup

Move into the backend directory:

```bash
cd backend
```

## Create a Virtual Environment

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

---

## Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Database Migrations

```bash
python manage.py migrate
```

---

## Create Django Superuser

```bash
python manage.py createsuperuser
```

Follow the instructions shown in the terminal.

---

## Start Django Server

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

---

# 3️⃣ Frontend Setup

Open another terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173/
```

---

# 🔗 API Endpoints

## 🔐 Authentication

| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| `POST` | `/api/admin/login/`           | Admin login           |
| `POST` | `/api/user/signup/`           | Student registration  |
| `POST` | `/api/user/login/`            | Student login         |
| `POST` | `/api/admin/change-password/` | Change admin password |

---

## 📂 Categories

| Method   | Endpoint                     | Description        |
| -------- | ---------------------------- | ------------------ |
| `GET`    | `/api/categories/`           | Get all categories |
| `POST`   | `/api/categories/add/`       | Create category    |
| `PUT`    | `/api/update_category/{id}/` | Update category    |
| `DELETE` | `/api/delete_category/{id}/` | Delete category    |

---

## ✍️ Authors

| Method   | Endpoint                   | Description     |
| -------- | -------------------------- | --------------- |
| `GET`    | `/api/author/`             | Get all authors |
| `POST`   | `/api/author/add/`         | Create author   |
| `PUT`    | `/api/update_author/{id}/` | Update author   |
| `DELETE` | `/api/delete_author/{id}/` | Delete author   |

---

## 📚 Books

| Method   | Endpoint                 | Description                |
| -------- | ------------------------ | -------------------------- |
| `GET`    | `/api/book/`             | Get all books              |
| `GET`    | `/api/user/books/`       | Get books for student view |
| `POST`   | `/api/book/add/`         | Add a book                 |
| `PUT`    | `/api/update_book/{id}/` | Update a book              |
| `DELETE` | `/api/delete_book/{id}/` | Delete a book              |

Book creation and update support:

```text
multipart/form-data
```

for cover image uploads.

---

## 🎓 Student

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| `GET`  | `/api/user/stats/` | Get student dashboard statistics |

The student statistics API provides information such as:

* Total books
* Issued books
* Unreturned books

---

# 🔐 Authentication & Login State

The application currently maintains the student login state using browser `localStorage`.

After successful login, student information is stored in the browser:

```javascript
localStorage.setItem(
    "studentUser",
    JSON.stringify(res.data.user)
);
```

The application can check the login state using:

```javascript
const student = localStorage.getItem("studentUser");
```

Admin and student login states are handled separately.

> **Note:** For a production application, authentication can be upgraded to JWT or secure HTTP-only cookie-based authentication.

---

# 📊 Current Project Status

| Feature                 | Status         |
| ----------------------- | -------------- |
| Admin Login             | ✅ Completed    |
| Student Signup          | ✅ Completed    |
| Student Login           | ✅ Completed    |
| Category CRUD           | ✅ Completed    |
| Author CRUD             | ✅ Completed    |
| Book CRUD               | ✅ Completed    |
| Book Image Upload       | ✅ Completed    |
| Admin Dashboard         | ✅ Completed    |
| Student Dashboard       | ✅ Completed    |
| Student Book Search     | ✅ Completed    |
| Student Book Listing    | ✅ Completed    |
| My Library              | 🚧 In Progress |
| Issued Books            | 🚧 In Progress |
| Student Profile         | 🚧 In Progress |
| Student Change Password | 🚧 In Progress |
| Book Issue/Return       | 🚧 Planned     |

---

# 🔮 Future Enhancements

* 📖 Complete book issuing system
* 🔄 Book return functionality
* ⏰ Due-date management
* 💰 Late-return fine calculation
* 👨‍🎓 Admin student management
* 👤 Student profile management
* 🔐 Student change password
* 🔑 Forgot password / password reset
  
* 📑 Table pagination
* 🌙 Dark mode
* 🔔 Real-time notifications
* 🔐 JWT authentication
* 🍪 HTTP-only cookie authentication
* 🧪 Unit and integration testing
* 🐳 Docker deployment
* 🌐 Production deployment with Nginx

---

# 🧪 Error Handling & User Experience

The application includes:

* Loading indicators during API requests
* Success and error toast notifications
* Required-field validation
* Password confirmation validation
* Minimum password length validation
* API error handling
* Empty-data handling
* Responsive navigation
* Search functionality

---

# 🗃️ Database

The project currently uses **SQLite** for development.

The database contains information related to:

* Students
* Books
* Authors
* Categories
* Issued book/library records

For production deployment, the database can be migrated to PostgreSQL or another supported relational database.

---



# 📝 Git Workflow

After making changes:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Update library management features"
```

Push:

```bash
git push origin main
```

---

# 🌐 Deployment

The project can be deployed using:

### Frontend

* Vercel
* Netlify

### Backend

* Render
* Railway
* Other Django-compatible hosting platforms

### Database

* PostgreSQL
* Managed PostgreSQL services

Before production deployment, configure:

* Environment variables
* CORS
* Allowed hosts
* Production database
* Static files
* Media files
* Secure authentication
* HTTPS

---

# 🤝 Contributing

Contributions and suggestions are welcome.

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

Make your changes:

```bash
git add .
git commit -m "Add new feature"
```

Push the branch:

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Anshu Maurya**

* GitHub: `https://github.com/Anshu-Maurya`
* LinkedIn: `https://www.linkedin.com/in/anshu-maurya-248002294/`
* Portfolio: `YOUR_PORTFOLIO_URL`

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📌 Learning Project

This project was developed as a full-stack learning project to practice:

* React.js
* React Router
* Tailwind CSS
* REST APIs
* Django
* Django REST Framework
* CRUD operations
* Database relationships
* Authentication
* Axios
* File/image uploads
* Frontend-backend integration
* Git and GitHub

The project will continue to evolve as additional library management features are implemented.
