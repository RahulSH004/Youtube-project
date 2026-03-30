import { Request, Response } from "express";
import { siginservice, signupservice } from "./auth_service";
import { ApiResponse } from "../utils/ApiResponse";

export async function signupController(req: Request, res:Response){
    const data = req.body
    const user = await signupservice(data)
    res.status(201).json(
        new ApiResponse(201, "User created", user)
    )
}

export async function signinController(req: Request, res: Response){
    const data = req.body
    const user = await siginservice(data)
    res.cookie("accesstoken", user.tokens, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24
    })
    res.status(201).json(new ApiResponse(201, "Login Successful !!", user))
}