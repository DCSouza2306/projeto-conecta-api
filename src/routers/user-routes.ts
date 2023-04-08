import { Router } from "express";
import { userSchema } from "../models/user-schema";
import { validateBody } from "../middlewares/validate-schema";
import { signUp, getUser } from "../controllers";

const userRoutes = Router();

userRoutes.post("/sign-up", validateBody(userSchema), signUp).get("/:userName", getUser)

export { userRoutes };
