import express from "express";
import { checkAuthController, LoginController, logoutController, promotetoAdmin, registerController } from "../controllers/auth.controller.js";
import { protectedRoute, isAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", LoginController);
router.post("/logout", logoutController);
router.get("/check-auth", protectedRoute, checkAuthController);
router.put("/promoteUser" , protectedRoute , isAdmin , promotetoAdmin)

export default router;