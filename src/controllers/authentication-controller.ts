import { Request, Response } from "express";
import httpStatus from "http-status";
import authenticationService, { LoginParams } from "../services/authentication-service";

export async function signIn(req: Request, res: Response){
    const body = req.body as LoginParams

    try {
        const response = await authenticationService.signIn(body);
        res.status(httpStatus.OK).send(response)
    } catch (error) {
        if(error.name == "InvalidCredentialsError"){
            return res.status(httpStatus.UNAUTHORIZED).send(error.message)
        }
        res.sendStatus(httpStatus.BAD_REQUEST)
    }
}