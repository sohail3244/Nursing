import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Globe, CheckCircle, ArrowLeft, GraduationCap, Building2, Users, LayoutGrid, Info } from 'lucide-react';

const CollegeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Safeguard for data structure
  const college = data?.data || data;

  if (isLoading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#6739b7]"></div></div>;
  if (isError || !college) return <div className="text-center py-20">College data not found.</div>;

  return (
    <div className="bg-[#f4f7fe] min-h-screen font-sans pb-20">
      {/* 1. Header Banner Area */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={`${baseUrl}/uploads/colleges/${college.thumbnail}`} 
          className="w-full h-full object-cover" 
          alt="banner" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e]/80 to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* 2. Title & Action Bar */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 -mt-20 relative z-10 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex gap-6 items-center">
              {/* Profile/Logo Image */}
              <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden shrink-0">
                 <img src={`${baseUrl}/uploads/colleges/${college.thumbnail}`} className="w-full h-full object-cover" alt="logo" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black text-[#1a237e] tracking-tight">{college.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><MapPin size={16} className="text-[#6739b7]"/> {college.city}, {college.state}</span>
                  <span className="bg-purple-50 text-[#6739b7] px-3 py-1 rounded-full text-xs font-bold uppercase">{college.sector}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-[#6739b7] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-purple-200 hover:scale-105 transition-all">Online Admission</button>
              <button className="flex-1 md:flex-none border-2 border-gray-100 text-[#1a237e] px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">Check Approvals</button>
            </div>
          </div>

          {/* 3. Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-10 border-t border-gray-50">
            <StatBox icon={<Users className="text-blue-500"/>} label="Students" value="1200+" />
            <StatBox icon={<Calendar className="text-orange-500"/>} label="Est. Year" value={college.establishedYear} />
            <StatBox icon={<GraduationCap className="text-purple-500"/>} label="Courses" value={`${college.coursesCount}+`} />
            <StatBox icon={<Building2 className="text-green-500"/>} label="Experience" value={`${college.experienceYears || '10+'} Yrs`} />
          </div>
        </div>

        {/* 4. Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          
          {/* Left Column: About & Gallery */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
              <h2 className="text-xl font-black text-[#1a237e] mb-6 flex items-center gap-2">
                <Info size={20} className="text-[#6739b7]"/> About the Institution
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {college.description}
              </p>

              {/* Facilities from JSON */}
              <div className="mt-10">
                <h3 className="font-bold text-[#1a237e] mb-4">Campus Facilities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {college.facilities?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600 font-medium">
                      <CheckCircle size={16} className="text-green-500" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
              <h2 className="text-xl font-black text-[#1a237e] mb-6 flex items-center gap-2">
                <LayoutGrid size={20} className="text-[#6739b7]"/> Campus Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {college.gallery?.map((img, i) => (
                  <div key={i} className="h-40 rounded-2xl overflow-hidden hover:opacity-90 cursor-pointer transition-all shadow-sm border border-gray-100">
                    <img src={`${baseUrl}/uploads/colleges/${img}`} className="w-full h-full object-cover" alt="campus" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Sidebar Stats Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 sticky top-10">
              <h3 className="font-black text-[#1a237e] mb-6 border-b pb-4">Institutional Profile</h3>
              <div className="space-y-6">
                <SidebarInfo label="Sector" value={college.sector} icon={<Building2 size={16}/>} />
                <SidebarInfo label="District/City" value={`${college.district}, ${college.city}`} icon={<MapPin size={16}/>} />
                <SidebarInfo label="Gender" value={college.genderAcceptance} icon={<Users size={16}/>} />
                <SidebarInfo label="State" value={college.state} icon={<Globe size={16}/>} />
                <SidebarInfo label="Affiliation" value={college.affiliation} icon={<CheckCircle size={16}/>} />
              </div>

              {/* Map Button */}
              <a 
                href={college.googleMapLink} 
                target="_blank" 
                className="mt-10 w-full flex items-center justify-center gap-2 bg-[#1a237e] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-900 transition-all"
              >
                <MapPin size={18}/> View on Map
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const StatBox = ({ icon, label, value }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
    <div className="p-2 bg-white rounded-xl shadow-sm mb-2">{icon}</div>
    <span className="text-xl font-black text-[#1a237e]">{value}</span>
    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{label}</span>
  </div>
);

const SidebarInfo = ({ label, value, icon }) => (
  <div className="flex gap-4 items-start">
    <div className="mt-1 text-[#6739b7]">{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{label}</p>
      <p className="text-sm font-bold text-[#1a237e] leading-tight mt-0.5">{value || 'N/A'}</p>
    </div>
  </div>
);

export default CollegeDetails;