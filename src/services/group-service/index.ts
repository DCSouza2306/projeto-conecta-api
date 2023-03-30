import groupRepository from "@/repositories/group-repository";
import { notFoundError } from "@/errors/not-found-error";

async function getGroups() {
 const groups = await groupRepository.getAllGroups();
 if (!groups) {
  throw notFoundError();
 }
 return groups;
}

async function getGroupById(id: number){
    const group = await groupRepository.getGroupById(id);
    if(!group) {
        throw notFoundError()
    }

    return group;
}

const groupService = {
 getGroups,
 getGroupById
};

export default groupService;
