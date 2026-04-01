import {z} from 'zod'
import { Gender } from '../../generated/prisma/enums'


export const signupschema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
    gender : z.enum(Gender),
    channelName: z.string().min(3)
})

export const signinschema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export type SignupSchema = z.infer<typeof signupschema>
export type SigninSchema = z.infer<typeof signinschema>