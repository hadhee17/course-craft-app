// src/components/TopRatedSlider.jsx
import { useEffect, useState } from "react";

function TopRatedSlider({ topRated, allCourses }) {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % topRated.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [topRated]);

  // Try to match topRated with allCourses by _id
  const topRatedCourse = topRated[current];
  const fullCourse = allCourses.find((c) => c._id === topRatedCourse?._id) ||
    allCourses.find((c) => c.title === topRatedCourse?.title) || {
      image: "/placeholder.jpg", // fallback
      title: topRatedCourse?.title || "",
      level: topRatedCourse?.level || "",
      rating: topRatedCourse?.rating || 0,
    };

  return (
    <section className="bg-gradient-to-r from-indigo-50 to-white py-10 rounded-xl shadow-sm">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Slider Box */}
        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-md bg-white">
          <div
            key={topRatedCourse?._id || topRatedCourse?.title}
            className="transform transition-transform duration-700 ease-in-out"
          >
            {/* Image from getAllCourses */}
            <img
              src={fullCourse.image}
              alt={fullCourse.title}
              className="w-full h-44 object-cover rounded-t-xl"
            />

            {/* Course Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">
                {topRatedCourse?.title}
              </h3>
              <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <p className="font-medium">Level: {topRatedCourse?.level}</p>
                <p className="text-yellow-500 font-semibold">
                  ⭐ {topRatedCourse?.rating}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Learn from the Best 🚀
          </h2>
          <p className="text-gray-600 mb-6">
            Our top-rated courses are trusted by thousands of learners. Gain
            hands-on skills, boost your career, and achieve your goals with
            guidance from expert instructors.
          </p>
          <button className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopRatedSlider;
