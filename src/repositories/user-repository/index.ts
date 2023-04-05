import { CreateUserParams } from "@/services";
import { prisma } from "@/config";

async function signUp(params: CreateUserParams) {
 return prisma.user.create({
  data: params,
 });
}

async function findByUserName(userName: string) {
 return prisma.user.findFirst({
  where: { userName },
 });
}

async function findByEmail(email: string) {
    return prisma.user.findFirst({
     where: { email },
    });
   }
   

const userRepository = {
 signUp,
 findByUserName,
 findByEmail

};

export default userRepository;
