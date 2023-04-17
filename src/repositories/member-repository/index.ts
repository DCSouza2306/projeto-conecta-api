import dayjs from "dayjs";
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

async function updateStatusMember(id: number, status: "APROVED" | "DENIED"){
    return prisma.groupMember.update({
        where: {id},
        data: {
            status: status,
            updatedAt: dayjs().toISOString()
        }
    })
}

async function updateRoleMember(id: number, roleId: number){
    return prisma.groupMember.update({
        where: {id},
        data: {roleId}
    })
}

const memberRepository = {
 getMemberGroupByUserId,
 deleteMember,
 createMember,
 updateStatusMember,
 updateRoleMember
};

export default memberRepository;
