import { BookList } from "@prisma/client";
import bookListRepository from "../../repositories/book-list-repository";
import bookRepository from "../../repositories/book-repository";
import { notFoundError } from "../../errors/not-found-error";
import groupRepository from "../../repositories/group-repository";

async function createBookList(params: CreateBookListParams) {
    const {groupId, bookId} = params;

    const book = await bookRepository.getBookById(bookId);

    if(!book){
        throw notFoundError();
    }

    const group = await groupRepository.getGroupById(groupId);
    if(!group){
        throw notFoundError();
    }


    const bookList = await bookListRepository.createBookList(params);

    return {
        id: bookList.id,
        groupName: group.name,
        title: book.title,
        author: book.Author.name,
        startAt: bookList.startAt,
        finishAt: bookList.finishAt
    }
}

const bookListService = {
 createBookList,
};

export default bookListService;

export type CreateBookListInputParams = Omit<
 BookList,
 "id" | "createdAt" | "updatedAt" | "groupId"
>;

export type CreateBookListParams = Omit<
 BookList,
 "id" | "createdAt" | "updatedAt"
>;
