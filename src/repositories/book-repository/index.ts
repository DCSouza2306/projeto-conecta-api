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

const bookRepository = {
    getBooks
}

export default bookRepository;