import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import { userData } from "./utils/user";
import { groupData } from "./utils/group";
import { authorData } from "./utils/author";
import { bookData } from "./utils/book";
import { bookListData } from "./utils/bookList";
import dayjs from "dayjs";

const prisma = new PrismaClient();

async function main() {
 let groups = await prisma.group.findFirst();
 let books = await prisma.book.findFirst();

 const numAuthors = 10;
 const numBooks = 10;
 const numGroups = 2;
 const numUsers = 4;
 const numBooksInList = 4;

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

  const user = await prisma.user.findMany();
  const group = await prisma.group.findMany();
  const books = await prisma.book.findMany();

  //Adding members and owner do first group in list only
  await prisma.groupMember.createMany({
   data: [
    {
     userId: user[0].id,
     groupId: group[0].id,
     message: faker.lorem.sentence(),
     position: "OWNER",
     status: "APROVED",
    },
    {
     userId: user[1].id,
     groupId: group[0].id,
     message: faker.lorem.sentence(),
     position: "MEMBER",
     status: "APROVED",
    },
    {
     userId: user[2].id,
     groupId: group[0].id,
     message: faker.lorem.sentence(),
     position: "OFFICER",
     status: "APROVED",
    },
   ],
  });

  //Create a reading list for the first group
  const readingList = await prisma.readingList.create({
    data:{
      description: faker.lorem.sentence(8),
      name: faker.lorem.word(),
      groupId: group[0].id
    }
  })

  //Adding books to the reading list
  await prisma.bookList.createMany({
    data: bookListData(numBooksInList, books, readingList.id)
  })

  await prisma.meeting.create({
    data: {
      date: dayjs().set("date", 25).set("month", 0).toDate(),
      description: faker.lorem.sentence(),
      hour: dayjs().set("date", 25).set("month", 0).set("hour",20).set("minutes", 0).set("seconds",0).toDate(),
      status: "COMING",
      url: faker.internet.url(),
      groupId: group[0].id
    }
  })


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
