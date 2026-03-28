import { Request, Response, NextFunction, application } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from 'jsonwebtoken';
import { access_token } from "./auth_tokens";
import { prisma } from "../../db";
import { ApiResponse } from "../utils/ApiResponse";
import { ZodSchema } from "zod";

export async function authmiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization'];
    if(!authHeader) throw new ApiError(401, "Unauthorized")

    const token = authHeader.split(" ")[1];
    if(!token) throw new ApiError(401, "Unauthorized")
    try {
        const decode = jwt.verify(token, access_token) as {id: string};
        const user = await prisma.user.findFirst({
            where: {id: decode.id},
            select: {
                id: true,
                email: true,
                username: true,
            }
        })
        if(!user) throw new ApiError(401, "Unauthorized");
        
        req.user = user,
        next();
    } catch (error) {
        if(error instanceof ApiError) throw error;
        throw new ApiError(401, "Invalid or expired token")
    }
}

export function validate(schema: ZodSchema){
    return (req: Request, res : Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if(!result.success){
            throw new ApiError(400, result.error.message)
        }
        req.body = result.data;
        next();
    }
}