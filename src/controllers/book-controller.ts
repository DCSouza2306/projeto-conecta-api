import bookService, { CreateBookParams } from "../services/book-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";

export async function getBooks(req: Request, res: Response) {
 let { limit, offset } = req.query as Record<string, string>;
 if (!limit) {
  limit = "7";
 }

 if (!offset) {
  offset = "0";
 }
 try {
  const books = await bookService.getBooks(parseInt(limit), parseInt(offset));
  res.status(httpStatus.OK).send(books);
 } catch (err) {
   if(err.name === "InvalidQueryError"){
      return res.status(httpStatus.BAD_REQUEST).send(err)
   }
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}

export async function getBooksCount(req: Request, res: Response) {
 try {
  const count = await bookService.getBooksCount();
  res.status(httpStatus.OK).send({ count });
 } catch (err) {
  res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
 }
}

export async function getBookById(req: Request, res: Response) {
 const { bookId } = req.params;

 try {
    const book = await bookService.getBookById(parseInt(bookId));
    res.status(httpStatus.OK).send(book);
 } catch (err) {
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}

export async function createBook(req: AuthenticatedRequest, res: Response){
   const body = req.body as CreateBookParams
   
   try {
      const data = await bookService.createBook(body);
      res.status(httpStatus.CREATED).send(data)
   } catch (error) {
      if(error.name == "ConflictBookTitleError"){
         return res.status(httpStatus.CONFLICT).send(error)
      }
      res.status(httpStatus.NOT_FOUND).send(error)
   }
}
