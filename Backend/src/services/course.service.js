import { eq } from "drizzle-orm";
import { coursesTable } from "../models/course.schema.js";
import { db } from "../database/db.js";

export async function createCourse(data) {
  return await db.insert(coursesTable).values(data);
}

export async function getCourses() {
  return await db.select().from(coursesTable);
}

export async function getCoursesByCollege(collegeId) {
  return await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.collegeId, collegeId));
}

export async function updateCourse(id, data) {
  return await db
    .update(coursesTable)
    .set(data)
    .where(eq(coursesTable.id, id));
}

export async function deleteCourse(id) {
  return await db
    .delete(coursesTable)
    .where(eq(coursesTable.id, id));
}
