import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import meetingService from "../services/meeting-service";
import httpStatus from "http-status";
import { CreateMeetingParams } from "../services/meeting-service";

export async function createMeeting(req: AuthenticatedRequest, res: Response){
    const {groupId} = req.params;
    const body = req.body as CreateMeetingParams

    try {
        const meeting = await meetingService.createMeeting(body, parseInt(groupId));
        res.status(httpStatus.CREATED).send(meeting)
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).send(error)
    }
    
}