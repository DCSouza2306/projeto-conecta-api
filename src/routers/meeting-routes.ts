import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validate-schema";
import { meetingSchema } from "../models/meeting-schema";
import { confirmMetting, createMeeting } from "../controllers/meeting-controller";
import { can } from "../middlewares/permissions-middleware";

const meetingRoutes = Router();

meetingRoutes
.all("/*", authenticateToken)
.post("/:groupId",can, validateBody(meetingSchema), createMeeting)
.post("/confirm/:groupId", can, confirmMetting)

export {meetingRoutes}