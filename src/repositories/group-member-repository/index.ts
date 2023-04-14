import { prisma } from "../../config";

async function create(userId: number, groupId: number, roleId: number){
    return prisma.groupMember.create({
        data: {
            status: "APROVED",
            userId,
            groupId,
            roleId
        }
    })
}

const groupMemberRepository = {
    create
};

export default groupMemberRepository;