// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getTopRated, getAllCourses } from "../services/courseServices";
import CourseCard from "../components/CourseCard";
import TopRatedSlider from "../components/TopRatedSlider";

function Home() {
  const [topRated, setTopRated] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [topRatedCourses, allCourses] = await Promise.all([
          getTopRated(),
          getAllCourses(),
        ]);
        setTopRated(topRatedCourses || []);
        setCourses(allCourses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-400">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Top Rated Slider */}
      <h2 className="text-2xl font-bold mb-6">🔥 Top Rated Courses</h2>
      {topRated.length === 0 ? (
        <p className="text-gray-400">No top-rated courses available.</p>
      ) : (
        <TopRatedSlider topRated={topRated} allCourses={courses} />
      )}

      {/* All Courses */}
      <h2 className="text-2xl font-bold mt-12 mb-6">📚 All Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-400">No courses found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
