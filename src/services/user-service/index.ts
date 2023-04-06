import { User } from "@prisma/client";
import userRepository from "@/repositories/user-repository";
import { duplicatedUserOrEmail } from "./errors";
import bcrypt from "bcrypt";

export type CreateUserParams = Omit<User, "id" | "createdAt" | "updatedAt">;

async function signUp(params: CreateUserParams) {
 await validateEmailAndUserName(params);

 const { password } = params;

 const hashedPassword = bcrypt.hashSync(password, 12);

 const response = await userRepository.create({
  ...params,
  password: hashedPassword,
 });

 return {
    id: response.id,
    user: response.userName
 };
}

async function validateEmailAndUserName(params: CreateUserParams) {
 const { userName, email } = params;
 const userNameFind = await userRepository.findByUserName(userName);
 if (userNameFind) {
  throw duplicatedUserOrEmail("user name");
 }

 const emailFind = await userRepository.findByEmail(email);
 if (emailFind) {
  throw duplicatedUserOrEmail("email");
 }
}

const userService = {
 signUp,
};

export default userService;
