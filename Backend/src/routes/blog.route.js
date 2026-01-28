import { Router } from "express";
import { addBlog, getAllBlogs, removeBlog } from "../controller/blog.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validate.js";
import { createBlogSchema } from "../validation/blog.validation.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload("blogs").single("image"), // ✅ direct multer
  addBlog
);

router.get("/", getAllBlogs);

router.delete("/:id", verifyToken, isAdmin, removeBlog);

export default router;
