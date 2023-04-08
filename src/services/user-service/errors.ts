import { ApplicationError } from "../../protocols";

export function duplicatedUserOrEmail(param: string): ApplicationError{
    return {
        name: "DuplicatedEmailOrUserError",
        message: `${param} already registred`
    }
}

