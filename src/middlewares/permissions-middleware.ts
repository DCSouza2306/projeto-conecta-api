import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";
import userRepository from "../repositories/user-repository";
import { notFoundError } from "../errors/not-found-error";
import { unauthorizedError } from "../errors/unauthorized-error";

export function can(permissionsReceived: string[]) {
 return async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
 ) => {
  const { userId } = req;
  const { groupId } = req.params;

  const user = await userRepository.findById(userId);

  if (!user) {
   throw notFoundError();
  }

  const group = user.GroupMember.map((e) => {
   return e;
  }).filter((e) => e.groupId === parseInt(groupId));

  if (group.length === 0) {
   throw unauthorizedError();
  }
  const permissions = group[0].Role.RolePermision.map((e) => {
   return e.Permision.name;
  }).some((e) => permissionsReceived.includes(e));

  if (!permissions) {
   throw unauthorizedError();
  }
  return next();
 };
}
