import Router from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { deleteMember, postMember, updateStatusMember } from "../controllers/member-controller";
import { can } from "../middlewares/permissions-middleware";

const memberRoutes = Router();

memberRoutes
 .delete("/:groupId", authenticateToken, deleteMember)
 .post("/:groupId", authenticateToken, postMember)
 .put(
  "/change-request/:groupId",
  authenticateToken,
  can(["accept_reject_request"]),
  updateStatusMember
 );

export { memberRoutes };
