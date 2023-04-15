import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import httpStatus from "http-status";
import memberService from "../services/member-service";

export async function deleteMember(req: AuthenticatedRequest, res: Response){
    const {userId} = req;
    const {groupId} = req.params

    try {
        await memberService.deleteMember(userId, parseInt(groupId));
        res.sendStatus(httpStatus.OK)
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).send(error)
    }
}