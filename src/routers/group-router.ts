import { Router } from "express";
import { getGroups } from "@/controllers";

const groupRoutes = Router();

groupRoutes.get("/", getGroups);

export { groupRoutes };
