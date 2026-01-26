import { loginService } from "../services/auth.service.js";

export async function login(req, res) {
  try {
    console.log(req.body)
    const result = await loginService(req.body);

    return res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
