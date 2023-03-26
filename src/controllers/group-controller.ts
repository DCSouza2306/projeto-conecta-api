import { Response, Request } from "express";
import httpStatus from "http-status";
import groupService from "@/services/group-service";

export async function getGroups(req: Request, res: Response) {
 try {
  const groups = await groupService.getGroups();
  res.status(httpStatus.OK).send(groups);
 } catch (error) {
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}
