import faker from "@faker-js/faker";

type GroupType = {
    name: string,
    description: string,
    about: string,
    status: "OPEN" | "CLOSED",
    urlImage: string
}[]

export function groupData(num: number) {
 const data: GroupType = [];

 for (let i = 0; i < num; i++) {
  data.push({
    name: faker.lorem.words(2),
    about: faker.lorem.sentence(10),
    description: faker.lorem.paragraph(),
    status: "OPEN",
    urlImage:faker.internet.avatar(),
  });
 }

 return data;
}
