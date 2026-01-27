import { db } from "../database/db.js";
import { blogsTable } from "../models/blog.schema.js";
import { eq } from "drizzle-orm";

export const createBlog = async (data) => {
  return await db.insert(blogsTable).values(data);
};

export const getBlogs = async () => {
  return await db.select().from(blogsTable);
};

export const deleteBlog = async (id) => {
  return await db.delete(blogsTable).where(eq(blogsTable.id, id));
};
