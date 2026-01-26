import React from 'react';

const About = () => {
  const brandColor = "#6739b7";

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        {/* Main Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a237e] mb-4">
            About Mynursingadmission.com
          </h1>
          
        </div>

        {/* Content Section with Image */}
        <div className="flex flex-col lg:flex-row items-start gap-12 mb-20">
          <div className="w-full lg:w-1/3 flex justify-center">
            <img 
              src="/public/doctor02.png" 
              alt="Professional Doctor" 
              className="w-full max-w-sm h-auto drop-shadow-2xl rounded-3xl"
            />
          </div>

          <div className="w-full lg:w-2/3 space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
            <p>
              As a subsidiary of EducateMe Edu Solutions, <span className="font-semibold text-gray-800">mynursingadmission.com</span> has been a leading provider of guidance to students in India for the past 12 years. We have personally assisted more than 5000 students to get their admission to the top colleges in India.
            </p>
            <p>
              We understand that the process of finding the right nursing college and course can be overwhelming, especially with the growing demand for nurses globally. Our website offers detailed information about colleges, including admission procedures, fee structures, and accreditation from the Indian Nursing Council, State Nursing Council, and Universities.
            </p>
            <p>
              We cater to students seeking admission in B.Sc Nursing, General Nursing - GNM, Post B.Sc Nursing, and M.Sc Nursing courses. We strive to make the process of finding the right nursing college as simple and stress-free as possible.
            </p>
          </div>
        </div>

        {/* Vision & Mission Sections */}
        <div className="space-y-8">
          {/* Vision Card */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 md:p-10 transform hover:scale-[1.01] transition-transform">
            <h2 className="text-3xl font-extrabold text-[#1a237e] mb-6 flex items-center gap-3">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              "Our vision is to empower and support students seeking nursing education in India by providing a comprehensive and accessible platform for searching and applying to colleges, as well as personalized assistance throughout the admission process. We aim to foster a strong and diverse nursing workforce to meet the growing global demand for nurses."
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 md:p-10 transform hover:scale-[1.01] transition-transform">
            <h2 className="text-3xl font-extrabold text-[#1a237e] mb-6 flex items-center gap-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              At <span className="font-semibold text-gray-800">Mynursingadmission.com</span>, we believe that nursing education is a valuable investment in your future. Our mission is to be a useful resource for students seeking admission in B.Sc Nursing, GNM, and M.Sc Nursing courses and to help them navigate the admission process with ease. We offer free assistance in searching for nursing colleges in India, as well as detailed information regarding required documents and procedures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;