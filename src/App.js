import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate,useNavigate  } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AccountManagement from './pages/admin/AccountManager';
import ClassManagement from './pages/admin/ClassManagement';
import NotificationManagement from './pages/admin/NotificationManagement';
import StudentLayout from './components/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import CourseList from './pages/student/CourseList';
import AssignmentsAndExams from './pages/student/AssignmentsAndExams';
import LearningProgress from './pages/student/LearningProgress';
import StudentProfile from './pages/student/StudentProfile';
import InstructorLayout from './components/InstructorLayout';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import CourseManagement from './pages/instructor/CourseManagement';
import AssignmentsExams from './pages/instructor/AssignmentsExams'
import StudentProgress from './pages/instructor/StudentProgress';
import InstructorProfile from './pages/instructor/InstructorProfile';
import Notifications from './pages/instructor/Notifications'
import Coursess from './pages/Courses'
import About from './pages/About';
import Contact from './pages/Contact';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('token') !== null);
  const [role, setRole] = useState(sessionStorage.getItem('role')); // Đọc role từ localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token") !== null);
  const navigate = useNavigate(); // Initialize the navigate function


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    setIsLoggedIn(token !== null && role!==null);
  }, []);

  const handleLogin = (role, token) => {
    setIsAuthenticated(true);
    setRole(role);
    // sessionStorage.setItem('token', token); 
    sessionStorage.setItem('role', role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate('/'); // Redirect to the Home page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
        <Route 
            path="/" 
            element={isLoggedIn ? (
              role === "ROLE_ADMIN" ? <Navigate to="/admin" /> : 
              role === "ROLE_STUDENT" ? <Navigate to="/student" /> : 
              role === "ROLE_INSTRUCTOR" ? <Navigate to="/instructor" /> :
              <Navigate to="/login" />
            ) : <Home />} 
          />
          {/* Redirect Home if already logged in */}
          <Route 
            path="/" 
            element={isLoggedIn ? (
              role === "ROLE_ADMIN" ? <Navigate to="/admin" /> : 
              role === "ROLE_STUDENT" ? <Navigate to="/student" /> : 
              role === "ROLE_INSTRUCTOR" ? <Navigate to="/instructor" /> :
              <Navigate to="/login" />
            ) : <Home />} 
          />

          {/* Redirect to Dashboard if logged in */}
          <Route 
            path="/login" 
            element={isLoggedIn ? (
              role === "ROLE_ADMIN" ? <Navigate to="/admin" /> : 
              role === "ROLE_STUDENT" ? <Navigate to="/student" /> : 
              role === "ROLE_INSTRUCTOR" ? <Navigate to="/instructor" /> :
              <Navigate to="/home" />
            ) : <Login onLogin={handleLogin} />} 
          />
           <Route 
            path="/register" 
            element={isLoggedIn ? (
              role === "ROLE_ADMIN" ? <Navigate to="/admin" /> : 
              role === "ROLE_STUDENT" ? <Navigate to="/student" /> : 
              role === "ROLE_INSTRUCTOR" ? <Navigate to="/instructor" /> :
              <Navigate to="/home" />
            ) : <Register />} 
          />

          <Route path="/admin" element={isAuthenticated && role === "ROLE_ADMIN" ? <AdminLayout  isAuthenticated={isAuthenticated} role={role}/> : <Navigate to="/login" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="classes" element={<ClassManagement />} />
            <Route path="notifications" element={<NotificationManagement />} />
          </Route>

          <Route path="/student" element={isAuthenticated && role === "ROLE_STUDENT" ? <StudentLayout isAuthenticated={isAuthenticated} role={role} /> : <Navigate to="/login" />}>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="assignments" element={<AssignmentsAndExams />} />
            <Route path="progress" element={<LearningProgress />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          <Route path="/instructor" element={isAuthenticated && role === "ROLE_INSTRUCTOR" ? <InstructorLayout /> : <Navigate to="/login" />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="assignments" element={<AssignmentsExams />} />
            <Route path="progress" element={<StudentProgress />} />
            <Route path="notifications" element={<Notifications/>} />
            <Route path="profile" element={<InstructorProfile />} />
          </Route>
          <Route path="/courses" element={<Coursess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
