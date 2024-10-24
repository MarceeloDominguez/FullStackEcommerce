import { Router } from "express";
import { createUserSchema, loginSchema } from "../../db/usersSchema";
import { validateData } from "../../middlewares/validationMiddleware";
import { login, register } from "./authController";

const router = Router();

router.post("/register", validateData(createUserSchema), register);
router.post("/login", validateData(loginSchema), login);

export default router;
