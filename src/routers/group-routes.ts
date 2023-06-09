import { Router } from "express";
import {
    closeOpenGroup,
 createGroup,
 getGroupById,
 getGroups,
 putGroup,
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
  "/edit/:groupId",
  authenticateToken,
  can,
  validateBody(groupSchema),
  putGroup
 )
 .put("/close-open/:groupId",
 authenticateToken,
 can,
 closeOpenGroup)
 .post("/create", authenticateToken, validateBody(groupSchema), createGroup);

export { groupRoutes };
