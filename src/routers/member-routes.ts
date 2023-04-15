import Router from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { deleteMember, postMember, updateStatusMember } from "../controllers/member-controller";
import { can } from "../middlewares/permissions-middleware";

const memberRoutes = Router();

memberRoutes
 .delete("/leave/:groupId", authenticateToken, deleteMember)
 .post("/request/:groupId", authenticateToken, postMember)
 .put(
  "/change-request/:groupId",
  authenticateToken,
  can,
  updateStatusMember
 );

export { memberRoutes };
