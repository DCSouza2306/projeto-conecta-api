import { Response, Request } from "express";
import httpStatus from "http-status";
import groupService, { CreateGroupParams } from "../services/group-service";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";

export async function getGroups(req: Request, res: Response) {
 try {
  const groups = await groupService.getGroups();
  res.status(httpStatus.OK).send(groups);
 } catch (error) {
  res.status(httpStatus.NOT_FOUND).send(error);
 }
}

export async function getGroupById(req: Request, res: Response) {
 const { groupId } = req.params;
 try {
  const group = await groupService.getGroupById(parseInt(groupId));
  res.status(httpStatus.OK).send(group);
 } catch (error) {
  res.status(httpStatus.NOT_FOUND).send(error);
 }
}

export async function putGroup(req: AuthenticatedRequest, res: Response) {
 const body = req.body as CreateGroupParams;
 const { groupId } = req.params;

 try {
  await groupService.putGroup(body, parseInt(groupId));
  res.sendStatus(httpStatus.OK);
 } catch (error) {
  if (error.name === "UnauthorizedError") {
   return res.sendStatus(httpStatus.UNAUTHORIZED);
  }

  if (error.name === "NotFoundError") {
   return res.sendStatus(httpStatus.NOT_FOUND);
  }

  res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
 }
}

export async function createGroup(req: AuthenticatedRequest, res: Response) {
 const body = req.body as CreateGroupParams;
 const { userId } = req;

 try {
  const group = await groupService.createGroup(body, userId);
  res.status(httpStatus.CREATED).send(group)
 } catch (error) {
  if(error.name === "ConflictGroupName"){
    return res.status(httpStatus.CONFLICT).send(error.message)
  }
  res.status(httpStatus.BAD_REQUEST).send(error);
 }
}

export async function closeOpenGroup(req: AuthenticatedRequest, res: Response){
  const {groupId} = req.params;

  try {
    const data = await groupService.closeOpenGroup(parseInt(groupId));
    res.status(httpStatus.OK).send(data);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send(error)
  }
}

type GroupNameChangeParams = {
 name: string;
};
