import { z } from "zod";

export const createCollegeSchema = z.object({
  name: z.string().min(3),
  city: z.string(),
  state: z.string(),
  type: z.enum(["govt", "private"]),
  fees: z.number(),
});
