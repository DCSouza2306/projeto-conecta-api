import { prisma } from "../../config";

async function createSession(id: number, token: string){
    return prisma.session.create({
        data: {
            token,
            userId: id
        }
    })
}

const sessionRepository = {
    createSession
};

export default sessionRepository;