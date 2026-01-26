import React from 'react';
import Button from './Button'; // Reusable button import karein

function SearchCollegeCard() {
  const brandColor = "#6739b7";

  return (
    <div className="flex justify-center items-center p-4 bg-gray-50 min-h-[400px]">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 w-full max-w-lg">
        
        {/* Card Title */}
        <h2 className="text-2xl font-bold text-center text-[#1a237e] mb-8">
          Search Nursing College
        </h2>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="relative">
            <select className="w-full p-4 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#6739b7] focus:border-transparent text-gray-500 cursor-pointer">
              <option value="">Select State</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select className="w-full p-4 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#6739b7] focus:border-transparent text-gray-500 cursor-pointer">
              <option value="">Select Course</option>
              <option value="bsc">B.Sc Nursing</option>
              <option value="gnm">GNM</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Button using Reusable Component */}
          <Button className="w-full py-4 rounded-xl text-lg mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchCollegeCard;