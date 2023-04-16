import { Router } from "express";
import { getBooks, getBooksCount, getBookById, createBook } from "../controllers";
import { validateBody } from "../middlewares/validate-schema";
import { bookSchema } from "../models/book-schema";
import { authenticateToken } from "../middlewares/authentication-middleware";

const bookRoutes = Router();

bookRoutes
 .get("/", getBooks)
 .get("/count", getBooksCount)
 .get("/:bookId", getBookById)
 .post("/",authenticateToken, validateBody(bookSchema), createBook)

export { bookRoutes };
