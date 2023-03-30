import faker from "@faker-js/faker";

type AuthorType = {
 name: string;
}[];

export function authorData(num: number) {
 const data: AuthorType = [];

 for (let i = 0; i < num; i++) {
  data.push({
   name: faker.name.findName(),
  });
 }

 return data;
}
