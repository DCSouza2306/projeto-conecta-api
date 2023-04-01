import { prisma } from "@/config";

async function getAllGroups() {
 return prisma.group.findMany();
}

async function getGroupById(id: number) {
 return prisma.group.findFirst({
  where: { id },
  include: {
    Meeting: true,
    ReadingList: {
      include: {
        BookList: {
          include:{
            Book: {
              include:{
                Author: true,
              }
            }
          }
        }
      }
    },
    GroupMember: {
      include: {
        User: true,
      }
    },
    GroupLink: true
  }
 });
}

const groupRepository = {
 getAllGroups,
 getGroupById
};

export default groupRepository;
