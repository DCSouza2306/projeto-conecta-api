import { ApplicationError } from "../../protocols";

export function invalidMemberGroupError():ApplicationError {
    return {
        name: "InvalidMemberGroupError",
        message: "User is not a member of this group"
    }
}