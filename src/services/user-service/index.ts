import { User } from "@prisma/client";
import userRepository from "@/repositories/user-repository";
import { duplicatedUserOrEmail } from "./duplicated-user-email-error";

export type CreateUserParams = Omit<User, "id" | "createdAt" | "updatedAt">;

async function signUp(params: CreateUserParams) {
 await validateEmailAndUserName(params);

 const response = await userRepository.signUp(params);

 return response;
}

async function validateEmailAndUserName(params: CreateUserParams) {
 const { userName, email } = params;
 let data = await userRepository.findByUserName(userName);
 if (data) {
  throw duplicatedUserOrEmail("user name");
 }

 data = await userRepository.findByEmail(email);
 if (data) {
  throw duplicatedUserOrEmail("email");
 }
}

const userService = {
 signUp,
};

export default userService;
