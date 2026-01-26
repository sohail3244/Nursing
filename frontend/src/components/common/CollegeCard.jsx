import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const CollegeCard = ({ college, brandDark }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full group">
      {/* Image Container with Tag */}
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={college.image} 
          alt={college.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-[#4CAF50] text-white text-[10px] font-bold px-3 py-1 rounded-md z-10">
          {college.type}
        </span>
        
        {/* College Logo Overlay */}
        <div className="absolute -bottom-6 left-4 bg-white p-1 rounded-lg shadow-md w-14 h-14 flex items-center justify-center z-20">
          <img src={college.logo} alt="logo" className="w-10 h-10 object-contain" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 pt-10 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-[#6739b7] transition-colors" style={{ color: brandDark }}>
          {college.name}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2 text-gray-400">
            <MapPin size={14} className="mt-1 flex-shrink-0" />
            <p className="text-[11px] leading-relaxed">{college.location}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={14} />
            <p className="text-[11px]">{college.year}</p>
          </div>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 italic">
          "{college.description}"
        </p>
      </div>
    </div>
  );
};

export default CollegeCard;