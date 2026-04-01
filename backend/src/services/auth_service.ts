import { prisma } from "../../db";
import { signupschema, type SigninSchema, type SignupSchema } from "../schema/auth_schema";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";
import { generateaccesstoken } from "../schema/auth_tokens";
import e from "express";

const saltround = Number(Bun.env.Salt_Round ?? 10);


export async function signupservice (data: SignupSchema) {

    const parsed = signupschema.safeParse(data)
    if(!parsed.success) throw new ApiError(400, parsed.error.message)

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
        if(e instanceof ApiError) throw e;
        throw new ApiError(500, "Internal server error")
    }
    
}

export async function siginservice(data: SigninSchema){
    const {email, password} = data;

    try {
        const existinguser = await prisma.user.findFirst({
            where: {
                email,
            }
        })
        if(!existinguser){
            throw new ApiError(401, "Invalid email or password")
        }
        const ispasswordvalid = await bcrypt.compare(password, existinguser.password);
        if(!ispasswordvalid){
            throw new ApiError(401, "Invalid credentials")
        }
        const tokens = await generateaccesstoken(existinguser.id);
        return {
            user: {
                username: existinguser.username,
                email: existinguser.email
            },
            tokens
        }
    } catch (error) {
        if(e instanceof ApiError) throw e; 
        throw new ApiError(500, "Internal Sever Error")
    }
}