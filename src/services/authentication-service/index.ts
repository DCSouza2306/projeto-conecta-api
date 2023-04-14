import userRepository from "../../repositories/user-repository";
import { invalidCredentialsError } from "./errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import sessionRepository from "../../repositories/session-repository";

export type LoginParams = {
    email: string;
    password: string
}


async function signIn(params: LoginParams){
    const {email, password} = params;

    const user = await validateUser(email);

    await validatePassword(password, user.password);

    const token = await createSession(user.id);
    delete user.password
    return {
        user: user,
        token
    }
}

async function validateUser(email:string){
    const user = await userRepository.findByEmail(email);
    if(!user){
        throw invalidCredentialsError()
    }

    return user;
}

async function validatePassword(password: string, userPassword: string){
    const isPasswordValid = bcrypt.compareSync(password, userPassword)
    if(!isPasswordValid){
        throw invalidCredentialsError();
    }
}

async function createSession(userId: number){
    const token = jwt.sign({userId}, process.env.JWT_SECRET);

    await sessionRepository.createSession(userId, token);

    return token;
}

const authenticationService = {
    signIn,
};

export default authenticationService