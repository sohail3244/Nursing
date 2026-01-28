import React, { useEffect, useState } from 'react';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';

function CollegeModal({ isOpen, onClose, onSubmit, editingCollege, isMutating }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    city: '',
    state: '',
    type: 'private'
  });

  // Sync form data when editingCollege changes or modal opens
  useEffect(() => {
    if (editingCollege) {
      setFormData({
        name: editingCollege.name || '',
        code: editingCollege.code || '',
        city: editingCollege.city || '',
        state: editingCollege.state || '',
        type: editingCollege.type || 'private'
      });
    } else {
      setFormData({ name: '', code: '', city: '', state: '', type: 'private' });
    }
    setSelectedFile(null);
  }, [editingCollege, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleFormSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("name", formData.name);
  data.append("code", formData.code);
  data.append("city", formData.city);
  data.append("state", formData.state);
  data.append("type", formData.type);

  if (selectedFile) {
    data.append("image", selectedFile);
  }

  onSubmit(data); // ✅ Direct FormData
};



  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#1a237e]/20 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 pt-8 pb-4 flex justify-between items-center">
          <h2 className="text-xl font-black text-[#1a237e]">
            {editingCollege ? 'Update College' : 'New College'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-8 pt-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">College Name</label>
              <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all" placeholder="e.g. IIT Delhi" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">College Code</label>
              <input required name="code" value={formData.code} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all" placeholder="IITD" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all">
                <option value="govt">Government</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
              <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all" placeholder="City" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">State</label>
              <input required name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all" placeholder="State" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Branding Image</label>
              <div className="mt-1 flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-100 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-2">
                    <ImageIcon size={20} className="text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500 font-medium">
                      {selectedFile ? selectedFile.name : "Click to upload image"}
                    </p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all">Cancel</button>
            <button 
              type="submit" 
              disabled={isMutating}
              className="flex-1 px-4 py-3 bg-[#6739b7] text-white rounded-xl font-bold hover:bg-[#5a32a3] transition-all shadow-lg shadow-indigo-100 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isMutating && <Loader2 size={16} className="animate-spin" />}
              {editingCollege ? 'Save Changes' : 'Add College'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CollegeModal;