import { prisma } from "@/config";

async function getAllGroups() {
 return prisma.group.findMany();
}

async function getGroupById(id: number) {
 return prisma.group.findFirst({
  where: { id },
  include: {
    Meeting: true,
    ReadingList: true,
    GroupMember: true
  }
 });
}

const groupRepository = {
 getAllGroups,
 getGroupById
};

export default groupRepository;
