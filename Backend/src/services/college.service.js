import { db } from "../database/db.js";
import { eq } from "drizzle-orm";
import { collegesTable } from "../models/college.schema.js";

export async function createCollege(data) {
  await db.insert(collegesTable).values(data);
}

export async function getAllColleges() {
  return await db.select().from(collegesTable);
}

export async function updateCollege(id, data) {
  return await db
    .update(collegesTable)
    .set(data)
    .where(eq(collegesTable.id, id));
}

export async function deleteCollege(id) {
  return await db
    .delete(collegesTable)
    .where(eq(collegesTable.id, id));
}
