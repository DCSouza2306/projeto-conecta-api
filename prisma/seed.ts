import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
 let groups = await prisma.group.findFirst();

 if (!groups) {
  await prisma.group.createMany({
   data: [
    {
     name: faker.lorem.words(2),
     about: faker.lorem.sentence(10),
     description: faker.lorem.paragraph(),
     status: "OPEN",
     urlImage:
      "https://cfvila.com.br/blog/wp-content/uploads/2019/10/clubes-leitura.jpg",
    },
    {
     name: faker.lorem.words(2),
     about: faker.lorem.sentence(10),
     description: faker.lorem.paragraph(),
     status: "OPEN",
     urlImage:
      "https://cfvila.com.br/blog/wp-content/uploads/2019/10/clubes-leitura.jpg",
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
