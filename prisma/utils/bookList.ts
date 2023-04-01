import { Book } from "@prisma/client";
import { BookList } from "@prisma/client";
import dayjs from "dayjs";

type BookListType = Omit<BookList, "id" | "createdAt">[]

export function bookListData(num: number, books: Book[], readingListId: number) {
 const data: BookListType = [];



 for (let i = 0; i < num; i++) {
  if(i == 0){
    data.push({
      readingListId,
      bookId: books[i].id,
      status: "CURRENT",
      startAt: dayjs().set("date", 25).set("month", i).toDate(),
      finishAt: dayjs().set("date", 25).set("month", i + 1).toDate()
    });
  } else {
    data.push({
      readingListId,
      bookId: books[i].id,
      status: "NEXT",
      startAt: dayjs().set("date", 25).set("month", i).toDate(),
      finishAt: dayjs().set("date", 25).set("month", i + 1).toDate()
    });
  }
 }

 return data;
}