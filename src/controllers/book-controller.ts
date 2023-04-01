import bookService from "@/services/book-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getBooks(req: Request, res: Response){
    const {page} = req.query as Record<string, string>
    try{
        const books = await bookService.getBooks(parseInt(page));
        res.status(httpStatus.OK).send(books);
    } catch(err){
        res.sendStatus(httpStatus.NOT_FOUND)
    }
}