import { prisma } from "@/config";

async function getBooks(skip: number, take: number){
    return prisma.book.findMany({
        skip,
        take,
        include: {
            Author: true
        },
    });
}

async function booksCount(){
    return prisma.book.count()
}

const bookRepository = {
    getBooks,
    booksCount
}

export default bookRepository;