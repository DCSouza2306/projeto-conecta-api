import { Response, Request } from "express";
import httpStatus from "http-status";
import groupService from "../services/group-service";
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
 try{
    const group = await groupService.getGroupById(parseInt(groupId))
    res.status(httpStatus.OK).send(group)
 } catch(error){
   console.log(error)
    res.status(httpStatus.NOT_FOUND).send(error);
 }
}

export async function putGroupName(req: AuthenticatedRequest, res: Response){
   const body = req.body as GroupNameChangeParams;
   const {groupId} = req.params

   try{
      await groupService.putGroupName(body.name, parseInt(groupId));
      res.sendStatus(httpStatus.OK);
   } catch(error){
      if(error.name === "UnauthorizedError"){
         return res.sendStatus(httpStatus.UNAUTHORIZED)
      }

      if(error.name === "NotFoundError"){
         return res.sendStatus(httpStatus.NOT_FOUND);
      }

      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
   }
}

type GroupNameChangeParams = {
   name: string
}
