import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  course: z.string().optional(),
  college: z.string().optional(),
  source: z.string().optional(),
});
