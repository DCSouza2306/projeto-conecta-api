import { GroupMember, Group, User, Role } from "@prisma/client";
import faker from "@faker-js/faker";

type GroupMemberInputParams = Omit<
 GroupMember,
 "id" | "createdAt" | "updatedAt"
>[];

type Roles = Role[]

export function groupMemberData(
 numGroups: number,
 groups: Group[],
 users: User[],
 roles: Roles,
 numMembersGroup: number
) {
 const data: GroupMemberInputParams = [];

 for (let i = 0; i < groups.length; i++) {
    const allUsers = users;
  if (i >= numGroups) {
   data.push({
    groupId: groups[i].id,
    userId: users[faker.datatype.number({min:0, max: users.length - 1})].id,
    roleId: roles[0].id,
    message: faker.lorem.sentence(),
    status: "APROVED",
   });
  } else {
   for (
    let j = 0;
    j < faker.datatype.number({ min: 1, max: numMembersGroup });
    j++
   ) {
   
    const index = faker.datatype.number({min:0, max: users.length - 1})
    if (j === 0) {
     data.push({
      groupId: groups[i].id,
      userId: allUsers[index].id,
      roleId: roles[0].id,
      message: faker.lorem.sentence(),
      status: "APROVED",
     });

     allUsers.splice(index,1)
    }
    if (j === 1) {
     data.push({
      groupId: groups[i].id,
      userId: allUsers[index].id,
      roleId: roles[1].id,
      message: faker.lorem.sentence(),
      status: "APROVED",
     });

     allUsers.splice(index,1)
    }
    if (j > 1) {
     data.push({
      groupId: groups[i].id,
      userId: allUsers[index].id,
      roleId: roles[2].id,
      message: faker.lorem.sentence(),
      status: "APROVED",
     });

     allUsers.splice(index,1)
    }
   }
  }
 }
 return data;
}
