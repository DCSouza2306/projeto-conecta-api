import joi from "joi";
import { CreateBookListParams } from "../services/book-list-service";

export const bookListSchema = joi.object <CreateBookListParams>({
    bookId: joi.number().required(),
    finishAt: joi.string().isoDate().required(),
    startAt: joi.string().isoDate().required(),
    status: joi.string().valid("CURRENT", "READ", "NEXT").required()
})

