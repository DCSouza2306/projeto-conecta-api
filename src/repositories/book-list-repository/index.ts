import { prisma } from "../../config";
import { CreateBookListParams } from "../../services/book-list-service";

async function createBookList(params: CreateBookListParams){
    return prisma.bookList.create({
        data: params
    })
}

const bookListRepository = {
    createBookList
}

export default bookListRepository