import React, { useState } from 'react';
import { useCourses, useAddCourse, useUpdateCourse, useDeleteCourse } from '../../hooks/useCourse';
import { useColleges } from '../../hooks/useCollege'; // College select karne ke liye
import { Plus, Pencil, Trash2, Loader2, BookOpen, School, Hash, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import Pagination from '../../components/common/Pagination';

function AdminCourses() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    duration: '',
    eligibility: '',
    collegeId: ''
  });

  // Data Fetching
  const { data: courses, isLoading } = useCourses(page, 6);
  const { data: colleges } = useColleges(); // Dropdown ke liye

  // Mutations
  const addMutation = useAddCourse();
  const updateMutation = useUpdateCourse();
  const deleteMutation = useDeleteCourse();

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        name: course.name,
        code: course.code,
        duration: course.duration,
        eligibility: course.eligibility || '',
        collegeId: course.collegeId
      });
    } else {
      setEditingCourse(null);
      setFormData({ name: '', code: '', duration: '', eligibility: '', collegeId: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mutation = editingCourse ? updateMutation : addMutation;

    mutation.mutate(editingCourse ? { id: editingCourse.id, ...formData } : formData, {
      onSuccess: () => {
        toast.success(`Course ${editingCourse ? 'updated' : 'added'} successfully`);
        setIsModalOpen(false);
      },
      onError: (err) => toast.error(err?.response?.data?.message || "Operation failed")
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success("Course deleted"),
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#1a237e]">Academic Courses</h1>
          <p className="text-sm text-gray-500">Manage programs, eligibility, and durations</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#6739b7] text-white px-5 py-2.5 rounded-xl hover:bg-[#5a32a3] transition-all shadow-lg"
        >
          <Plus size={20} /> Add Course
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#6739b7]" /></div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Course Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Code</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Duration</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Eligibility</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {courses?.data?.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/50 group transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{course.name}</span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <School size={10}/> ID: {course.collegeId.substring(0,8)}...
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-bold">{course.code}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{course.duration}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm italic">{course.eligibility || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleOpenModal(course)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={18} /></button>
                      <button onClick={() => handleDelete(course.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination 
        currentPage={page} 
        totalPages={courses?.totalPages || 1} 
        onPageChange={setPage} 
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200">
            <h2 className="text-xl font-black text-[#1a237e] mb-6 flex items-center gap-2">
              <BookOpen className="text-[#6739b7]" /> {editingCourse ? 'Edit Course' : 'New Academic Program'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Associated College</label>
                  <select 
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]"
                    value={formData.collegeId}
                    onChange={(e) => setFormData({...formData, collegeId: e.target.value})}
                  >
                    <option value="">Select College</option>
                    {colleges?.data?.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Course Name</label>
                  <input required placeholder="e.g. Bachelor of Technology" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Course Code</label>
                  <input required placeholder="BTECH-CS" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Duration</label>
                  <input required placeholder="4 Years" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                </div>

                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Eligibility Criteria</label>
                  <input placeholder="12th with PCM 60%" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7]" value={formData.eligibility} onChange={(e) => setFormData({...formData, eligibility: e.target.value})} />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
                <button 
                  type="submit" 
                  disabled={addMutation.isLoading || updateMutation.isLoading}
                  className="flex-1 px-4 py-3 bg-[#6739b7] text-white rounded-xl font-bold hover:bg-[#5a32a3] shadow-lg disabled:opacity-50"
                >
                  {addMutation.isLoading || updateMutation.isLoading ? 'Saving...' : (editingCourse ? 'Save Changes' : 'Create Course')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCourses;