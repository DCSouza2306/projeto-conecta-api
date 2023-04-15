import Router from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { deleteMember } from "../controllers/member-controller";

const memberRoutes = Router();

memberRoutes.delete("/:groupId", authenticateToken, deleteMember)

export { memberRoutes };
