import { Router } from "express";
import {
  getIndiaStatesCities,
  getCitiesByState,
} from "../controller/india.controller.js";

const router = Router();

// ✅ All states + cities
router.get("/states-cities", getIndiaStatesCities);

// ✅ Cities by state
router.get("/cities", getCitiesByState);

export default router;
