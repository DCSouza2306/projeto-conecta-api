import Joi from "joi";
import { CreateUserParams } from "../services";

export const userSchema = Joi.object<CreateUserParams>(
{
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    urlImage: Joi.string().required(),
    userName: Joi.string().min(3).required()
}
)