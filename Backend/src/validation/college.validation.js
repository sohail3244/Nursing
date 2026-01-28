import { z } from "zod";

export const createCollegeSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(2),
  city: z.string(),
  state: z.string(),
  type: z.enum(["govt", "private"]),
});
