import { Router } from "express";
import { getBooks } from "@/controllers";

const bookRoutes = Router();

bookRoutes.get("/", getBooks);

export { bookRoutes };
