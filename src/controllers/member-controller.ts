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

export async function postMember(req: AuthenticatedRequest, res: Response){
    const {groupId} = req.params;
    const {userId} = req;

    try {
        const member = await memberService.postMember(userId, parseInt(groupId));
        res.status(httpStatus.CREATED).send(member)
    } catch (error) {
        if(error.name === "NotFoundError"){
            return res.sendStatus(httpStatus.NOT_FOUND).send(error)
        }
        res.status(httpStatus.BAD_REQUEST).send(error)
    }
}

export async function updateStatusMember(req: AuthenticatedRequest, res: Response){
    const {groupId} = req.params;

    const {userId} = req.body as UserIdParams;

    try {
        const member = await memberService.updateStatusMember(parseInt(groupId), userId);
        res.status(httpStatus.OK).send(member)
    } catch (error) {
        if(error.name == "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error);
        }
        res.status(httpStatus.BAD_REQUEST).send(error)
    }
}

export async function removeMember(req: AuthenticatedRequest, res: Response){
    const {groupId} = req.params;
    const {userId} = req.body as UserIdParams

    try {
        await memberService.deleteMember(userId, parseInt(groupId));
        res.sendStatus(httpStatus.OK)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send(error)
    }
}

type UserIdParams = {
    userId: number
}