import { Router } from "express";
import {
 createGroup,
 getGroupById,
 getGroups,
 putGroupName,
} from "../controllers";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { can } from "../middlewares/permissions-middleware";
import { validateBody } from "../middlewares/validate-schema";
import { groupSchema } from "../models/group-schema";

const groupRoutes = Router();

groupRoutes
 .get("/", getGroups)
 .get("/:groupId", getGroupById)
 .put(
  "/edit/group-name/:groupId",
  authenticateToken,
  can(["edit_group_name"]),
  validateBody(groupSchema),
  putGroupName
 )
 .post("/create", authenticateToken, validateBody(groupSchema), createGroup);

export { groupRoutes };
