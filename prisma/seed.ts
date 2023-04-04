import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import { userData } from "./utils/user";
import { groupData } from "./utils/group";
import { authorData } from "./utils/author";
import { bookData } from "./utils/book";
import { bookListData } from "./utils/book-list";
import { groupMemberData } from "./utils/group-member";
import dayjs from "dayjs";
import { readingListData } from "./utils/reading-list";
import { meetingData } from "./utils/meeting";

const prisma = new PrismaClient();

async function main() {
 let groups = await prisma.group.findFirst();
 let books = await prisma.book.findFirst();

 const numAuthors = 30;
 const numBooks = 30;
 const numGroups = 6;
 const numUsers = 16;
 const numBooksInList = 5;
 const numGroupsWithMembers = 4;
 const numMaxMembersInGroup = 8;

 if (!books) {
  await prisma.author.createMany({
   data: authorData(numAuthors),
  });

  const authors = await prisma.author.findMany();

  await prisma.book.createMany({
   data: bookData(numBooks, authors),
  });
 }

 if (!groups) {
  //Create groups
  await prisma.group.createMany({
   data: groupData(numGroups),
  });

  //Create Users
  await prisma.user.createMany({
   data: userData(numUsers),
  });

  const users = await prisma.user.findMany();
  const groups = await prisma.group.findMany();
  const books = await prisma.book.findMany();

  //Adding members, owner and officers to groups
  await prisma.groupMember.createMany({
   data: groupMemberData(
    numGroupsWithMembers,
    groups,
    users,
    numMaxMembersInGroup
   ),
  });

  //Create a reading lists for groups with members
  await prisma.readingList.createMany({
   data: readingListData(groups)
  });

  const readingLists = await prisma.readingList.findMany()

  //Adding books to the reading list
  await prisma.bookList.createMany({
   data: bookListData(numBooksInList, books, readingLists),
  });

  await prisma.meeting.createMany({
   data: meetingData(numGroupsWithMembers, groups)
  });
 }
}

main()
 .catch((e) => {
  console.error(e);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });
