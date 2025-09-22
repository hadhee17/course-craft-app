import { useNavigate } from "react-router-dom";

const levelClasses = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-700",
};

const truncate = (str = "", n = 110) =>
  str.length > n ? str.slice(0, n) + "…" : str;

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const level = (course.level || "default").toLowerCase();

  return (
    <div
      onClick={() => navigate(`/course/${course._id}`)}
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition flex flex-col"
    >
      <div className="h-44 w-full overflow-hidden rounded-md mb-3">
        <img
          src={course.image || "/placeholder.png"}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {truncate(course.description || "No description", 120)}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            By {course.instructor || "Unknown"}
          </p>
          <p className="font-semibold mt-1">₹{course.price ?? "Free"}</p>
        </div>

        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            levelClasses[level] ?? levelClasses.default
          }`}
        >
          {level === "default"
            ? "Unknown"
            : level.charAt(0).toUpperCase() + level.slice(1)}
        </div>
      </div>
    </div>
  );
}
