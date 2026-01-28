import React, { useState } from 'react';
import { useBlogs, useAddBlog, useUpdateBlog, useDeleteBlog } from '../../hooks/useBlog';
import { Plus, Pencil, Trash2, Loader2, FileText, Image as ImageIcon, X, Type } from 'lucide-react';
import toast from 'react-hot-toast';
import Pagination from '../../components/common/Pagination';

function AdminBlog() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: ''
  });

  // Data Fetching
  const { data: blogs, isLoading } = useBlogs(page, 6);
  
  // Mutations
  const addMutation = useAddBlog();
  const updateMutation = useUpdateBlog();
  const deleteMutation = useDeleteBlog();

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || '',
        code: blog.code || '',
        description: blog.description || ''
      });
    } else {
      setEditingBlog(null);
      setFormData({ title: '', code: '', description: '' });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("title", formData.title);
  data.append("slug", formData.code);
  data.append("content", formData.description);

  if (selectedFile) {
    data.append("image", selectedFile);
  }

  addMutation.mutate(data, {
    onSuccess: () => {
      toast.success("Blog published successfully");
      setIsModalOpen(false);
    },
  });
};





  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success("Blog deleted successfully"),
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a237e]">Content Management</h1>
          <p className="text-sm text-gray-500 font-medium">Create and manage your portal's blog posts</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#6739b7] text-white px-5 py-2.5 rounded-xl hover:bg-[#5a32a3] transition-all shadow-lg font-bold"
        >
          <Plus size={20} /> Write New Post
        </button>
      </div>

      {/* Blog List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center p-20 gap-3">
            <Loader2 className="animate-spin text-[#6739b7]" size={32} />
            <span className="text-gray-400 font-medium">Loading stories...</span>
          </div>
        ) : (
          blogs?.data?.map((blog) => (
            <div key={blog.id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter text-[#1a237e]">
                  {blog.code}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-black text-gray-800 text-lg line-clamp-1 mb-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {blog.description}
                </p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(blog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8">
        <Pagination 
          currentPage={page} 
          totalPages={blogs?.totalPages || 1} 
          onPageChange={setPage} 
        />
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#1a237e]/20 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-gray-50">
              <h2 className="text-xl font-black text-[#1a237e] flex items-center gap-2">
                <FileText className="text-[#6739b7]" /> {editingBlog ? 'Update Post' : 'New Blog Post'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Post Title</label>
                  <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all" placeholder="Enter headline" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL / Short Code</label>
                  <input required value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all" placeholder="e.g. tech-trends-2024" />
                </div>
                
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cover Image</label>
                  <label className="mt-1 flex flex-col items-center justify-center w-full h-32 border-2 border-gray-100 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden">
                    {selectedFile ? (
                      <p className="text-sm font-bold text-[#6739b7]">{selectedFile.name}</p>
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon size={24} className="text-gray-300 mb-2" />
                        <p className="text-xs text-gray-500 font-medium">Upload thumbnail image</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </label>
                </div>

                <div className="col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Content / Description</label>
                  <textarea 
                    required 
                    rows={6}
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all resize-none" 
                    placeholder="Write your story here..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
                <button 
                  type="submit" 
                  disabled={addMutation.isLoading || updateMutation.isLoading}
                  className="flex-1 px-4 py-3 bg-[#6739b7] text-white rounded-xl font-bold hover:bg-[#5a32a3] shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {(addMutation.isLoading || updateMutation.isLoading) && <Loader2 size={16} className="animate-spin" />}
                  {editingBlog ? 'Save Changes' : 'Publish Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBlog;