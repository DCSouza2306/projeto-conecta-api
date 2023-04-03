import faker from "@faker-js/faker";
import { Group, ReadingList } from "@prisma/client";

type ReadingListInputParams = Omit<ReadingList, "id" | "createdAt" | "updatedAt">[]

export function readingListData(groups: Group[]){
    const data: ReadingListInputParams = []

    for(let i = 0; i < groups.length; i ++){
        data.push({
            groupId: groups[i].id,
            description: faker.lorem.sentence(),
            name: faker.random.word()
        })
    }

    return data;

}