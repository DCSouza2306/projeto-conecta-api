import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { can } from "../middlewares/permissions-middleware";
import { validateBody } from "../middlewares/validate-schema";
import { createBookList, deleteBookList, updateBookList } from "../controllers/book-list-controller";
import { bookListSchema } from "../models/book-list-schema";


const bookListRoutes = Router();

bookListRoutes
.all("/*", authenticateToken)
.post("/:groupId",can, validateBody(bookListSchema), createBookList)
.put("/:groupId",can, validateBody(bookListSchema), updateBookList)
.delete("/:groupId",can, validateBody(bookListSchema), deleteBookList)

export {bookListRoutes}