import { Request, Response, NextFunction } from "express";
import { siginservice, signupservice } from "../services/auth_service";
import { ApiResponse } from "../utils/ApiResponse";

export async function signupController(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body
        const user = await signupservice(data)
        res.status(201).json(new ApiResponse(201, "User created", user))
    } catch (error) {
        next(error); 
    }
}

export async function signinController(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body
        const user = await siginservice(data)
        res.cookie("access_token", user.tokens, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24
        })
        res.status(201).json(new ApiResponse(201, "Login Successful !!", user))
    }catch (error) {
        next(error);
    }
}