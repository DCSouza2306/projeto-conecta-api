import Joi from "joi";
import { CreateGroupParams, ChangeNameGroupParams } from "../services";

export const groupSchema = Joi.object<CreateGroupParams>(
{
    name: Joi.string().min(6).required(),
    about: Joi.string().min(6).required(),
    urlImage: Joi.string().required(),
    description: Joi.string().min(3).required(),
    status: Joi.string().required()
}
)