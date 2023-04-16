import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";
import userRepository from "../repositories/user-repository";
import { notFoundError } from "../errors/not-found-error";
import { permissionDeniedError } from "../errors/permission-denied-error";
import httpStatus from "http-status";

export async function can(
 req: AuthenticatedRequest,
 res: Response,
 next: NextFunction
) {
 const { userId } = req;
 const { groupId } = req.params;
 const { permissions } = req.query as Record<string, string[]>;

 const user = await userRepository.findById(userId);

 //find user received by token
 if (!user) {
  return generateNotFoundResponse(res);
 }

 //check if user is member in group
 const group = user.GroupMember.map((e) => {
  return e;
 }).filter((e) => e.groupId === parseInt(groupId));
 if (group.length === 0) {
  return generateUnauthorizedResponse(res);
 }

 //check if user have the permissions required to do this action
 const havePermission = group[0].Role.RolePermision.map((e) => {
  return e.Permision.name;
 }).some((e) => permissions?.includes(e));

 if (!havePermission) {
  return generateUnauthorizedResponse(res);
 }
 return next();
}

function generateUnauthorizedResponse(res: Response) {
 res.status(httpStatus.UNAUTHORIZED).send(permissionDeniedError());
}

function generateNotFoundResponse(res: Response) {
 res.status(httpStatus.NOT_FOUND).send(notFoundError());
}
