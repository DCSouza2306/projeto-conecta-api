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

 if (!user) {
  return generateNotFoundResponse(res);
 }

 const group = user.GroupMember.map((e) => {
  return e;
 }).filter((e) => e.groupId === parseInt(groupId));
 if (group.length === 0) {
  return generateUnauthorizedResponse(res);
 }
 const havePermission = group[0].Role.RolePermision.map((e) => {
  return e.Permision.name;
 }).some((e) => permissions.includes(e));

 if (!havePermission) {
  return generateUnauthorizedResponse(res);
 }
 return next();
}

function generateUnauthorizedResponse(res: Response) {
 res.status(httpStatus.UNAUTHORIZED).send(permissionDeniedError());
}

function generateNotFoundResponse(res: Response) {
 res.status(httpStatus.UNAUTHORIZED).send(notFoundError());
}
