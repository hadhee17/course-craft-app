import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, getModuleById } from "../services/courseServices";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const fetchCourseAndModules = async () => {
      try {
        // Fetch the course first
        const fetchedCourse = await getCourseById(id);
        setCourse(fetchedCourse);

        // If course has modules, fetch details for each module
        if (fetchedCourse.modules && fetchedCourse.modules.length > 0) {
          const modulesDetails = await Promise.all(
            fetchedCourse.modules.map((moduleId) => getModuleById(moduleId))
          );
          setModules(modulesDetails);
        }
      } catch (err) {
        console.error("Failed to load course or modules", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndModules();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!course) return <div className="p-6">Course not found</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button onClick={() => nav(-1)} className="text-sm text-blue-600 mb-4">
        ← Back
      </button>

      {/* Course info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={course.image || "/placeholder.png"}
            alt={course.title}
            className="w-full md:w-1/3 h-64 object-cover rounded-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-gray-600 mt-1">By {course.instructor}</p>
            <p className="mt-3 text-gray-800">{course.description}</p>

            <div className="mt-4 flex items-center gap-4">
              <div className="text-lg font-semibold">
                {course.price ? `₹${course.price}` : "Free"}
              </div>
              <div className="px-3 py-1 rounded-full text-sm bg-gray-100">
                {course.level || "Unknown"}
              </div>
              {course.rating && (
                <div className="text-sm text-yellow-500">{`⭐ ${course.rating}`}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modules & lessons */}
      {/* Modules & lessons */}
      {modules.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Modules</h2>
          <div className="space-y-6">
            {modules.map((mod, idx) => (
              <div key={mod._id} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-xl font-medium">
                  {idx + 1}. {mod.title}
                </h3>

                {/* Small heading for lessons */}
                {mod.lessons && mod.lessons.length > 0 && (
                  <h4 className="text-lg font-semibold mt-3">Lessons</h4>
                )}

                {mod.lessons && mod.lessons.length > 0 ? (
                  <ul className="mt-2 space-y-2 pl-5 list-disc text-gray-700">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson._id}>
                        <p className="font-semibold">{lesson.title}</p>
                        <p className="text-sm text-gray-600">
                          {lesson.content}
                        </p>
                        <p className="text-sm text-gray-500">
                          Duration: {lesson.duration ?? 0} min
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-2">No lessons available</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
