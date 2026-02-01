import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { updateMyProfile } from "../controller/user.controller.js";

const router = Router();

router.get("/me", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

router.put("/me", verifyToken, updateMyProfile);

export default router;
