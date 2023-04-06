import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createBooks() {
 const author = await prisma.author.create({
  data: {
   name: faker.name.findName(),
  },
 });
 const book = await prisma.book.create({
  data: {
   authorId: author.id,
   synopsis: faker.lorem.sentence(),
   title: faker.lorem.word(),
   urlImage: faker.internet.avatar(),
  },
 });

 delete book.createdAt
 delete book.updatedAt

 return book;
}
