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

const memberRepository = {
 getMemberGroupByUserId,
 deleteMember
};

export default memberRepository;
