import {
  getCourses,
  updateCourse,
  deleteCourse,
  createCourse,
} from "../services/course.service.js";

export async function addCourse(req, res) {
  await createCourse(req.body);
  res.json({ success: true, message: "Course added" });
}

export async function getAllCourses(req, res) {
  const data = await getCourses();
  res.json({ success: true, data });
}

export async function editCourse(req, res) {
  await updateCourse(req.params.id, req.body);
  res.json({ success: true, message: "Course updated" });
}

export async function removeCourse(req, res) {
  await deleteCourse(req.params.id);
  res.json({ success: true, message: "Course deleted" });
}
