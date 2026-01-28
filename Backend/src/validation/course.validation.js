import { z } from "zod";

export const createCourseSchema = z.object({
  collegeId: z.string(),
  name: z.string().min(3),
  code: z.string().min(2), // ✅ added
  duration: z.string(),
  eligibility: z.string().optional(),
});
