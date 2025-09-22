// src/services/courseServices.js
import api from "./api";

// ✅ Get top-rated courses
export async function getTopRated() {
  const res = await api.get("/course/top-rated");
  return res.data.data.course;
}

// ✅ Get all courses (basic data for cards)
export async function getAllCourses() {
  const res = await api.get("/course/basic-course-data");
  return res.data.data.course;
}

// ✅ Get single course by ID
export async function getCourseById(id) {
  const res = await api.get(`/course/course-id/${id}`);
  console.log("API response:", res.data);
  return res.data.data.course;
}
export async function getModuleById(id) {
  const res = await api.get(`course/module/${id}`);
  console.log("API response:", res.data);

  return res.data.data.modules;
}
