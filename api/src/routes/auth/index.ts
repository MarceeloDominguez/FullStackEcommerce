import { Router } from "express";
import { createUserSchema, loginSchema } from "../../db/usersSchema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { login, register } from "./authController.js";

const router = Router();

router.post("/register", validateData(createUserSchema), register);
router.post("/login", validateData(loginSchema), login);

export default router;
