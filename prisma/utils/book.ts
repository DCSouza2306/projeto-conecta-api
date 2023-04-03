import faker from "@faker-js/faker";
import { Author } from "@prisma/client";

type BookType = {
    title: string,
    synopsis: string,
    authorId: number,
    urlImage: string

}[]

export function bookData(num: number, authors: Author[]) {
 const data: BookType = [];

 for (let i = 0; i < num; i++) {
  data.push({
    title: faker.random.word(),
    synopsis: faker.lorem.paragraph(),
    authorId: faker.datatype.number({min:authors[0].id, max: authors[authors.length - 1].id}),
    urlImage: faker.internet.avatar()
  });
 }

 return data;
}
