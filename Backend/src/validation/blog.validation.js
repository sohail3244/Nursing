import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(5),
  code: z.string().min(3),
  description: z.string().min(10),
});
