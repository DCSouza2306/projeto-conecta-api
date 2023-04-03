import { Group, Meeting } from "@prisma/client";
import faker from "@faker-js/faker";
import dayjs from "dayjs";

type MeetingInputParams = Omit<Meeting, "id" | "createdAt" | "updatedAt">[];

export function meetingData(num: number, groups: Group[]) {
 const data: MeetingInputParams = [];

 for (let i = 0; i < num; i++) {
  data.push({
   date: dayjs().set("date", 25).set("month", 0).toDate(),
   description: faker.lorem.sentence(),
   hour: dayjs()
    .set("date", 25)
    .set("month", 0)
    .set("hour", 20)
    .set("minutes", 0)
    .set("seconds", 0)
    .toDate(),
   status: "COMING",
   url: faker.internet.url(),
   groupId: groups[i].id,
  });
 }

 return data;
}
