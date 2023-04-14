import { Router } from "express";
import { loginSchema } from "../models/login-schema";
import { validateBody } from "../middlewares/validate-schema";
import { signIn } from "../controllers";

const authenticationRoutes = Router();

authenticationRoutes.post("", validateBody(loginSchema), signIn)

export { authenticationRoutes };
