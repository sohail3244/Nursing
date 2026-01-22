import React from 'react';
import SearchCollegeCard from '../../components/common/SearchCollegeCard';

function Home() {
  const brandColor = "#6739b7";

  return (
    /* lg:fixed lagaya hai taaki desktop par hi fix rahe, mobile par content lamba hone par scroll ho sake */
    <div className="relative lg:fixed lg:inset-0 w-full min-h-screen lg:h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-y-auto lg:overflow-hidden flex flex-col">
      
      {/* Main Container */}
      <div className="relative w-full max-w-[98%] mx-auto px-4 md:px-8 flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 py-10 lg:py-0">
        
        {/* Left Side: Content & Search Card */}
        <div className="w-full lg:w-1/2 z-20 text-center lg:text-left flex flex-col justify-center order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight lg:leading-[1.1] mb-4">
            Find The <br />
            <span className="relative inline-block">
              <span style={{ color: brandColor }}>Best Nursing Colleges</span>
              <div className="absolute bottom-1 left-0 w-full h-2 md:h-3 bg-purple-100 -z-10 rounded-sm"></div>
            </span> 
            <br className="hidden sm:block" /> in India
          </h1>
          
          <p className="text-gray-500 text-sm md:text-base lg:text-lg mb-6 max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
            Discover top-rated nursing institutions and kickstart your medical career today.
          </p>

          {/* Search Card - Mobile par center, Desktop par left */}
          <div className="w-full max-w-md mx-auto lg:mx-0 transform scale-95 sm:scale-100 origin-center lg:origin-left">
            <SearchCollegeCard />
          </div>

          {/* Popular Searches */}
          <div className="mt-6 text-[11px] md:text-xs text-gray-400">
            <span className="font-semibold text-gray-600">Popular Searches: </span>
            <div className="inline-flex flex-wrap justify-center lg:justify-start gap-2 mt-1 lg:mt-0">
               <span className="hover:text-[#6739b7] cursor-pointer underline decoration-purple-100">Kerala</span>, 
               <span className="hover:text-[#6739b7] cursor-pointer underline decoration-purple-100">Karnataka</span>, 
               <span className="hover:text-[#6739b7] cursor-pointer underline decoration-purple-100">Tamil-Nadu</span>
            </div>
          </div>
        </div>

        {/* Right Side: Doctor Image */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end items-end h-[300px] sm:h-[400px] lg:h-full order-1 lg:order-2">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] lg:w-[450px] h-[200px] lg:h-[450px] bg-purple-100 rounded-full blur-3xl opacity-50"></div>
          
          <img 
            src="https://www.costamedicalservices.com/wp-content/uploads/2023/11/portrait-attractive-male-doctor-1-683x1024.jpg" 
            alt="Nursing Professional" 
            /* Mobile par auto height taaki text ke liye jagah bache, Desktop par h-full */
            className="relative z-10 h-full w-auto object-contain max-h-[35vh] sm:max-h-[45vh] lg:max-h-[85vh]  "
          />
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 z-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] md:h-[50px] fill-white">
          <path d="M1200 120L0 16.48V0h1200v120z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Home;