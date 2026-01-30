import React, { useEffect, useState } from 'react';
import { X, Image as ImageIcon, Loader2, UploadCloud, MapPin, Info, CheckSquare, Layers } from 'lucide-react';

function CollegeModal({ isOpen, onClose, onSubmit, editingCollege, isMutating }) {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState([]); // Multiple images ke liye

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    sector: 'Private',
    establishedYear: '',
    genderAcceptance: 'Co-ed',
    state: '',
    district: '',
    city: '',
    address: '',
    googleMapLink: '',
    affiliation: '',
    approvedBy: '',
    coursesCount: '',
    experienceYears: '',
    facilities: '' // Isko comma-separated string ki tarah handle karenge
  });

  useEffect(() => {
    if (editingCollege) {
      setFormData({
        ...editingCollege,
        // Ensure values are strings to avoid controlled/uncontrolled input errors
        coursesCount: editingCollege.coursesCount?.toString() || '',
        experienceYears: editingCollege.experienceYears?.toString() || '',
        establishedYear: editingCollege.establishedYear?.toString() || '',
      });
    } else {
      resetForm();
    }
    setSelectedThumbnail(null);
    setSelectedGallery([]);
  }, [editingCollege, isOpen]);

  const resetForm = () => {
    setFormData({
      name: '', code: '', description: '', sector: 'Private',
      establishedYear: '', genderAcceptance: 'Co-ed', state: '',
      district: '', city: '', address: '', googleMapLink: '',
      affiliation: '', approvedBy: '', coursesCount: '', experienceYears: '',
      facilities: ''
    });
  };

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    // Sare fields append karein
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    // Thumbnail upload
    if (selectedThumbnail) {
      data.append("thumbnail", selectedThumbnail);
    }

    // Gallery upload (Multiple files)
    if (selectedGallery.length > 0) {
      Array.from(selectedGallery).forEach(file => {
        data.append("gallery", file);
      });
    }

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#1a237e]/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-10 py-6 flex justify-between items-center bg-white border-b">
          <div>
            <h2 className="text-2xl font-black text-[#1a237e]">
              {editingCollege ? 'Update College Profile' : 'Register New College'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleFormSubmit} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Section 1: Basic & Academic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FieldLabel label="College Full Name" />
              <input required name="name" value={formData.name} onChange={handleInputChange} className="input-style" />
            </div>
            <div>
              <FieldLabel label="Unique Code" />
              <input required name="code" value={formData.code} onChange={handleInputChange} className="input-style" />
            </div>
            <div className="md:col-span-3">
              <FieldLabel label="Short Description" />
              <textarea name="description" rows="2" value={formData.description} onChange={handleInputChange} className="input-style" />
            </div>
          </div>

          {/* Section 2: Institutional Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-3xl">
            <div>
              <FieldLabel label="Sector" />
              <select name="sector" value={formData.sector} onChange={handleInputChange} className="input-style">
                <option value="Private">Private</option>
                <option value="Government">Government</option>
                <option value="Semi-Govt">Semi-Govt</option>
              </select>
            </div>
            <div>
              <FieldLabel label="Est. Year" />
              <input type="number" name="establishedYear" value={formData.establishedYear} onChange={handleInputChange} className="input-style" />
            </div>
            <div>
              <FieldLabel label="Affiliation" />
              <input name="affiliation" value={formData.affiliation} onChange={handleInputChange} placeholder="e.g. MG University" className="input-style" />
            </div>
            <div>
              <FieldLabel label="Approved By" />
              <input name="approvedBy" value={formData.approvedBy} onChange={handleInputChange} placeholder="e.g. AICTE, INC" className="input-style" />
            </div>
          </div>

          {/* Section 3: Location & Map */}
          <div className="space-y-4">
             <h3 className="text-[#6739b7] font-bold text-xs uppercase tracking-widest flex items-center gap-2"><MapPin size={14}/> Location & Connectivity</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="input-style" />
                <input name="district" placeholder="District" value={formData.district} onChange={handleInputChange} className="input-style" />
                <input name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="input-style" />
                <div className="md:col-span-3">
                   <input name="googleMapLink" placeholder="Google Map Embed URL / Link" value={formData.googleMapLink} onChange={handleInputChange} className="input-style" />
                </div>
             </div>
          </div>

          {/* Section 4: Facilities & Highlights */}
          <div>
            <FieldLabel label="Facilities (Separated by commas)" />
            <div className="relative">
              <CheckSquare className="absolute left-4 top-4 text-gray-300" size={18} />
              <textarea 
                name="facilities" 
                placeholder="WiFi, Library, Hostel, Smart Classrooms..." 
                value={formData.facilities} 
                onChange={handleInputChange} 
                className="input-style pl-12" 
              />
            </div>
          </div>

          {/* Section 5: Branding & Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <FieldLabel label="Main Thumbnail" />
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-[2rem] cursor-pointer hover:bg-gray-50 transition-all border-[#6739b7]/20">
                <UploadCloud className="text-[#6739b7] mb-2" size={24} />
                <span className="text-[10px] font-bold text-gray-500">{selectedThumbnail ? selectedThumbnail.name : "Choose Cover Image"}</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedThumbnail(e.target.files[0])} />
              </label>
            </div>
            <div className="space-y-3">
              <FieldLabel label="Campus Gallery (Multiple)" />
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-[2rem] cursor-pointer hover:bg-gray-50 transition-all border-blue-200">
                <Layers className="text-blue-400 mb-2" size={24} />
                <span className="text-[10px] font-bold text-gray-500">
                  {selectedGallery.length > 0 ? `${selectedGallery.length} images selected` : "Upload Gallery Photos"}
                </span>
                <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => setSelectedGallery(e.target.files)} />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 sticky bottom-0 bg-white">
            <button type="button" onClick={onClose} className="flex-1 px-8 py-4 border rounded-2xl font-bold text-gray-400 hover:bg-gray-50">Cancel</button>
            <button 
              type="submit" 
              disabled={isMutating}
              className="flex-[2] px-8 py-4 bg-[#6739b7] text-white rounded-2xl font-bold hover:bg-[#5a32a3] shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isMutating ? <Loader2 className="animate-spin" /> : (editingCollege ? 'Update College Profile' : 'Confirm Registration')}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #f9fafb;
          border: 1px solid #f3f4f6;
          border-radius: 0.75rem;
          outline: none;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .input-style:focus {
          border-color: #6739b7;
          box-shadow: 0 0 0 2px rgba(103, 57, 183, 0.1);
          background-color: #fff;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

const FieldLabel = ({ label }) => (
  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">
    {label}
  </label>
);

export default CollegeModal;