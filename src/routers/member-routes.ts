import Router from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import {
    changeRoleMember,
 deleteMember,
 postMember,
 removeMember,
 updateStatusMember,
} from "../controllers/member-controller";
import { can } from "../middlewares/permissions-middleware";

const memberRoutes = Router();

memberRoutes
 .all("/*", authenticateToken)
 .delete("/leave/:groupId", deleteMember)
 .post("/request/:groupId", postMember)
 .delete("/remove-member/:groupId", can, removeMember)
 .put("/change-request/:groupId", can, updateStatusMember)
 .put("/change-role/:groupId", can, changeRoleMember);

export { memberRoutes };
