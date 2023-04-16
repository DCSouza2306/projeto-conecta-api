import Joi from "joi";
import { CreateBookParams } from "../services";

export const bookSchema = Joi.object<CreateBookParams>(
{
    title: Joi.string().required(),
    synopsis: Joi.string().required(),
    urlImage: Joi.string().required(),
    authorId: Joi.number().required(),
}
)