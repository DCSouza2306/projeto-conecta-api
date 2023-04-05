import { ApplicationError } from "@/protocols";

export function duplicatedUserOrEmail(param: string): ApplicationError{
    return {
        name: "ConflictError",
        message: `${param} already registred`
    }
}

