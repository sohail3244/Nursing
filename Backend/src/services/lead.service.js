import { db } from "../database/db.js";
import { leadsTable } from "../models/lead.schema.js";
import { eq } from "drizzle-orm";

export const createLead = async (data) => {
  return await db.insert(leadsTable).values(data);
};

export const getLeads = async () => {
  return await db.select().from(leadsTable);
};

export const deleteLead = async (id) => {
  return await db.delete(leadsTable).where(eq(leadsTable.id, id));
};
