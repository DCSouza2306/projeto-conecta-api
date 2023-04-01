import { Router } from "express";
import { getGroupById, getGroups } from "@/controllers";

const groupRoutes = Router();

groupRoutes.get("/", getGroups).get("/:groupId", getGroupById);

export { groupRoutes };
