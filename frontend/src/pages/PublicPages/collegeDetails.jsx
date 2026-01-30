import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Calendar, GraduationCap, Building2, Info, Hash,
  CheckCircle2, Globe, ShieldCheck, UserCheck, ArrowLeft,
  PlayCircle, Users, LayoutGrid, GraduationCap as ExperienceIcon
} from "lucide-react";
import { useCollegeById } from "../../hooks/useCollege";

const CollegeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { data, isLoading, isError } = useCollegeById(id);
  const college = data?.data || data;

  // 🔥 ERROR FIX: String data ko Array mein convert karne ka function
  const ensureArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      // Agar data JSON string hai toh parse karein, warna comma se split karein
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        return data.split(",").map((item) => item.trim());
      }
    }
    return [];
  };

  const facilities = ensureArray(college?.facilities);
  const gallery = ensureArray(college?.gallery);

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#6739b7]"></div>
    </div>
  );

  if (!college || isError) return <div className="text-center py-20">College not found</div>;

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-gray-800">
      
      {/* 1. Banner Area (As per image_17b31c.png) */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
          <img
            src={college.thumbnail ? `${baseUrl}/uploads/colleges/${college.thumbnail}` : "/placeholder.jpg"}
            className="w-full h-full object-cover"
            alt="Banner"
          />
        </div>

        {/* 2. Header Info & Action Buttons */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6 border-b pb-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a237e]">
              {college.name} – {college.city}
            </h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1"><MapPin size={16} className="text-[#6739b7]"/> {college.city}, {college.state}</span>
            </div>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-5xl italic">
              {college.description?.substring(0, 250)}...
            </p>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="bg-[#4169E1] text-white px-10 py-2.5 rounded shadow hover:bg-blue-700 font-bold text-sm">
              Online Admission
            </button>
            <button className="border border-emerald-500 text-emerald-600 px-10 py-2.5 rounded font-bold text-sm hover:bg-emerald-50">
              Check Approvals
            </button>
          </div>
        </div>

        {/* 3. Central Icon Stats */}
        <div className="grid grid-cols-3 gap-4 py-12 max-w-3xl mx-auto">
          <CenterStat icon={<Users className="text-[#4169E1]/70" size={40}/>} value="252 +" label="Students" />
          <CenterStat icon={<ExperienceIcon className="text-[#4169E1]/70" size={40}/>} value={`${college.experienceYears || '0'} +`} label="Years Experience" />
          <CenterStat icon={<LayoutGrid className="text-[#4169E1]/70" size={40}/>} value={`${college.coursesCount || '0'} +`} label="Courses" />
        </div>

        {/* 4. Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
          
          {/* Main (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#1a237e] mb-4">About {college.name}</h2>
              <p className="text-gray-600 leading-relaxed text-justify">{college.description}</p>
            </section>

            {/* Highlights Section */}
            <section>
              <h2 className="text-xl font-bold text-[#1a237e] mb-6 border-b-2 border-orange-400 inline-block pb-1">
                Highlights of {college.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                {facilities.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </section>

            {/* Video Section (Placeholder like image) */}
            <div className="relative group rounded-xl overflow-hidden shadow-xl aspect-video bg-black">
               <img src={college.thumbnail ? `${baseUrl}/uploads/colleges/${college.thumbnail}` : "/placeholder.jpg"} className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={60} className="text-white opacity-90 group-hover:scale-110 transition-transform" />
               </div>
            </div>

            {/* Gallery Section */}
            <section className="border-t pt-10">
                <h3 className="text-xl font-bold text-[#1a237e] mb-6">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {gallery.map((img, i) => (
                     <div key={i} className="h-44 rounded-lg overflow-hidden border bg-gray-50">
                        <img src={`${baseUrl}/uploads/colleges/${img}`} className="w-full h-full object-cover" alt="college" />
                     </div>
                   ))}
                </div>
            </section>
          </div>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-sm">Location</div>
              <div className="h-60 bg-gray-100">
                <iframe 
                  className="w-full h-full grayscale"
                  src={`https://maps.google.com/maps?q=${college.name}+${college.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
              <div className="p-6 space-y-5">
                 <SidebarRow label="Sector" value={college.sector} icon={<Building2 size={16}/>} />
                 <SidebarRow label="Location" value={`${college.city}, ${college.state}`} icon={<MapPin size={16}/>} />
                 <SidebarRow label="Year Established" value={college.establishedYear} icon={<Calendar size={16}/>} />
                 <SidebarRow label="Gender" value={college.genderAcceptance} icon={<UserCheck size={16}/>} />
                 <SidebarRow label="Affiliation" value={college.affiliation} icon={<ShieldCheck size={16}/>} />
                 
                 <button className="w-full bg-[#4169E1] text-white py-3 rounded font-bold shadow-lg hover:bg-blue-700 transition-colors mt-4">
                   Enquire Now
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const CenterStat = ({ icon, value, label }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-2">{icon}</div>
    <div className="text-2xl font-black text-gray-800">{value}</div>
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</div>
  </div>
);

const SidebarRow = ({ label, value, icon }) => (
  <div className="flex gap-4 border-b border-gray-50 pb-3 last:border-0">
    <div className="text-gray-400 mt-1">{icon}</div>
    <div>
      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-700">{value || "N/A"}</p>
    </div>
  </div>
);

export default CollegeDetails;