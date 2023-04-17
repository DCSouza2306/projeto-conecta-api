import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import bookListService, {
    CreateBookListInputParams, DeleteBookListParams,
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
  res.status(httpStatus.NOT_FOUND).send(error);
 }
}

export async function updateBookList(req: AuthenticatedRequest, res: Response){
    const body = req.body as CreateBookListInputParams
    const {groupId} = req.params

    try {
        const data = await bookListService.updateBookList({...body, groupId: parseInt(groupId)})
        res.status(httpStatus.OK).send(data);
    } catch (error) {
        if(error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error)
        }

        if(error.name == "ConflictBookListError"){
            return res.status(httpStatus.CONFLICT).send(error);
        }
        res.status(httpStatus.FORBIDDEN).send(error)
    }
}

export async function deleteBookList(req: AuthenticatedRequest, res: Response){
    const {groupId} = req.params
    const {bookId} = req.query as Record<string, string>

    try {
        await bookListService.deleteBookList(parseInt(bookId), parseInt(groupId));
        res.sendStatus(httpStatus.OK)
    } catch (error) {
        if(error.name === "InvalidDataError"){
            return res.status(httpStatus.BAD_REQUEST).send(error)
        }
        res.status(httpStatus.NOT_FOUND).send(error)
    }
}
