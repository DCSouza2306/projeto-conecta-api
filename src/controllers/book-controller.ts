import bookService from "@/services/book-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getBooks(req: Request, res: Response) {
 let { limit, offset } = req.query as Record<string, string>;
 if (!limit) {
  limit = "7";
 }

 if (!offset || parseInt(offset) < 0) {
  offset = "0";
 }
 try {
  const books = await bookService.getBooks(parseInt(limit), parseInt(offset));
  res.status(httpStatus.OK).send(books);
 } catch (err) {
  console.log(err);
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}
