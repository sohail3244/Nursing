import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";



import Login from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import AdminColleges from "../pages/Admin/AdminColleges";
import AdminCourses from "../pages/Admin/AdminColleges";
import AdminBlog from "../pages/Admin/AdminBlog";
import AdminLayout from "../layouts/AdminLayout";

const AdminRoutes = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/admin/dashboard" /> : <Login />}
      />

      {/* Protected Admin Layout */}
      <Route
        path="/"
        element={isAuth ? <AdminLayout /> : <Navigate to="/admin/login" />}
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin-colleges" element={<AdminColleges />} />
        <Route path="admin-courses" element={<AdminCourses />} />
        <Route path="admin-blog" element={<AdminBlog />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
