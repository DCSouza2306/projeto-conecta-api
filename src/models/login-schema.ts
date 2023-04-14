import Joi from "joi";
import { CreateUserParams } from "../services";

type LoginParams = Partial<CreateUserParams>;

export const loginSchema = Joi.object<LoginParams>({
 email: Joi.string().email().required(),
 password: Joi.string().min(6).required(),
});
