import { Response, Request } from "express";
import httpStatus from "http-status";
import groupService from "../services/group-service";

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
