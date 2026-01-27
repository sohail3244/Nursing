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

const router = Router();

router.post(
  "/",
  verifyToken,
  isAdmin,
  validate(createCollegeSchema),
  addCollege
);

router.get("/", verifyToken, getColleges);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  checkCollegeExists,
  editCollege
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  checkCollegeExists,
  removeCollege
);

export default router;
