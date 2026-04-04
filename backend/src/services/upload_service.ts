import { prisma } from "../../db";



export async function uploadVideo(userid: string){
    const uploads = await prisma.uploads.create({
        
    })
}