import faker from "@faker-js/faker";

type UserType = {
    email: string,
    password: string,
    user: string,
    urlImage: string,
}[]

export function userData(num: number) {
 const data: UserType = [];

 for (let i = 0; i < num; i++) {
  data.push({
   email: faker.internet.email(),
   password: faker.internet.password(),
   user: faker.internet.domainName(),
   urlImage: faker.internet.avatar(),
  });
 }

 return data;
}
