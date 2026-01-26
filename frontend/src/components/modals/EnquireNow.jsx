import React from 'react';
import Button from '../common/Button';
import { Check } from 'lucide-react';

const EnquireNow = () => {
  // Theme Color Constant
  const brandColor = "#6739b7";

  return (
    <section className="px-4 md:px-12 py-10">
      <div className="max-w-[95%] mx-auto">
        {/* Main Banner: Blue ki jagah Purple Gradient use kiya hai */}
        <div 
          className="relative overflow-hidden rounded-[2.5rem] py-12 px-6 md:px-20 text-center shadow-xl"
          style={{ background: `linear-gradient(to right, ${brandColor}, #8e24aa)` }}
        >
          
          {/* Decorative Background Shapes */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
              Enquire now!
            </h2>

            {/* Input Form Wrapper */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center bg-white p-2 rounded-2xl sm:rounded-full shadow-lg">
                <input
                  type="tel"
                  placeholder="Enter your phone here"
                  className="w-full flex-1 px-6 py-4 text-gray-700 outline-none rounded-full text-lg"
                />
                <Button> <Check/> Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquireNow;