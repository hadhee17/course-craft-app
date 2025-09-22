import CourseCard from "./CourseCard";

export default function CourseList({ courses = [] }) {
  if (!courses.length) {
    return (
      <div className="text-center text-gray-400 py-6">No courses to show</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {courses.map((c) => (
        <CourseCard key={c._id} course={c} />
      ))}
    </div>
  );
}
