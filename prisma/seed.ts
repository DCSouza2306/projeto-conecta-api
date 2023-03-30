import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import { userData } from "./utils/user";
import { groupData } from "./utils/group";
import { authorData } from "./utils/author";
import { bookData } from "./utils/book";

const prisma = new PrismaClient();

async function main() {
 let groups = await prisma.group.findFirst();
 let books = await prisma.book.findFirst();

 if(!books){
  await prisma.author.createMany({
    data: authorData(10)
  });

  const authors = await prisma.author.findMany();

  await prisma.book.createMany({
    data: bookData(10,(authors.length - 1))
  })
 }

 if (!groups) {
  await prisma.group.createMany({
   data: groupData(2),
  });

  await prisma.user.createMany({
   data: userData(4),
  });

  const user = await prisma.user.findMany();
  const group = await prisma.group.findMany();

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
