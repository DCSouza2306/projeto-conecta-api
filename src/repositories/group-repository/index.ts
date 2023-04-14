import { prisma } from "../../config";

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

const groupRepository = {
 getAllGroups,
 getGroupById,
 putGroupName
};

export default groupRepository;
