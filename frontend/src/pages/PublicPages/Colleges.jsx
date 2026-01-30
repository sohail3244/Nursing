import React from 'react';
import FindCollegeSection from '../../components/common/FindCollegeSection';
import { ChevronRight, MapPin, GraduationCap, Loader2, AlertCircle, Building2 } from 'lucide-react';
import { useColleges } from '../../hooks/useCollege';
import { useNavigate } from 'react-router-dom';

const Colleges = () => {
  const brandColor = "#6739b7";
  const navigate = useNavigate();

  
  // React Query Hook call
  const { data, isLoading, isError, error } = useColleges();

  // Backend response structure handling
  const collegesList = Array.isArray(data) ? data : data?.data || [];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Delhi (NCT)", "Goa", "Gujarat", "Karnataka", "Maharashtra"
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="w-full bg-[#fbf9ff] py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <FindCollegeSection />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-10 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span className="font-bold cursor-pointer text-[#1a237e]">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500 font-medium">Colleges</span>
        </div>

        {/* State Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {states.map((state) => (
            <div
              key={state}
              className="group bg-[#fbf9ff] hover:bg-white border border-gray-100 p-5 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-[#6739b7]"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1a237e] group-hover:text-[#6739b7] text-sm">
                   Colleges in {state}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#6739b7]" />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 border-l-4 border-[#6739b7] pl-4">
          <h2 className="text-2xl font-bold text-[#1a237e]">Available Nursing Colleges</h2>
         
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#6739b7]" />
            <p className="mt-4 text-gray-500 font-medium">Fetching data...</p>
          </div>
        )}

        {isError && (
          <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 flex items-center justify-center gap-3">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Error: {error?.message}</p>
          </div>
        )}

        {/* Data Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collegesList.length > 0 ? (
              collegesList.map((college) => (
                <div 
                  key={college.id} 
                  className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col relative"
                >
                  {/* Banner Image (From Schema: image) */}
                  <div className="relative h-52 bg-gray-200 overflow-hidden">
                    <img
     src={`${import.meta.env.VITE_API_BASE_URL}/uploads/colleges/${college.thumbnail}`}
    alt={college.name}
    className="w-full h-full object-cover"
  />

                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-[#6739b7] uppercase tracking-tighter shadow-sm">
                      {college.type}
                    </div>
                    
                    {/* Logo Overlay (From Schema: logo) */}
                    {college.logo && (
                      <div className="absolute -bottom-6 left-6 w-14 h-14 bg-white rounded-2xl shadow-lg p-2 border border-gray-50">
                        <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/colleges/${college.logo}`} alt="logo" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-7 pt-10 flex-grow flex flex-col">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-[#6739b7] uppercase tracking-widest">{college.sector}</span>
                      <h3 className="font-black text-[#1a237e] text-xl line-clamp-2 leading-tight mt-1 group-hover:text-[#6739b7] transition-colors">
                        {college.name}
                      </h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-500 text-sm font-medium">
                        <MapPin className="w-4 h-4 mr-2 text-[#6739b7] shrink-0" />
                        {/* Schema Fields: city, state */}
                        {college.city}, {college.state}
                      </div>
                     
                    </div>

                    <button
  onClick={() => navigate(`/college/${college.id}`)}
  style={{ backgroundColor: brandColor }}
  className="w-full mt-auto text-white py-4 rounded-2xl font-bold shadow-lg shadow-purple-100 hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2"
>
  View Details
  <ChevronRight size={18} />
</button>

                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-medium">No colleges found in our database.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;