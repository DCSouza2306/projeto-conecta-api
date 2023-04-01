import { notFoundError } from "@/errors/not-found-error";
import bookRepository from "@/repositories/book-repository";

async function getBooks(take: number, skip: number){
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

const bookService = {
    getBooks
};

export default bookService;