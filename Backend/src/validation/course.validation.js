import { z } from "zod";

export const createCourseSchema = z.object({
  collegeId: z.string(),
  name: z.string().min(3),
  duration: z.string(),
  fees: z.number(),
  eligibility: z.string().optional(),
});
