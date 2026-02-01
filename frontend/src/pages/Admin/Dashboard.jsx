import React from 'react';
import { 
  Users, 
  GraduationCap, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  MoreVertical 
} from 'lucide-react';
import { useMe } from '../../hooks/useUser';

function Dashboard() {
  const brandDark = "#1a237e";
  const brandPurple = "#6739b7";

  
  const { data, isLoading } = useMe();

  if (isLoading) return null;


  return (
    <div className="p-4 md:p-8 bg-[#fbfbff] min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
      <h1 className="text-2xl md:text-3xl font-black" style={{ color: brandDark }}>
        Welcome back, {data?.data?.name}!
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        Here's what's happening with your nursing admissions today.
      </p>
    </div>
        
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[2rem] border border-purple-50 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 rounded-2xl text-[#6739b7]">
              <GraduationCap size={24} />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-50 px-2 py-1 rounded-lg">
              +12% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Colleges</h3>
          <p className="text-3xl font-black mt-1" style={{ color: brandDark }}>2,450</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-purple-50 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Users size={24} />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-50 px-2 py-1 rounded-lg">
              +5% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Active Students</h3>
          <p className="text-3xl font-black mt-1" style={{ color: brandDark }}>35,200</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-purple-50 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
              <FileText size={24} />
            </div>
            <span className="text-red-500 text-xs font-bold flex items-center bg-red-50 px-2 py-1 rounded-lg">
              -2% <ArrowUpRight size={12} className="rotate-90" />
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">New Applications</h3>
          <p className="text-3xl font-black mt-1" style={{ color: brandDark }}>1,280</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-purple-50 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-2xl text-green-600">
              <TrendingUp size={24} />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-50 px-2 py-1 rounded-lg">
              +18% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Conversion Rate</h3>
          <p className="text-3xl font-black mt-1" style={{ color: brandDark }}>64%</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      
    </div>
  );
}

export default Dashboard;