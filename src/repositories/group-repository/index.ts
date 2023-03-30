import { prisma } from "@/config";

async function getAllGroups(){
    return prisma.group.findMany();
}

const groupRepository = {
    getAllGroups
}

export default groupRepository;