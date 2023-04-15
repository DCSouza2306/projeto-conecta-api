import Router from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { deleteMember, postMember } from "../controllers/member-controller";

const memberRoutes = Router();

memberRoutes
.delete("/:groupId", authenticateToken, deleteMember)
.post("/:groupId", authenticateToken,postMember);

export { memberRoutes };
