import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "@/services/user-service";
import { CreateUserParams } from "@/services/user-service";

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