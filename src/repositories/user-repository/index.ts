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
            Group: {
                include: {
                    BookList: {
                        include: {
                            Book: true
                        }
                    }
                }
            }
        }
    }
  }
 });
}

async function findByEmail(email: string) {
    return prisma.user.findFirst({
     where: { email },
    });
   }
   

const userRepository = {
 create,
 findByUserName,
 findByEmail

};

export default userRepository;
