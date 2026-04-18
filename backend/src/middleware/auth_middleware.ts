import { Request, Response, NextFunction, application } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from 'jsonwebtoken';
import { access_token } from "../schema/auth_tokens";
import { prisma } from "../../db";
import { ZodSchema } from "zod";

export async function authmiddleware(req: Request, res: Response, next: NextFunction){
    
    const token = req.cookies.access_token || req.headers['authorization']?.split(" ")[1];
    if(!token) throw new ApiError(401, "Unauthorized");
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
        
        req.user = user;
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
            throw new ApiError(400, "Invalid request data")
        }
        req.body = result.data;
        next();
    }
}