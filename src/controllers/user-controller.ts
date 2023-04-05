import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "@/services/user-service";
import { CreateUserParams } from "@/services/user-service";

export async function signUp(req: Request, res: Response){
    const body = req.body as CreateUserParams;
    try{
        const data = await userService.signUp(body);
        res.status(httpStatus.OK).send(data)
    } catch(err){
        res.sendStatus(httpStatus.BAD_REQUEST)
    }
}