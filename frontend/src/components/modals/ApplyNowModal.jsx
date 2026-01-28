import React, { useState } from 'react';
import Button from '../common/Button';
import { useApply } from '../../hooks/useApply';
import toast from 'react-hot-toast';
import { useCourses } from '../../hooks/useCourse';
import { useColleges } from '../../hooks/useCollege';

function ApplyNowModal({ isOpen, onClose }) {
  // Initialize state to match createLeadSchema
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    course: '',
    college: ''
  });
  const { data: coursesData } = useCourses();
const { data: collegesData } = useColleges(formData.course);
  const { mutate, isLoading } = useApply();


  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    state: formData.state,
    city: formData.city,

    // 🔥 IMPORTANT FIX
    ...(formData.email && { email: formData.email.trim() }),
    ...(formData.course && { course: formData.course.trim() }),
    ...(formData.college && { college: formData.college.trim() }),
  };


  mutate(payload, {
    onSuccess: () => {
       toast.success("Application submitted successfully ");
      onClose();
      setFormData({
        name: "",
        phone: "",
        email: "",
        state: "",
        city: "",
        course: "",
        college: "",
      });
    },
    onError: (err) => {
      console.error("API ERROR:", err.response?.data || err);
      toast.error("Something went wrong ");
    }
  });
};


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300">

        {/* Header */}
        <div className="relative pt-10 pb-6 text-center">
          <button onClick={onClose} className="absolute top-6 right-8 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="bg-indigo-50 text-[#6739b7] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">Apply Now</span>
          <h2 className="mt-4 text-2xl font-extrabold text-[#1a237e]">Interested? Send Us An Enquiry</h2>
        </div>

        <form className="px-8 md:px-12 pb-10 space-y-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name *</label>
              <input name="name" required minLength={3} value={formData.name} onChange={handleChange}
                placeholder="Your Name" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#6739b7] outline-none" />
            </div>

            {/* Phone & Email */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Contact Number *</label>
              <input
  type="tel"
  inputMode="numeric"
  maxLength={10}
  value={formData.phone}
  onChange={(e) =>
    setFormData({
      ...formData,
      phone: e.target.value.replace(/\D/g, "")
    })
  }
  placeholder="Phone Number"
  className="w-full px-5 py-3 rounded-xl"
/>



            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange}
                placeholder="Your Email" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#6739b7] outline-none" />
            </div>

            {/* State & City (Required by Schema) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">State *</label>
                <select name="state" required value={formData.state} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none">
                  <option value="">Select State</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">City *</label>
                <input name="city" required value={formData.city} onChange={handleChange}
                  placeholder="City" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none" />
              </div>
            </div>

            {/* Course & College (Optional) */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Course</label>
              <select
  name="course"
  value={formData.course}
  onChange={handleChange}
  className="w-full px-5 py-3 bg-gray-50 border rounded-xl"
>
  <option value="">Select Course</option>

  {coursesData?.data?.map((course) => (
    <option key={course._id} value={course._id}>
      {course.name}
    </option>
  ))}
</select>

            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">College</label>
              <select
  name="college"
  value={formData.college}
  onChange={handleChange}
  className="w-full px-5 py-3 bg-gray-50 border rounded-xl"
  disabled={!formData.course}
>
  <option value="">Select College</option>

  {collegesData?.data?.map((college) => (
    <option key={college._id} value={college._id}>
      {college.name}
    </option>
  ))}
</select>

            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl text-lg shadow-xl mt-4"
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>

        </form>
      </div>
    </div>
  );
}

export default ApplyNowModal;