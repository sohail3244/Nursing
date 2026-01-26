import React from 'react';
import CourseCard from '../../components/common/CoursesCard';

const PopularCourses = () => {
  const brandPurple = "#6739b7";
  const brandDark = "#1a237e";

  const courses = [
    {
      id: 1,
      title: "B.Sc Nursing (4 Years)",
      description: "Browse colleges with course B.Sc Nursing (4 Years)",
      path: "/courses/bsc-nursing",
      displayTitle: "B.Sc Nursing",
      duration: "4 Years",
      gradient: "from-[#6739b7] to-[#1a237e]" 
    },
    {
      id: 2,
      title: "Post (B.Sc) Nursing (2 Years)",
      description: "Browse colleges with course Post (B.Sc) Nursing (2 Years)",
      path: "/courses/post-bsc-nursing",
      displayTitle: "Post (B.Sc) Nursing",
      duration: "2 Years",
      gradient: "from-[#7b4fd4] to-[#6739b7]"
    },
    {
      id: 3,
      title: "M.Sc Nursing (2 Years)",
      description: "Browse colleges with course M.Sc Nursing (2 Years)",
      path: "/courses/msc-nursing",
      displayTitle: "M.Sc Nursing",
      duration: "2 Years",
      gradient: "from-[#1a237e] to-[#4c1d95]"
    },
    {
      id: 4,
      title: "GNM - General Nursing (3 Years)",
      description: "Browse colleges with course GNM - General Nursing (3 Years)",
      path: "/courses/gnm-nursing",
      displayTitle: "GNM - General Nursing",
      duration: "3 Years",
      gradient: "from-[#6739b7] via-[#5b21b6] to-[#1e1b4b]"
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight" style={{ color: brandDark }}>
            Popular Courses
          </h2>
          <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed italic">
            Search and connect with the right colleges faster.
          </p>
        </div>

        {/* Grid using Reusable Card Component */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id} 
              course={course} 
              brandDark={brandDark} 
              brandPurple={brandPurple} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;