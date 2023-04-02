import { Router } from "express";
import { getBooks, getBooksCount } from "@/controllers";

const bookRoutes = Router();

bookRoutes.get("/", getBooks).get("/count",getBooksCount)

export { bookRoutes };
