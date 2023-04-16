import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { can } from "../middlewares/permissions-middleware";
import { validateBody } from "../middlewares/validate-schema";
import { createBookList } from "../controllers/book-list-controller";
import { bookListSchema } from "../models/book-list-schema";


const bookListRoutes = Router();

bookListRoutes
.all("/*", authenticateToken)
.post("/:groupId",can, validateBody(bookListSchema), createBookList)

export {bookListRoutes}