import React from 'react';
import FindCollegeSection from '../../components/common/FindCollegeSection';
import { ChevronRight } from 'lucide-react';

const Colleges = () => {
  // Brand Theme Color
  const brandColor = "#6739b7";

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh (UT)", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu (UT)",
    "Delhi (NCT)", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry (UT)", "Punjab", "Rajasthan", "Sikkim"
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Find College Search Header Section */}
      {/* Background ko purple tint (#fbf9ff) diya gaya hai */}
      <section className="w-full bg-[#fbf9ff] py-4 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center relative z-10 max-w-full mx-auto">
            <FindCollegeSection />
          </div>
        </div>
      </section>

      {/* 2. Breadcrumb & State Grid Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumb - Hover color brand purple kiya gaya hai */}
        <div className="flex items-center gap-2 text-sm mb-10 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span
            style={{ color: "#1a237e" }}
            className="font-bold cursor-pointer hover:opacity-70 transition-opacity"
          >
            Home
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500 font-medium">Colleges</span>
        </div>

        {/* State Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {states.map((state) => (
            <div
              key={state}
              /* Hover border color ko brandColor (#6739b7) se match kiya gaya hai */
              className="group bg-[#fbf9ff] hover:bg-white border border-gray-100 p-5 rounded-xl transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              style={{ '--hover-border': brandColor }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f3f4f6'}
            >
              <div className="flex items-center justify-between">
                {/* Text hover color brand purple kiya gaya hai */}
                <span
                  className="font-bold text-[#1a237e] transition-colors group-hover:text-[#6739b7]"
                >
                  Nursing Colleges in {state}
                </span>
                {/* Arrow icon color hover par purple ho jayega */}
                <ChevronRight
                  className="h-4 w-4 text-gray-300 group-hover:text-[#6739b7] transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Colleges;