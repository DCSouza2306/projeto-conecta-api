import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { invalidDataError } from "../errors/invalid-data-error";

export function validateBody(schema: ObjectSchema) {
 return (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (!error) {
   next();
  } else {
   res
    .status(httpStatus.BAD_REQUEST)
    .send(invalidDataError(error.details.map((d) => d.message)));
  }
 };
}
