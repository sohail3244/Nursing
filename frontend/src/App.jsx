import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/PublicPages/Home";
import YoutubeAd from "./pages/PublicPages/YoutubeAd";
import About from "./pages/PublicPages/About";
import Colleges from "./pages/PublicPages/Colleges";
import Blog from "./pages/PublicPages/Blog";
import Contact from "./pages/PublicPages/Contact";
import PrivacyPolicy from "./pages/PublicPages/PrivacyPolicy";
import PopularColleges from "./pages/PublicPages/PopularColleges";
import PopularCourses from "./pages/PublicPages/PopularCourses";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminColleges from "./pages/Admin/AdminColleges";
import AdminCourses from "./pages/Admin/AdminCourses";
import AdminBlog from "./pages/Admin/AdminBlog";


  function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
         <Route path="youtube-ad" element={<YoutubeAd />} />
         <Route path="about" element={<About />} />
         <Route path="colleges" element={<Colleges />} />
         <Route path="blog" element={<Blog />} />
         <Route path="contact" element={<Contact />} />
         <Route path="privacy-policy" element={<PrivacyPolicy />} />
         <Route path="popular-colleges" element={<PopularColleges />} />
         <Route path="popular-courses" element={<PopularCourses />} />
        </Route>

        {/* 🔐 ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="admin-colleges" element={<AdminColleges />} />
        <Route path="admin-courses" element={<AdminCourses />} />
        <Route path="admin-blog" element={<AdminBlog />} />
        </Route>
    </Routes>
  );
}

export default App;
