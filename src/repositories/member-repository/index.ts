import { prisma } from "../../config";

async function getMemberGroupByUserId(userId: number, groupId: number) {
 return prisma.groupMember.findFirst({
  where: { userId, groupId },
 });
}

async function deleteMember(id: number) {
 return prisma.groupMember.delete({
  where: { id },
 });
}

async function createMember(userId: number, groupId: number, roleId: number){
    return prisma.groupMember.create({
        data:{
            status: "APPLIED",
            groupId,
            userId,
            roleId
        }
    })
}

const memberRepository = {
 getMemberGroupByUserId,
 deleteMember,
 createMember
};

export default memberRepository;
