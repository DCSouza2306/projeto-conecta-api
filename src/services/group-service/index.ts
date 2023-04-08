import groupRepository from "../../repositories/group-repository";
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
   position: e.position,
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

const groupService = {
 getGroups,
 getGroupById,
};

export default groupService;
