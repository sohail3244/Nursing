import React from "react";
import FindCollegeSection from "../../components/common/FindCollegeSection";
import {
  ChevronRight,
  MapPin,
  GraduationCap,
  Loader2,
  AlertCircle,
  Building2,
} from "lucide-react";
import { useColleges, useCollegesByCourse } from "../../hooks/useCollege";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCollegeSearch } from "../../hooks/useCollegeSearch";

const Colleges = () => {
  const brandColor = "#6739b7";
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const search = params.get("search");
  const courseId = params.get("course");

  // 🔍 Search colleges
const {
  data: searchData,
  isLoading: loadingSearch,
  isError,
  error,
} = useCollegeSearch(search);

// 🎓 Course colleges
const {
  data: courseData,
  isLoading: loadingCourse,
} = useCollegesByCourse(courseId);

// 📄 All colleges
const {
  data: allColleges,
  isLoading: loadingAll,
} = useColleges();

  const collegesList = courseId
  ? courseColleges?.data || []
  : allColleges?.data || [];


  // React Query Hook call

  // Backend response structure handling

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Delhi (NCT)",
    "Goa",
    "Gujarat",
    "Karnataka",
    "Maharashtra",
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="w-full bg-[#fbf9ff] py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <FindCollegeSection />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-10 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span className="font-bold cursor-pointer text-[#1a237e]">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500 font-medium">Colleges</span>
        </div>

        {/* State Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {states.map((state) => (
            <div
              key={state}
              className="group bg-[#fbf9ff] hover:bg-white border border-gray-100 p-5 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-[#6739b7]"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1a237e] group-hover:text-[#6739b7] text-sm">
                  Colleges in {state}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#6739b7]" />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 border-l-4 border-[#6739b7] pl-4">
          <h2 className="text-2xl font-bold text-[#1a237e]">
            Available Nursing Colleges
          </h2>
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#6739b7]" />
            <p className="mt-4 text-gray-500 font-medium">Fetching data...</p>
          </div>
        )}

        {isError && (
          <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 flex items-center justify-center gap-3">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Error: {error?.message}</p>
          </div>
        )}

        {/* Data Grid */}
      {/* Loading */}
{isLoading && (
  <div className="flex justify-center py-20">
    <Loader2 className="h-10 w-10 animate-spin text-[#6739b7]" />
  </div>
)}

{/* Error */}
{!isLoading && isError && (
  <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 flex items-center justify-center gap-3">
    <AlertCircle className="h-5 w-5" />
    <p className="font-medium">Error: {error?.message}</p>
  </div>
)}

{/* No Data */}
{!isLoading && collegesList.length === 0 && (
  <div className="text-center py-24 text-gray-400">
    No colleges found
  </div>
)}

{/* Data Grid */}
{!isLoading && collegesList.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {collegesList.map((college) => (
      <div
        key={college.id}
        className="bg-white rounded-3xl border hover:shadow-xl transition overflow-hidden"
      >
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/uploads/colleges/${college.thumbnail}`}
          className="h-52 w-full object-cover"
        />

        <div className="p-6">
          <h3 className="text-xl font-bold text-[#1a237e]">
            {college.name}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {college.city}, {college.state}
          </p>

          <button
            onClick={() => navigate(`/college/${college.id}`)}
            className="mt-4 w-full bg-[#6739b7] text-white py-3 rounded-xl font-bold"
          >
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>
)}


      </div>
    </div>
  );
};

export default Colleges;
