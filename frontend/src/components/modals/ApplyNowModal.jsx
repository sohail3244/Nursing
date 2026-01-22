import React from 'react';
import Button from '../common/Button';

function ApplyNowModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Section with Decorative Accent */}
        <div className="relative pt-10 pb-6 text-center">
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-50 rounded-br-full -z-10 opacity-70"></div>
          
          <span className="bg-indigo-50 text-[#6739b7] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
            Apply Now
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#1a237e]">
            Interested? Send Us An Enquiry
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Please fill the form to submit application.
          </p>
        </div>

        {/* Form Section */}
        <form className="px-8 md:px-12 pb-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Full Name *</label>
            <input 
              type="text" 
              placeholder="Your Name"
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6739b7] focus:bg-white transition-all"
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Contact Number *</label>
            <div className="flex gap-2">
              <div className="w-1/3 px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 text-sm flex items-center justify-center">
                (91) India
              </div>
              <input 
                type="tel" 
                placeholder="Your Contact Number"
                className="w-2/3 px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6739b7] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="Your Email"
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6739b7] focus:bg-white transition-all"
            />
          </div>

          {/* Location / State */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Location</label>
            <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6739b7] text-gray-500 cursor-pointer appearance-none">
              <option>Select State</option>
              <option>Delhi</option>
              <option>Rajasthan</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button className="w-full py-4 rounded-xl text-lg shadow-xl mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ApplyNowModal;