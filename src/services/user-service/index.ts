import { User } from "@prisma/client";
import userRepository from "../../repositories/user-repository";
import { duplicatedUserOrEmail } from "./errors";
import bcrypt from "bcrypt";
import { notFoundError } from "../../errors/not-found-error";

export type CreateUserParams = Omit<User, "id" | "createdAt" | "updatedAt">;

type ReadingListReturnParams = {
   id: number,
   groupId: number,
   title: string,
   status: string
}[]

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

async function getUser(userName: string){
   const user = await validateUserName(userName);
   const readingLists:ReadingListReturnParams = []
   const groups = user.GroupMember.map((e) => {
      e.Group.BookList.forEach((e) => {
         readingLists.push({
            id: e.bookId,
            groupId: e.groupId,
            status: e.status,
            title: e.Book.title
         })
      })
      return {
         id: e.Group.id,
         name: e.Group.name,
         status: e.status,
         position: e.position,
         urlImage: e.Group.urlImage,
      }
   })


   return {
      id: user.id,
      userName: user.userName,
      urlImage: user.urlImage,
      about: user.about,
      Groups: groups,
      ReadingLists: readingLists
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

async function validateUserName(userName: string){
   const user = await userRepository.findByUserName(userName);
   if(!user){
      throw notFoundError();
   }

   return user;
}

const userService = {
 signUp,
 getUser
};

export default userService;
