import { notFoundError } from "../../errors/not-found-error";
import authorRepository from "../../repositories/author-repository";
import bookRepository from "../../repositories/book-repository";
import { conflictBookTitleError, invalidQueryError } from "./errors";
import { Book } from "@prisma/client";

async function getBooks(take: number, skip: number){
    if(take < 0 || skip < 0){
        throw invalidQueryError();
    }
    const data = await bookRepository.getBooks(skip, take);

    const books = data.map((e) => {
        return {
            id: e.id,
            title: e.title,
            author: e.Author.name,
            urlImage: e.urlImage
        }
    });

    return books;
}

async function getBooksCount(){
    const count = await bookRepository.booksCount();

    return count;
}

async function getBookById(id: number){
    const book = await bookRepository.getBookById(id);
    if(!book){
        throw notFoundError();
    }

    const groups = book.BookList.map((e) => {
        return {
            id: e.Group.id,
            name: e.Group.name,
            urlImage: e.Group.urlImage,
            groupStatus: e.Group.status,
            readingStatus: e.status,
            startReading: e.startAt
        }
    })

    const currentReadings = groups.filter((e) => e.readingStatus === "CURRENT");
    const nextReadings = groups.filter((e) =>  e.readingStatus === "NEXT");

    const data = {
        id: book.id,
        title: book.title,
        synopsis: book.synopsis,
        urlImage: book.urlImage,
        author: book.Author.name,
        CurrentReadings: currentReadings,
        NextReadings: nextReadings
    }

    return data;
}

async function createBook(params: CreateBookParams){
    const {title, authorId} = params;
    await validateTitle(title);
    await validateAuthor(authorId);
   
}

async function getBookSearch(title: string){
    const book = await bookRepository.getBookSearch(title);

    const data = book.map((e) => {
        return {
            id: e.id,
            title: e.title,
            urlImage: e.urlImage,
            author: e.Author.name
        }
    })
    return data;
}

async function validateTitle(title: string){
    const titleExist = await bookRepository.getBookByTitle(title);
    if(titleExist){
        throw conflictBookTitleError();
    }
}

async function validateAuthor(authorId: number){
    const authorExist = await authorRepository.getAuthorById(authorId);

    if(!authorExist){
        throw notFoundError()
    }
}

const bookService = {
    getBooks,
    getBooksCount,
    getBookById,
    createBook,
    getBookSearch
};

export default bookService;

export type CreateBookParams = Omit<Book, "id" | "createdAt" | "updatedAt" >


export type BodySearchGroupParams = {
    title: string
}