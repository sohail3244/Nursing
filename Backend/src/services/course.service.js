import { eq } from "drizzle-orm";
import { coursesTable } from "../models/course.schema.js";
import { db } from "../database/db.js";

// CREATE
export async function createCourse(data) {
  const existing = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.code, data.code));

  if (existing.length > 0) {
    throw new Error("Course code already exists");
  }

  return await db.insert(coursesTable).values(data);
}

// GET ALL
export async function getCourses() {
  return await db.select().from(coursesTable);
}

// UPDATE
export async function updateCourse(id, data) {
  return await db
    .update(coursesTable)
    .set(data)
    .where(eq(coursesTable.id, id));
}

// DELETE
export async function deleteCourse(id) {
  return await db
    .delete(coursesTable)
    .where(eq(coursesTable.id, id));
}
