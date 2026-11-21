
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import AddCategory from './pages/AddCategory'
import ManageCategory from './pages/ManageCategory'
import AddAuthor from './pages/AddAuthor'
import ManageAuthor from './pages/ManageAuthor'
import AddBook from './pages/AddBook'
import ManageBooks from './pages/ManageBooks'
import AdminChangePassword from './pages/AdminChangePassword'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import StudentDashboard from './pages/StudentDashboard'
import StudentBook from './pages/StudentBooks'
import StudentProfile from './pages/StudentProfile'
import StudentChangePassword from './pages/StudentChangePassword'
import StudentIssuedBooks from './pages/StudentIssuedBooks'
import AdminIssuedBooks from './pages/AdminIssuedBooks'
import AdminStudents from './pages/AdminStudents'

function App() {

  return (
    <>
     <Header/>
     <ToastContainer position='top-right' autoClose={1000}/>
     <Routes>
      <Route path='/' element={<AdminLogin/>}/>
      <Route path='/admin' element={<Navigate to="/admin/login" replace />}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path='/admin/category/add' element={<AddCategory/>}/>
      <Route path='/admin/category/manage' element={<ManageCategory/>}/>
      <Route path='/admin/author/add' element={<AddAuthor/>}/>
       <Route path='/admin/author/manage' element={<ManageAuthor/>}/>
       <Route path='/admin/book/add' element={<AddBook/>}/>
       <Route path='/admin/book/manage' element={<ManageBooks/>}/>
       <Route path="/admin/change_password" element={<AdminChangePassword/>}/>
       <Route path="/admin/issued-books" element={<AdminIssuedBooks/>}/>
       <Route path="/admin/students" element={<AdminStudents/>}/>
       <Route path="/user/signup" element={<UserSignup/>}/>
       <Route path="/user/login" element={<UserLogin/>}/>
       <Route path='/user/dashboard' element={<StudentDashboard/>}/>
       <Route path='/user/books' element={<StudentBook/>}/>
       <Route path='/user/profile' element={<StudentProfile/>}/>
       <Route path='/user/change_password' element={<StudentChangePassword/>}/>
       <Route path='/user/issued-books' element={<StudentIssuedBooks/>}/>
       <Route path='*' element={<Navigate to="/admin/login" replace />}/>
     </Routes>
    </>
  )
}

export default App
