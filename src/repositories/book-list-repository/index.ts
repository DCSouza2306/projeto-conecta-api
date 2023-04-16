import { prisma } from "../../config";
import { CreateBookListParams } from "../../services/book-list-service";
import dayjs = require("dayjs");

async function createBookList(params: CreateBookListParams){
    return prisma.bookList.create({
        data: params
    })
}

async function findByUserAndGroup(bookId: number, groupId: number){
    return prisma.bookList.findFirst({
        where: {bookId, groupId}
    })
}

async function updateBookList(params: CreateBookListParams, id: number){
 
    return prisma.bookList.update({
        where: { id },
        data: { 
            ...params,
            updatedAt: dayjs().toISOString()
         }
    })
}

async function deleteBookList(id: number){
    return prisma.bookList.delete({
        where: { id }
    })
}

const bookListRepository = {
    createBookList,
    findByUserAndGroup,
    updateBookList,
    deleteBookList
}

export default bookListRepository