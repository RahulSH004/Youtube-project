import { prisma } from "../../db";
import type { SignupSchema } from "./auth_schema";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";

const saltround = Number(Bun.env.Salt_Round ?? 10);


export async function signupservice (data: SignupSchema) {
    const {username, email, password, gender, channelName} = data

    try{
        const existinguser = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })
        if(existinguser){
            throw new ApiError(409, "User Already Exist")
        }
        const hashpassword =  await bcrypt.hash(password, saltround)

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashpassword,
                gender,
                ChannelName: channelName,
            },
            select: {
                username: true,
                email: true,
                gender: true,
                ChannelName: true,
            }
        })
        return newUser;
    }catch(e){
        throw new ApiError(500, "Internal server error")
    }
    
}