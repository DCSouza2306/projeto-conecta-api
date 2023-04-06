import faker from "@faker-js/faker";
import { User } from "@prisma/client";

type UserType = Omit<User, "id" | "createdAt" | "updatedAt">[]

export function userData(num: number) {
 const data: UserType = [];

 for (let i = 0; i < num; i++) {
  data.push({
   email: faker.internet.email(),
   password: faker.internet.password(),
   userName: faker.internet.domainName(),
   urlImage: faker.internet.avatar(),
  });
 }

 return data;
}
