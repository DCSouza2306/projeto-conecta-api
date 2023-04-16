import { ApplicationError } from "../../protocols";

export function invalidQueryError(): ApplicationError {
    return {
      name: "InvalidQueryError",
      message: "No result for this search!",
    };
  }

  export function conflictBookTitleError(): ApplicationError {
    return {
      name: "ConflictBookTitleError",
      message: "Aleready exist a book with this title",
    };
  }