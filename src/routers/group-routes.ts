import { Router } from "express";
import { getGroupById, getGroups, putGroupName } from "../controllers";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { can } from "../middlewares/permissions-middleware";

const groupRoutes = Router();

groupRoutes
.get("/", getGroups)
.get("/:groupId", getGroupById)
.put("/edit/group-name/:groupId", authenticateToken, can(["edit_group_name"]), putGroupName);

export { groupRoutes };
