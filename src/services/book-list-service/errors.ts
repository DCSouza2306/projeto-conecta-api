import { ApplicationError } from "../../protocols";

export function conflictBookListError():ApplicationError {
    return{
        name: "ConflictBookListError",
        message: "Already exist a list with this book and group"
    }
}