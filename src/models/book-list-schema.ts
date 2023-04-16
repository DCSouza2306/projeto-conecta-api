import joi from "joi";
import { CreateBookListInputParams, CreateBookListParams } from "../services/book-list-service";

export const bookListSchema = joi.object <CreateBookListInputParams>({
    bookId: joi.number().required(),
    finishAt: joi.string().isoDate().required(),
    startAt: joi.string().isoDate().required(),
    status: joi.string().valid("CURRENT", "READ", "NEXT").required()
})


