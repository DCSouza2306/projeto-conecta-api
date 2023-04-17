import { prisma } from "../../config";
import { CreateBookParams } from "../../services";

async function getBooks(skip: number, take: number) {
 return prisma.book.findMany({
  skip,
  take,
  include: {
   Author: true,
  },
 });
}

async function booksCount() {
 return prisma.book.count();
}

async function getBookById(id: number) {
 return prisma.book.findFirst({
  where: { id },
  include: {
   Author: true,
   BookList: {
    include: {
     Group: true,
    },
   },
  },
 });
}

async function getBookByTitle(title: string) {
 return prisma.book.findFirst({
  where: { title },
 });
}

async function createBook(params: CreateBookParams){
    return prisma.book.create({
        data: params
    })
}

async function getBookSearch(title: string){
    return prisma.book.findMany({
        where: {
            title:{
                startsWith: title,
                mode: "insensitive"
            }
        },
        include:{
            Author: true,
        }
    })

}

const bookRepository = {
 getBooks,
 booksCount,
 getBookById,
 getBookByTitle,
 createBook,
 getBookSearch
};

export default bookRepository;
