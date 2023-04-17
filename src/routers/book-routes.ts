import { Router } from "express";
import { getBooks, getBooksCount, getBookById, createBook, getBookSearch } from "../controllers";
import { validateBody } from "../middlewares/validate-schema";
import { bookSchema } from "../models/book-schema";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { can } from "../middlewares/permissions-middleware";

const bookRoutes = Router();

bookRoutes
.get("/search", authenticateToken, getBookSearch)
 .get("/", getBooks)
 .get("/count", getBooksCount)
 .get("/:bookId", getBookById)
 .post("/",authenticateToken, validateBody(bookSchema), createBook)

export { bookRoutes };
