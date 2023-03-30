import faker from "@faker-js/faker";
import { boolean } from "joi";

type BookType = {
    title: string,
    synopsis: string,
    authorId: number,
    urlImage: string

}[]

export function bookData(num: number, max: number) {
 const data: BookType = [];

 for (let i = 0; i < num; i++) {
  data.push({
    title: faker.random.word(),
    synopsis: faker.lorem.paragraph(),
    authorId: faker.datatype.number({min:0, max}),
    urlImage: faker.image.animals()
  });
 }

 return data;
}
