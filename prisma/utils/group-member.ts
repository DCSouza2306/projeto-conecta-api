import { GroupMember, Group, User } from "@prisma/client";
import faker from "@faker-js/faker";

type GroupMemberInputParams = Omit<
 GroupMember,
 "id" | "createdAt" | "updatedAt"
>[];

export function groupMemberData(
 numGroups: number,
 groups: Group[],
 users: User[],
 numMembersGroup: number
) {
 const data: GroupMemberInputParams = [];

 for (let i = 0; i < groups.length; i++) {
  if (i >= numGroups) {
   data.push({
    groupId: groups[i].id,
    userId: users[faker.datatype.number({min:0, max: users.length - 1})].id,
    position: "OWNER",
    message: faker.lorem.sentence(),
    status: "APROVED",
   });
  } else {
   for (
    let j = 0;
    j < faker.datatype.number({ min: 1, max: numMembersGroup });
    j++
   ) {
    if (j === 0) {
     data.push({
      groupId: groups[i].id,
      userId: users[faker.datatype.number({min:0, max: users.length - 1})].id,
      position: "OWNER",
      message: faker.lorem.sentence(),
      status: "APROVED",
     });
    }
    if (j === 1) {
     data.push({
      groupId: groups[i].id,
      userId: users[faker.datatype.number({min:0, max: users.length - 1})].id,
      position: "OFFICER",
      message: faker.lorem.sentence(),
      status: "APROVED",
     });
    }
    if (j > 1) {
     data.push({
      groupId: groups[i].id,
      userId: users[faker.datatype.number({min:0, max: users.length - 1})].id,
      position: "MEMBER",
      message: faker.lorem.sentence(),
      status: "APROVED",
     });
    }
   }
  }
 }
 return data;
}
