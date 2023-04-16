import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import bookListService, {
    CreateBookListInputParams,
 CreateBookListParams,
} from "../services/book-list-service";

export async function createBookList(req: AuthenticatedRequest, res: Response) {
 const body = req.body as CreateBookListInputParams;
 const { groupId } = req.params;

 try {
  const bookList = await bookListService.createBookList({
   ...body,
   groupId: parseInt(groupId),
  });
  res.status(httpStatus.CREATED).send(bookList);
 } catch (error) {
    console.log(error)
  res.status(httpStatus.BAD_REQUEST).send(error);
 }
}
