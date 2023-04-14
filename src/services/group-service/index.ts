import groupRepository from "../../repositories/group-repository";
import roleRepository from "../../repositories/role-repository";
import groupMemberRepository from "../../repositories/group-member-repository";
import { notFoundError } from "../../errors/not-found-error";

async function getGroups() {
 const groups = await groupRepository.getAllGroups();
 return groups;
}

async function getGroupById(id: number) {
 const group = await groupRepository.getGroupById(id);
 if (!group) {
   console.log("entrou aqui?")
  throw notFoundError();
 }

 const members = group.GroupMember.map((e) => {
  return {
   id: e.User.id,
   name: e.User.userName,
   urlImage: e.User.urlImage,
   position: e.Role.name,
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
        finish: e.finishAt
    }
 })

 const nextReadings = readingList?.filter((e) => e.status == "NEXT");

 const currentReading = readingList?.filter((e) => e.status == "CURRENT");

 const meeting = group.Meeting?.filter((e) => e.status == "COMING");

 const links = group.GroupLink?.map((e) => {
   return{
      url: e.url
   }
 } )

 return {
    id: group.id,
    name: group.name,
    about: group.about,
    description: group.description,
    urlImage: group.urlImage,
    status: group.status,
    Members: members,
    NextReadings: !nextReadings ? [] : nextReadings,
    CurrentReading: !currentReading ? {} : currentReading[0],
    Meeting: meeting.length === 0 ? {} : meeting[0],
    Links: links
 }
}

async function putGroupName(name: string, groupId: number){
   const groupExist = await groupRepository.getGroupById(groupId);

   if(!groupExist){
      throw notFoundError();
   }

   await groupRepository.putGroupName(groupId, name)
}

async function createGroup(params: CreateGroupParams, userId: number){
   const group = await groupRepository.createGroup(params);

   const role = await roleRepository.getByName("owner");

   await groupMemberRepository.create(userId, group.id, role.id)


   return group;

}

const groupService = {
 getGroups,
 getGroupById,
 putGroupName,
 createGroup
};

export type CreateGroupParams = {
   name: string,
   about: string,
   description: string,
   urlImage: string,
   status: "OPEN"
}

export default groupService;
