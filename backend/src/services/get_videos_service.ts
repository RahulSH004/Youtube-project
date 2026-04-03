import { resolve } from "node:dns";
import { prisma } from "../../db";
import { UploadType } from "../../generated/prisma/enums";
import { ApiError } from "../utils/ApiError";


export async function getvideosservice(){
    try{
        const videos  = await prisma.uploads.findMany({
            where: {
                type: UploadType.PUBLIC,
            },
            orderBy: {
                createdAt: "desc",
            },
            include:{
                user: {
                    select: {
                        ChannelName: true,
                        ChannelThumbnail: true,
                        ProfilePicture: true,
                    }
                }
            }
        })
        return videos;
    }catch(error){
        if(error instanceof ApiError) throw error;
        throw new ApiError(500, "Internal server error")
    }
}

export async function getvideosbid(id: string){
    try{

        const video = await prisma.uploads.findUnique({
            where: {
            id,
        },
        include:{
            user:{
                select:{
                    id:true,
                    ChannelName: true,
                    ProfilePicture: true,
                    SubscriberCount: true,
                }
            },
        }
    })
    return video
    }catch(e){
        if(e instanceof ApiError) throw e;
        throw new ApiError(500, "Internal server error")
    }
}