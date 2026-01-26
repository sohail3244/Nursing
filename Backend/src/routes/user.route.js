import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

export default router;
