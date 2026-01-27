import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  Search, 
  User, 
  LogOut, 
  Settings,
  ChevronDown 
} from 'lucide-react';

import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";


const AdminNavbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const brandPurple = "#6739b7";
  const brandDark = "#1a237e";
  const dispatch = useDispatch();
const navigate = useNavigate();
const handleLogout = () => {
  dispatch(logout());       // Redux clear
  localStorage.clear();     // Persist clear
  navigate("/admin/login"); // Redirect
};


  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 w-full h-16 md:h-20 flex items-center px-4 md:px-8 shadow-sm">
      <div className="w-full flex justify-between items-center">
        
        {/* Left: Sidebar Toggle & Search */}
        <div className="flex items-center gap-4">
          

          
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-2 md:gap-5">
          
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Vertical Divider */}
          <div className="h-8 w-[1px] bg-gray-100 mx-1 hidden sm:block"></div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 md:pl-2 md:pr-1 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 outline-none"
            >
              <div className="hidden md:block text-right mr-1">
                <p className="text-xs font-bold" style={{ color: brandDark }}>Admin User</p>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Super Admin</p>
              </div>
              
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=100&auto=format&fit=crop" 
                  alt="Admin" 
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            <div className={`absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl py-2 transition-all duration-200 transform origin-top-right ${isProfileOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-bold text-gray-800">Taiyab Ali</p>
                <p className="text-[11px] text-gray-500 truncate">admin@mynursingadmission.com</p>
              </div>
              
              <NavLink to="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-[#6739b7] transition-colors">
                <User size={16} /> My Profile
              </NavLink>
              <NavLink to="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-[#6739b7] transition-colors">
                <Settings size={16} /> Account Settings
              </NavLink>
              
              <div className="border-t border-gray-50 mt-2 pt-2">
                <button
  onClick={handleLogout}
  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
>
  <LogOut size={16} /> Logout
</button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;