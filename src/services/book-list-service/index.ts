import { BookList } from "@prisma/client";
import bookListRepository from "../../repositories/book-list-repository";
import bookRepository from "../../repositories/book-repository";
import { notFoundError } from "../../errors/not-found-error";
import { conflictBookListError } from "./errors";
import groupRepository from "../../repositories/group-repository";
import { invalidDataError } from "../../errors/invalid-data-error";

async function createBookList(params: CreateBookListParams) {
 const { groupId, bookId } = params;

 const book = await validateBook(bookId);

 const group = await validateGroup(groupId);

 await validateBookList(bookId, groupId, "CREATE");

 const bookList = await bookListRepository.createBookList(params);

 return {
  id: bookList.id,
  groupName: group.name,
  title: book.title,
  author: book.Author.name,
  startAt: bookList.startAt,
  finishAt: bookList.finishAt,
 };
}

async function updateBookList(params: CreateBookListParams) {
 const { bookId, groupId } = params;

 const book = await validateBook(bookId);

 const group = await validateGroup(groupId);

 const bookList = await validateBookList(bookId, groupId, "UPDATE");

 const updatedBookList = await bookListRepository.updateBookList(params, bookList.id);

 return updatedBookList
}

async function deleteBookList(bookId: number, groupId: number){
    await validateBook(bookId);
    await validateGroup(groupId);

    const bookList = await validateBookList(bookId, groupId, "DELETE");

    await bookListRepository.deleteBookList(bookList.id)
    
}

async function validateBook(bookId: number) {
 const data = await bookRepository.getBookById(bookId);

 if (!data) {
  throw notFoundError();
 }

 return data;
}

async function validateGroup(groupId: number) {
 const data = await groupRepository.getGroupById(groupId);
 if (!data) {
  throw notFoundError();
 }

 return data;
}

async function validateBookList(
 bookId: number,
 groupId: number,
 type: "CREATE" | "UPDATE" | "DELETE"
) {
 const data = await bookListRepository.findByUserAndGroup(bookId, groupId);

 if (type === "CREATE") {
  if (data) {
   throw conflictBookListError();
  }
 }

 if (type === "UPDATE" || type === "DELETE") {
  if (!data) {
   throw notFoundError();
  }

  return data;
 }
}

const bookListService = {
 createBookList,
 updateBookList,
 deleteBookList
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

export type DeleteBookListParams = {
    bookId: number
}
