import { ApplicationError } from "@/protocols";

export function invalidQueryError(): ApplicationError {
    return {
      name: "InvalidQueryError",
      message: "No result for this search!",
    };
  }