import { prisma } from "../../config";
import { CreateGroupParams } from "../../services";

async function getAllGroups() {
 return prisma.group.findMany();
}

async function getGroupById(id: number) {
 return prisma.group.findFirst({
  where: { id },
  include: {
   Meeting: true,
   BookList: {
    include: {
     Book: {
      include: {
       Author: true,
      },
     },
    },
   },

   GroupMember: {
    include: {
     Role: true,
     User: true,
    },
   },
   GroupLink: true,
  },
 });
}

async function putGroupName( id: number ,name: string){
    return prisma.group.update({
        where: {id},
        data: {
            name
        }
    })
}

async function createGroup(data: CreateGroupParams){
    return prisma.group.create({
        data
    })
}

const groupRepository = {
 getAllGroups,
 getGroupById,
 putGroupName,
 createGroup
};

export default groupRepository;
