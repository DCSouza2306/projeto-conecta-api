import { ApplicationError } from "../protocols";


export function permissionDeniedError(): ApplicationError {
  return {
    name: "PermissionDeniedError",
    message: "You dont have permission",
  };
}
