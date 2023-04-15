import { ApplicationError } from "../../protocols";

export function conflictGroupName(): ApplicationError {
 return {
  name: "ConflictGroupName",
  message: "Already exist a group with this name",
 };
}


