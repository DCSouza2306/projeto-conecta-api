import groupRepository from "@/repositories/group-repository";


async function getGroups(){
    const groups = await groupRepository.getAllGroups();
    return groups;
}

const groupService = {
    getGroups
}

export default groupService;