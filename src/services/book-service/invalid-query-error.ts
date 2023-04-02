import { ApplicationError } from "@/protocols";

export function invalidQueryError(): ApplicationError {
    return {
      name: "InvalidQuery",
      message: "No result for this search!",
    };
  }