import groupRepository from "../../repositories/group-repository";
import roleRepository from "../../repositories/role-repository";
import groupMemberRepository from "../../repositories/group-member-repository";
import { notFoundError } from "../../errors/not-found-error";
import { conflictGroupName } from "./errors";

async function getGroups() {
 const groups = await groupRepository.getAllGroups();
 return groups;
}

async function getGroupById(id: number) {
 const group = await groupRepository.getGroupById(id);
 if (!group) {
  throw notFoundError();
 }

 const members = group.GroupMember.map((e) => {
  return {
   id: e.User.id,
   name: e.User.userName,
   urlImage: e.User.urlImage,
   position: e.Role.name,
   status: e.status
  };
 });

 const readingList = group.BookList?.map((e) => {
  return {
   id: e.bookId,
   title: e.Book.title,
   author: e.Book.Author.name,
   synopsis: e.Book.synopsis,
   urlImage: e.Book.urlImage,
   status: e.status,
   start: e.startAt,
   finish: e.finishAt,
  };
 });

 const nextReadings = readingList?.filter((e) => e.status == "NEXT");

 const currentReading = readingList?.filter((e) => e.status == "CURRENT");

 const meeting = group.Meeting?.filter((e) => e.status == "COMING");

 const links = group.GroupLink?.map((e) => {
  return {
   url: e.url,
  };
 });

 return {
  id: group.id,
  name: group.name,
  about: group.about,
  description: group.description,
  urlImage: group.urlImage,
  status: group.status,
  Members: members,
  NextReadings: !nextReadings ? [] : nextReadings,
  CurrentReading: currentReading.length === 0 ? {} : currentReading[0],
  Meeting: meeting.length === 0 ? {} : meeting[0],
  Links: links,
 };
}

async function putGroup(params: CreateGroupParams, groupId: number) {
 const groupExist = await groupRepository.getGroupById(groupId);

 if (!groupExist) {
  throw notFoundError();
 }

 await groupRepository.putGroup(groupId, params);
}

async function createGroup(params: CreateGroupParams, userId: number) {
 await validateGroupName(params.name);

 const group = await groupRepository.createGroup(params);

 const role = await roleRepository.getByName("owner");

 await groupMemberRepository.create(userId, group.id, role.id);

 return group;
}

async function closeOpenGroup(groupId: number){
    const group = await groupRepository.getGroupById(groupId);

    if(!group){
        throw notFoundError();
    }

    if(group.status === "OPEN"){
        await groupRepository.closeGroup(groupId);
        return {}
    }

    if(group.status === "CLOSED"){
        await groupRepository.openGroup(groupId);
        return {}
    }
}

async function validateGroupName(name: string) {
 const groupExist = await groupRepository.findByName(name);

 if (groupExist) {
  throw conflictGroupName();
 }
}

const groupService = {
 getGroups,
 getGroupById,
 putGroup,
 createGroup,
 closeOpenGroup
};

export type CreateGroupParams = {
 name: string;
 about: string;
 description: string;
 urlImage: string;
 status: "OPEN" | "CLOSED";
};

export type ChangeNameGroupParams = {
    name: string
}

export default groupService;
