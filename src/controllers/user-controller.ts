import { Request, Response } from "express";
import httpStatus from "http-status";
import userService, { CreateUserParams } from "../services/user-service";

export async function signUp(req: Request, res: Response){
    const body = req.body as CreateUserParams;
    try{
        const data = await userService.signUp(body);
        res.status(httpStatus.CREATED).send(data)
    } catch(err){
        if(err.name === "DuplicatedEmailOrUserError"){
           return res.status(httpStatus.CONFLICT).send(err)
        }
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

export async function getUser(req: Request, res: Response){
    const {userName} = req.params;

    try {
        const user = await userService.getUser(userName);
        res.status(httpStatus.OK).send(user)
    } catch (error) {
        res.sendStatus(httpStatus.NOT_FOUND)
    }
}