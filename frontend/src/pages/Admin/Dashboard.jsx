import React from 'react';
import { 
  Users, 
  GraduationCap, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  MoreVertical 
} from 'lucide-react';

function Dashboard() {
  const brandDark = "#1a237e";
  const brandPurple = "#6739b7";

  // Dummy data for recent applications
  const recentApplications = [
    { id: "APP001", student: "Devika", college: "Vijaya College Of Nursing", status: "Pending", date: "24 Jan 2026" },
    { id: "APP002", student: "Parvathi Reji", college: "Parabrahma College", status: "Approved", date: "23 Jan 2026" },
    { id: "APP003", student: "Athulya A", college: "Mother College of Nursing", status: "Rejected", date: "22 Jan 2026" },
  ];

  return (
    <div className="p-4 md:p-8 bg-[#fbfbff] min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black" style={{ color: brandDark }}>
            Welcome back, Taiyab!
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your nursing admissions today.</p>
        </div>
        <button 
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-transform hover:scale-105 shadow-lg shadow-purple-200"
          style={{ backgroundColor: brandPurple }}
        >
          <TrendingUp size={18} />
          Generate Report
        </button>
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
      <div className="bg-white rounded-[2.5rem] border border-purple-50 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold" style={{ color: brandDark }}>Recent Applications</h2>
          <button className="text-[#6739b7] font-bold text-sm hover:underline transition-all">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[11px] uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Student</th>
                <th className="px-8 py-4">College</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-bold text-gray-800 text-sm">{app.student}</div>
                    <div className="text-[10px] text-gray-400">{app.id}</div>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-600">{app.college}</td>
                  <td className="px-8 py-5 text-sm text-gray-500">{app.date}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      app.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                      app.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                      'bg-red-100 text-red-600'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="text-gray-400 hover:text-[#6739b7] p-1">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;