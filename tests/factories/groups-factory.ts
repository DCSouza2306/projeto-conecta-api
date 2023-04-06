import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createGroup(){
    const group = await prisma.group.create({
        data:{
            about: faker.lorem.words(),
            description: faker.lorem.words(),
            name: faker.lorem.word(),
            status: "OPEN",
            urlImage: faker.lorem.words()
        }
    })

    return group;
}