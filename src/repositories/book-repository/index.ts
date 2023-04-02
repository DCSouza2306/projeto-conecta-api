import { prisma } from "@/config";

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
 });
}

const bookRepository = {
 getBooks,
 booksCount,
 getBookById,
};

export default bookRepository;
