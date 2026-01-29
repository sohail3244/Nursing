import React, { useEffect, useState } from 'react';
import { X, Image as ImageIcon, Loader2, UploadCloud, MapPin, Info } from 'lucide-react';

function CollegeModal({ isOpen, onClose, onSubmit, editingCollege, isMutating }) {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  
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
    experienceYears: ''
  });

  useEffect(() => {
    if (editingCollege) {
      setFormData({
        name: editingCollege.name || '',
        code: editingCollege.code || '',
        description: editingCollege.description || '',
        sector: editingCollege.sector || 'Private',
        establishedYear: editingCollege.establishedYear || '',
        genderAcceptance: editingCollege.genderAcceptance || 'Co-ed',
        state: editingCollege.state || '',
        district: editingCollege.district || '',
        city: editingCollege.city || '',
        address: editingCollege.address || '',
        googleMapLink: editingCollege.googleMapLink || '',
        affiliation: editingCollege.affiliation || '',
        approvedBy: editingCollege.approvedBy || '',
        coursesCount: editingCollege.coursesCount || '',
        experienceYears: editingCollege.experienceYears || ''
      });
    } else {
      resetForm();
    }
    setSelectedThumbnail(null);
  }, [editingCollege, isOpen]);

  const resetForm = () => {
    setFormData({
      name: '', code: '', description: '', sector: 'Private',
      establishedYear: '', genderAcceptance: 'Co-ed', state: '',
      district: '', city: '', address: '', googleMapLink: '',
      affiliation: '', approvedBy: '', coursesCount: '', experienceYears: ''
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

    // Append all text/number fields based on schema
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    // Thumbnail mapping (Schema: thumbnail)
    if (selectedThumbnail) {
      data.append("thumbnail", selectedThumbnail);
    }

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#1a237e]/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-10 pt-8 pb-4 flex justify-between items-center bg-white border-b border-gray-50">
          <div>
            <h2 className="text-2xl font-black text-[#1a237e]">
              {editingCollege ? 'Update College Profile' : 'Register New College'}
            </h2>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">Institutional Information System</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleFormSubmit} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-[#6739b7] font-bold text-sm uppercase tracking-wider">
              <Info size={16} /> Basic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">College Full Name</label>
                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unique Code</label>
                <input required name="code" value={formData.code} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all" />
              </div>
              <div className="md:col-span-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all" />
              </div>
            </div>
          </div>

          {/* Section 2: Institutional Specifics */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-[#6739b7] font-bold text-sm uppercase tracking-wider">
              <UploadCloud size={16} /> Academic & Logistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sector</label>
                <select name="sector" value={formData.sector} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]">
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                  <option value="Semi-Govt">Semi-Govt</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Est. Year</label>
                <input type="number" name="establishedYear" value={formData.establishedYear} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]" />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                <select name="genderAcceptance" value={formData.genderAcceptance} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]">
                  <option value="Co-ed">Co-ed</option>
                  <option value="Girls Only">Girls Only</option>
                  <option value="Boys Only">Boys Only</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Course Count</label>
                <input type="number" name="coursesCount" value={formData.coursesCount} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]" />
              </div>
            </div>
          </div>

          {/* Section 3: Location */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-[#6739b7] font-bold text-sm uppercase tracking-wider">
              <MapPin size={16} /> Location Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl" />
              <input name="district" placeholder="District" value={formData.district} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl" />
              <input name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl" />
              <div className="md:col-span-3">
                <input name="address" placeholder="Full Address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Section 4: Media */}
          <div className="space-y-4">
            <h3 className="text-[#6739b7] font-bold text-sm uppercase tracking-wider">Branding</h3>
            <div className="col-span-2">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-100 border-dashed rounded-[2rem] cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="text-gray-300 mb-2" size={30} />
                  <p className="text-xs text-gray-500 font-bold">{selectedThumbnail ? selectedThumbnail.name : "Upload Main Thumbnail"}</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedThumbnail(e.target.files[0])} />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 sticky bottom-0 bg-white">
            <button type="button" onClick={onClose} className="flex-1 px-8 py-4 border border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all">Cancel</button>
            <button 
              type="submit" 
              disabled={isMutating}
              className="flex-[2] px-8 py-4 bg-[#6739b7] text-white rounded-2xl font-bold hover:bg-[#5a32a3] transition-all shadow-xl shadow-purple-100 flex items-center justify-center gap-3"
            >
              {isMutating ? <Loader2 className="animate-spin" /> : (editingCollege ? 'Update College' : 'Confirm Registration')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CollegeModal;