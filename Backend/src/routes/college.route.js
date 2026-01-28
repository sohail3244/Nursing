import { Router } from "express";
import {
  addCollege,
  getColleges,
  editCollege,
  removeCollege,
} from "../controller/college.controller.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { checkCollegeExists } from "../middlewares/college.middleware.js";
import { validate } from "../middlewares/validate.js";
import { createCollegeSchema } from "../validation/college.validation.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload("colleges").single("image"), // ✅ YAHAN
  validate(createCollegeSchema),
  addCollege
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload("colleges").single("image"), // ✅ YAHAN
  checkCollegeExists,
  editCollege
);

router.get("/", verifyToken, getColleges);
router.delete("/:id", verifyToken, isAdmin, checkCollegeExists, removeCollege);

export default router;
