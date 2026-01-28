import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  state: z.string(),
  city: z.string(),
  course: z.string().optional(),
  college: z.string().optional(),
});
