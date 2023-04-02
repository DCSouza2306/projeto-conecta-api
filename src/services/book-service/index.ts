import { notFoundError } from "@/errors/not-found-error";
import bookRepository from "@/repositories/book-repository";
import { invalidQueryError } from "./invalid-query-error";

async function getBooks(take: number, skip: number){
    if(take < 0 || skip < 0){
        throw invalidQueryError()
    }
    const data = await bookRepository.getBooks(skip, take);
    if(!data){
        throw notFoundError()
    };

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
    if(!count) {
        throw notFoundError()
    };

    return count;
}

async function getBookById(id: number){
    const book = await bookRepository.getBookById(id);
    if(!book){
        throw notFoundError();
    }

    return book;
}

const bookService = {
    getBooks,
    getBooksCount,
    getBookById
};

export default bookService;