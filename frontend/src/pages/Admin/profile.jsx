import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, X, Loader2, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Initial Data
  const [userData, setUserData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@mynursingadmission.com",
    username: "admin_educateme",
    password: "password123" // Real app mein password masked ya empty hona chahiye initial load par
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // API Call Simulate
    setTimeout(() => {
      setUserData(tempData);
      setIsEditing(false);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100 overflow-hidden border border-gray-100">
          
          {/* Header Banner */}
          <div className="h-24 bg-gradient-to-r from-[#1a237e] to-[#6739b7] flex items-center px-8">
            <h1 className="text-white text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="opacity-80" /> Account Settings
            </h1>
          </div>

          <div className="p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 border-b border-gray-50 pb-6">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-[#1a237e]">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-gray-500 text-sm">@{userData.username}</p>
              </div>
              
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-indigo-50 text-[#1a237e] font-bold rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2"
                >
                  Edit Profile
                </button>
              ) : (
                <button 
                  onClick={() => { setIsEditing(false); setTempData(userData); }}
                  className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                >
                  <X size={24} />
                </button>
              )}
            </div>

            {/* Form Section */}
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* First Name */}
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                  <input 
                    disabled={!isEditing}
                    value={tempData.firstName}
                    onChange={(e) => setTempData({...tempData, firstName: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all
                      ${isEditing ? 'border-purple-200 focus:ring-2 focus:ring-purple-500 bg-white' : 'border-transparent bg-gray-50 text-gray-500'}`}
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                  <input 
                    disabled={!isEditing}
                    value={tempData.lastName}
                    onChange={(e) => setTempData({...tempData, lastName: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all
                      ${isEditing ? 'border-purple-200 focus:ring-2 focus:ring-purple-500 bg-white' : 'border-transparent bg-gray-50 text-gray-500'}`}
                  />
                </div>

                {/* Username */}
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <User size={14} className="text-[#6739b7]" /> Username
                  </label>
                  <input 
                    disabled={!isEditing}
                    value={tempData.username}
                    onChange={(e) => setTempData({...tempData, username: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all
                      ${isEditing ? 'border-purple-200 focus:ring-2 focus:ring-purple-500 bg-white' : 'border-transparent bg-gray-50 text-gray-500'}`}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <Mail size={14} className="text-[#6739b7]" /> Email
                  </label>
                  <input 
                    disabled={!isEditing}
                    type="email"
                    value={tempData.email}
                    onChange={(e) => setTempData({...tempData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all
                      ${isEditing ? 'border-purple-200 focus:ring-2 focus:ring-purple-500 bg-white' : 'border-transparent bg-gray-50 text-gray-500'}`}
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <Lock size={14} className="text-[#6739b7]" /> Password
                  </label>
                  <div className="relative">
                    <input 
                      disabled={!isEditing}
                      type={showPassword ? "text" : "password"}
                      value={tempData.password}
                      onChange={(e) => setTempData({...tempData, password: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all pr-12
                        ${isEditing ? 'border-purple-200 focus:ring-2 focus:ring-purple-500 bg-white' : 'border-transparent bg-gray-50 text-gray-500'}`}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6739b7] transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              {isEditing && (
                <div className="pt-4 flex gap-3">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3.5 bg-[#1a237e] text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-[#283593] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                    {isLoading ? "Saving..." : "Update Account"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-gray-400 text-sm">
          Last login detected from Jaipur, IN • Feb 2026
        </p>
      </div>
    </div>
  );
};

export default Profile;