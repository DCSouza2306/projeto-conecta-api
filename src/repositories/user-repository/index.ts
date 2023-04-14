import { CreateUserParams } from "../../services";
import { prisma } from "../../config";

async function create(params: CreateUserParams) {
 return prisma.user.create({
  data: params,
 });
}

async function findByUserName(userName: string) {
 return prisma.user.findFirst({
  where: { userName },
  include: {
   GroupMember: {
    include: {
     Role: true,
     Group: {
      include: {
       BookList: {
        include: {
         Book: true,
        },
       },
      },
     },
    },
   },
  },
 });
}

async function findByEmail(email: string) {
 return prisma.user.findFirst({
  where: { email },
 });
}

async function findById(id: number){
    return prisma.user.findFirst({
        where: {id},
        include: {
            GroupMember: {
                include: {
                    Role: {
                        include: {
                            RolePermision: {
                                include: {
                                    Permision: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

const userRepository = {
 create,
 findByUserName,
 findByEmail,
 findById
};

export default userRepository;
