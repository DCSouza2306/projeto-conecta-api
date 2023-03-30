import groupRepository from "@/repositories/group-repository";
import { notFoundError } from "@/errors/not-found-error";

async function getGroups() {
 const groups = await groupRepository.getAllGroups();
 if (!groups) {
  throw notFoundError();
 }
 return groups;
}

const groupService = {
 getGroups,
};

export default groupService;
