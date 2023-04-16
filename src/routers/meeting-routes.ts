import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validate-schema";
import { meetingSchema } from "../models/meeting-schema";
import { createMeeting } from "../controllers/meeting-controller";

const meetingRoutes = Router();

meetingRoutes
.all("/*", authenticateToken)
.post("/:groupId", validateBody(meetingSchema), createMeeting)

export {meetingRoutes}