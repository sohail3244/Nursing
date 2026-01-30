import React, { useEffect, useState } from 'react';
import { X, Loader2, UploadCloud, MapPin, CheckSquare, Layers, Youtube, Users, GraduationCap } from 'lucide-react';

function CollegeModal({ isOpen, onClose, onSubmit, editingCollege, isMutating }) {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    sector: 'Private',
    genderAcceptance: 'Co-ed', // Schema Enum
    establishedYear: '',
    state: '',
    district: '',
    city: '',
    address: '',
    googleMapLink: '',
    affiliation: '',
    approvedBy: '',
    coursesCount: '',
    experienceYears: '',
    studentsCount: '', // Schema field added
    youtubeVideo: '', // Schema field added
    facilities: '' // Input as string, conversion handled in submit
  });

  useEffect(() => {
    if (editingCollege) {
      // Facilities array ko wapas string banane ke liye check
      const facilitiesStr = Array.isArray(editingCollege.facilities) 
        ? editingCollege.facilities.join(', ') 
        : editingCollege.facilities || '';

      setFormData({
        ...editingCollege,
        facilities: facilitiesStr,
        coursesCount: editingCollege.coursesCount?.toString() || '',
        experienceYears: editingCollege.experienceYears?.toString() || '',
        establishedYear: editingCollege.establishedYear?.toString() || '',
        studentsCount: editingCollege.studentsCount?.toString() || '',
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
      genderAcceptance: 'Co-ed', establishedYear: '', state: '',
      district: '', city: '', address: '', googleMapLink: '',
      affiliation: '', approvedBy: '', coursesCount: '', 
      experienceYears: '', studentsCount: '', youtubeVideo: '',
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

    // 1. Data Processing for Schema
    const processedData = {
      ...formData,
      // String to Number conversion
      establishedYear: parseInt(formData.establishedYear) || null,
      coursesCount: parseInt(formData.coursesCount) || 0,
      experienceYears: parseInt(formData.experienceYears) || 0,
      studentsCount: parseInt(formData.studentsCount) || 0,
      // String to JSON (Array) for Schema
      facilities: JSON.stringify(formData.facilities.split(',').map(f => f.trim()).filter(f => f !== ""))
    };

    // 2. Append to FormData
    Object.keys(processedData).forEach(key => {
      data.append(key, processedData[key]);
    });

    if (selectedThumbnail) data.append("thumbnail", selectedThumbnail);
    if (selectedGallery.length > 0) {
      Array.from(selectedGallery).forEach(file => data.append("gallery", file));
    }

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#1a237e]/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-10 py-6 flex justify-between items-center bg-white border-b">
          <h2 className="text-2xl font-black text-[#1a237e]">
            {editingCollege ? 'Update College Profile' : 'Register New College'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleFormSubmit} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Section 1: Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FieldLabel label="College Full Name" />
              <input required name="name" value={formData.name} onChange={handleInputChange} className="input-style" />
            </div>
            <div>
              <FieldLabel label="Unique Code (Slug)" />
              <input required name="code" value={formData.code} onChange={handleInputChange} className="input-style" placeholder="e.g. kims-nursing" />
            </div>
            <div className="md:col-span-3">
              <FieldLabel label="Short Description" />
              <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} className="input-style" />
            </div>
          </div>

          {/* Section 2: Stats & Enums (Enum Support) */}
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
              <FieldLabel label="Gender Acceptance" />
              <select name="genderAcceptance" value={formData.genderAcceptance} onChange={handleInputChange} className="input-style">
                <option value="Co-ed">Co-ed</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
              </select>
            </div>
            <div>
              <FieldLabel label="Est. Year" />
              <input type="number" name="establishedYear" value={formData.establishedYear} onChange={handleInputChange} className="input-style" />
            </div>
            <div>
              <FieldLabel label="Students Count" />
              <div className="relative">
                 <Users className="absolute left-3 top-3 text-gray-400" size={16}/>
                 <input type="number" name="studentsCount" value={formData.studentsCount} onChange={handleInputChange} className="input-style pl-10" />
              </div>
            </div>
          </div>

          {/* Section 3: Academic Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <FieldLabel label="Total Courses" />
              <input type="number" name="coursesCount" value={formData.coursesCount} onChange={handleInputChange} className="input-style" />
            </div>
            <div>
              <FieldLabel label="Years of Experience" />
              <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleInputChange} className="input-style" />
            </div>
            <div>
              <FieldLabel label="Youtube Video Link" />
              <div className="relative">
                 <Youtube className="absolute left-3 top-3 text-red-500" size={16}/>
                 <input name="youtubeVideo" value={formData.youtubeVideo} onChange={handleInputChange} placeholder="https://youtube.com/..." className="input-style pl-10" />
              </div>
            </div>
          </div>

          {/* Section 4: Location */}
          <div className="space-y-4">
            <h3 className="text-[#6739b7] font-bold text-xs uppercase tracking-widest flex items-center gap-2"><MapPin size={14}/> Address & Location</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="input-style" />
              <input name="district" placeholder="District" value={formData.district} onChange={handleInputChange} className="input-style" />
              <input name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="input-style" />
              <div className="md:col-span-3">
                <textarea name="address" placeholder="Full Postal Address" rows="2" value={formData.address} onChange={handleInputChange} className="input-style" />
              </div>
              <div className="md:col-span-3">
                <input name="googleMapLink" placeholder="Google Maps Embed Link" value={formData.googleMapLink} onChange={handleInputChange} className="input-style" />
              </div>
            </div>
          </div>

          {/* Section 5: Facilities (JSON handled as string) */}
          <div>
            <FieldLabel label="Facilities (Separated by commas)" />
            <div className="relative">
              <CheckSquare className="absolute left-4 top-4 text-[#6739b7]" size={18} />
              <textarea 
                name="facilities" 
                placeholder="WiFi, Library, Hostel, Transport, Smart Classrooms..." 
                value={formData.facilities} 
                onChange={handleInputChange} 
                className="input-style pl-12 h-24" 
              />
            </div>
          </div>

          {/* Section 6: Media Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <FieldLabel label="Main Thumbnail" />
              <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-[2rem] cursor-pointer hover:bg-gray-50 transition-all border-[#6739b7]/20 group">
                <UploadCloud className="text-[#6739b7] mb-2 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-xs font-bold text-gray-500">{selectedThumbnail ? selectedThumbnail.name : "Upload Cover Image"}</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedThumbnail(e.target.files[0])} />
              </label>
            </div>
            <div className="space-y-3">
              <FieldLabel label="Campus Gallery" />
              <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-[2rem] cursor-pointer hover:bg-gray-50 transition-all border-blue-200 group">
                <Layers className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-xs font-bold text-gray-500">
                  {selectedGallery.length > 0 ? `${selectedGallery.length} images selected` : "Upload Multiple Photos"}
                </span>
                <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => setSelectedGallery(e.target.files)} />
              </label>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex gap-4 pt-6 sticky bottom-0 bg-white border-t mt-4">
            <button type="button" onClick={onClose} className="flex-1 px-8 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-colors">Cancel</button>
            <button 
              type="submit" 
              disabled={isMutating}
              className="flex-[2] px-8 py-4 bg-[#6739b7] text-white rounded-2xl font-bold hover:bg-[#5a32a3] shadow-xl shadow-purple-200 flex items-center justify-center gap-3 disabled:opacity-70 transition-all active:scale-[0.98]"
            >
              {isMutating ? <Loader2 className="animate-spin" /> : (editingCollege ? 'Update College Details' : 'Finalize Registration')}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.85rem 1.25rem;
          background-color: #f8fafc;
          border: 1.5px solid #f1f5f9;
          border-radius: 1rem;
          outline: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-style:focus {
          border-color: #6739b7;
          box-shadow: 0 4px 12px rgba(103, 57, 183, 0.08);
          background-color: #fff;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}

const FieldLabel = ({ label }) => (
  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
    {label}
  </label>
);

export default CollegeModal;