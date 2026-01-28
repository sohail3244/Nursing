import React, { useState, useEffect } from 'react';
import { X, FileText, Image as ImageIcon, Loader2, Trash2 } from 'lucide-react';

function BlogModal({ isOpen, onClose, onSubmit, editingBlog, isLoading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: ''
  });

  // Jab Modal khule ya editingBlog change ho
  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || '',
        code: editingBlog.code || '',
        description: editingBlog.description || ''
      });
      setPreviewUrl(editingBlog.image || null);
    } else {
      setFormData({ title: '', code: '', description: '' });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
  }, [editingBlog, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('code', formData.code);
    data.append('description', formData.description);
    if (selectedFile) data.append('image', selectedFile);
    
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#1a237e]/20 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-xl font-black text-[#1a237e] flex items-center gap-2">
            <FileText className="text-[#6739b7]" /> 
            {editingBlog ? 'Update Post' : 'New Blog Post'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 md:col-span-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Post Title</label>
              <input 
                required 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]" 
                placeholder="Enter headline" 
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL / Short Code</label>
              <input 
                required 
                value={formData.code} 
                onChange={(e) => setFormData({...formData, code: e.target.value.toLowerCase().replace(/\s+/g, '-')})} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] font-mono text-sm" 
                placeholder="e.g. tech-trends-2024" 
              />
            </div>
            
            <div className="col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cover Image</label>
              <div className="mt-1 relative group">
                {previewUrl ? (
                  <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-gray-100">
                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                    <button 
                      type="button"
                      onClick={() => {setPreviewUrl(null); setSelectedFile(null);}}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-100 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <ImageIcon size={24} className="text-gray-300 mb-2" />
                    <p className="text-xs text-gray-500 font-medium">Upload thumbnail image</p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Content / Description</label>
              <textarea 
                required 
                rows={6}
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] resize-none" 
                placeholder="Write your story here..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-[#6739b7] text-white rounded-xl font-bold hover:bg-[#5a32a3] shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {editingBlog ? 'Save Changes' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogModal;