import { PrismaClient, Role } from "@prisma/client";
import { RolePermision } from "@prisma/client";
import { userData } from "./utils/user";
import { groupData } from "./utils/group";
import { authorData } from "./utils/author";
import { bookData } from "./utils/book";
import { bookListData } from "./utils/book-list";
import { groupMemberData } from "./utils/group-member";
import { meetingData } from "./utils/meeting";

const prisma = new PrismaClient();

type RolesPermisionsOwnerParams = Omit<RolePermision, "id">[]

async function main() {
 await prisma.role.createMany({
  data: [
   {
    name: "owner",
    description: "Cargo padrão - Usuário com todas as permissões associadas",
   },
   {
    name: "administrator",
    description:
     "Cargo Padrão - Usuário com algumas permissões abaixo do dono do grupo",
   },
   {
    name: "member",
    description: "Cargo Padrão - Usuário com as permissões mais básicas",
   },
  ],
 });

 await prisma.permision.createMany({
  data: [
   {
    name: "delete_group",
    description: "O usuário pode apagar o grupo",
   },
   {
    name: "create_reading_list",
    description:
     "O usuário pode adicionar um novo livro para a lista de leitura do grupo",
   },
   {
    name: "edit_reading_list",
    description:
     "O usuário pode editar os livros que estão na lista de leitura",
   },
   {
    name: "delete_reading_list",
    description: "O usuário pode deletar um livro da lista de leitura",
   },
   {
    name: "create_meeting",
    description: "O usuário pode criar uma nova reunião",
   },
   {
    name: "edit_meeting",
    description: "O usuário pode editar uma reunião",
   },
   {
    name: "delete_meeting",
    description: "O usuário pode excluir uma reunião",
   },
   {
    name: "confirm_meeting",
    description: "O usuário pode confirmar a participação em uma reunião",
   },
   {
    name: "accept_reject_request",
    description:
     "O usuário pode aceitar ou recusar as solicitações de entrada no grupo",
   },
   {
    name: "edit_position_role",
    description: "O usuário pode editar a posição dos membros do grupo",
   },
   {
    name: "create_role",
    description: "O usuário pode criar novos cargos no grupo",
   },
   {
    name: "edit_role_permission",
    description: "O usuário pode editar as permissões dos cargos do grupo",
   },
   {
    name: "remove_member",
    description: "O usuário pode remover membros do grupo",
   },
   {
    name: "edit_group_description",
    description: "O usuário pode editar a descrição do grupo",
   },
   {
    name: "create_links",
    description: "O usuário pode criar novos links do grupo",
   },
   {
    name: "edit_links",
    description: "O usuário pode editar os links do grupo",
   },
   {
    name: "edit_group_name",
    description: "O usuário pode editar o nome do grupo",
   },
   {
    name: "edit_group_image",
    description: "O usuário pode editar a imagem do grupo",
   },
   {
    name: "delete_links",
    description: "O usuáio pode excluir links",
   },
  ],
 });

 const roles = await prisma.role.findMany();
 const permisions = await prisma.permision.findMany();

 const rolesPermisionsOwner: RolesPermisionsOwnerParams = []

 for(let i = 0; i < permisions.length; i ++){
    rolesPermisionsOwner.push({
        roleId: roles[0].id,
        permisionId: permisions[i].id
    })
 }

 await prisma.rolePermision.createMany({
    data: rolesPermisionsOwner
 })

 await prisma.rolePermision.createMany({
    data:[{
        roleId: roles[1].id,
        permisionId: permisions[2 - 1].id
    },
    {
        roleId: roles[1].id,
        permisionId: permisions[3 - 1].id
    },
    {
        roleId: roles[1].id,
        permisionId: permisions[4 - 1].id
    },
    {
        roleId: roles[1].id,
        permisionId: permisions[6 - 1].id
    },
    {
        roleId: roles[1].id,
        permisionId: permisions[8 - 1].id
    },
    {
        roleId: roles[1].id,
        permisionId: permisions[9 - 1].id
    },
    {
        roleId: roles[1].id,
        permisionId: permisions[14 - 1].id
    },
    {
        roleId: roles[1].id,
        permisionId: permisions[15 - 1].id
    },
    {
        roleId: roles[1].id,
        permisionId: permisions[16 - 1].id
    },
    {
        roleId: roles[2].id,
        permisionId: permisions[8 - 1].id
    },
    {
        roleId: roles[2].id,
        permisionId: permisions[15 - 1].id
    },
    ]
 }
 )

  let groups = await prisma.group.findFirst();
 let books = await prisma.book.findFirst();

 const numAuthors = 30;
 const numBooks = 30;
 const numGroups = 6;
 const numUsers = 16;
 const numBooksInList = 5;
 const numGroupsWithMembers = 4;
 const numMaxMembersInGroup = 8;

 if (!books) {
  await prisma.author.createMany({
   data: authorData(numAuthors),
  });

  const authors = await prisma.author.findMany();

  await prisma.book.createMany({
   data: bookData(numBooks, authors),
  });
 }

 if (!groups) {
  //Create groups
  await prisma.group.createMany({
   data: groupData(numGroups),
  });

  //Create Users
  await prisma.user.createMany({
   data: userData(numUsers),
  });

  const users = await prisma.user.findMany();
  const groups = await prisma.group.findMany();
  const books = await prisma.book.findMany();
  const roles = await prisma.role.findMany()

  //Adding members, owner and officers to groups
  await prisma.groupMember.createMany({
   data: groupMemberData(
    numGroupsWithMembers,
    groups,
    users,
    roles,
    numMaxMembersInGroup
   ),
  });

  //Adding books to the groups
  await prisma.bookList.createMany({
   data: bookListData(numBooksInList, books, groups),
  });

  await prisma.meeting.createMany({
   data: meetingData(numGroupsWithMembers, groups)
  });
 }
}

main()
 .catch((e) => {
  console.error(e);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });
