import { prisma } from "../../config";

async function getAuthorById(id: number){
    return prisma.author.findFirst({
        where: { id }
    })
}

const authorRepository = {
getAuthorById
}

export default authorRepository