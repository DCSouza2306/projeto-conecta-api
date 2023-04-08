import { Router } from "express";
import { getBooks, getBooksCount, getBookById } from "../controllers";

const bookRoutes = Router();

bookRoutes.get("/", getBooks).get("/count",getBooksCount).get("/:bookId", getBookById)

export { bookRoutes };
