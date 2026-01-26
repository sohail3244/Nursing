import React from 'react';
import CollegeCard from '../../components/common/CollegeCard';

const PopularColleges = () => {
  const brandDark = "#1a237e";

  const colleges = [
    {
      id: 1,
      name: "Jaipur National University - Jaipur",
      location: "Jaipur National University, Main Campus, Jaipur, Rajasthan",
      year: "2007",
      type: "Private / Self Finance",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSypVQHvvNB1XbyKGXPXW7O2em5wmiQNLMHcVvR8LHs5d3Ao9fnwHBuJ0OHX5BzUt0q9p1ryqu5tG9reKKTnCk7KFHacJLUJLaQgq8c-635JsIt7awrQa4xnIMDkY44P6Z5YWHgf=s680-w680-h510-rw",
      logo: "https://www.jnujaipur.ac.in/assets/images/logo/jnu-logo.webp",
      description: "Jaipur National University is one of the top self-financed universities in Rajasthan established in 2007..."
    },
    {
      id: 1,
      name: "Jaipur National University - Jaipur",
      location: "Jaipur National University, Main Campus, Jaipur, Rajasthan",
      year: "2007",
      type: "Private / Self Finance",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSypVQHvvNB1XbyKGXPXW7O2em5wmiQNLMHcVvR8LHs5d3Ao9fnwHBuJ0OHX5BzUt0q9p1ryqu5tG9reKKTnCk7KFHacJLUJLaQgq8c-635JsIt7awrQa4xnIMDkY44P6Z5YWHgf=s680-w680-h510-rw",
      logo: "https://www.jnujaipur.ac.in/assets/images/logo/jnu-logo.webp",
      description: "Jaipur National University is one of the top self-financed universities in Rajasthan established in 2007..."
    },
    {
      id: 1,
      name: "Jaipur National University - Jaipur",
      location: "Jaipur National University, Main Campus, Jaipur, Rajasthan",
      year: "2007",
      type: "Private / Self Finance",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSypVQHvvNB1XbyKGXPXW7O2em5wmiQNLMHcVvR8LHs5d3Ao9fnwHBuJ0OHX5BzUt0q9p1ryqu5tG9reKKTnCk7KFHacJLUJLaQgq8c-635JsIt7awrQa4xnIMDkY44P6Z5YWHgf=s680-w680-h510-rw",
      logo: "https://www.jnujaipur.ac.in/assets/images/logo/jnu-logo.webp",
      description: "Jaipur National University is one of the top self-financed universities in Rajasthan established in 2007..."
    },
    // ... Baki college data yahan aayega
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: brandDark }}>
            Popular Colleges
          </h2>
          <p className="text-gray-500 font-medium italic">
            Search and connect with the right colleges faster.
          </p>
        </div>

        {/* Reusable Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <CollegeCard
              key={college.id} 
              college={college} 
              brandDark={brandDark} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularColleges;