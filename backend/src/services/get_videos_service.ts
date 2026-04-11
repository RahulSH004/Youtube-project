import { prisma } from "../../db";
import { UploadType } from "../../generated/prisma/enums";
import { ApiError } from "../utils/ApiError";


export async function getvideosservice(cursor?: string, limit: number = 12) {
    try{
        const videos  = await prisma.uploads.findMany({
            where: {
                type: UploadType.PUBLIC,
                status: "READY",
            },
            orderBy: {
                createdAt: "desc",
            },
            take: limit + 1,
            cursor: cursor ? { 
                id: cursor 
            } : undefined,
            skip: cursor ? 1 : 0,
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
        // why did we fetch limit + 1?
        const hasMore = videos.length > limit;
        const data = hasMore ? videos.slice(0, limit) : videos

        return { 
            videos: data, 
            nextCursor: hasMore ? data[data.length - 1].id : null,
            hasMore ,
        };
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
    if (!video) throw new ApiError(404, "Video not found")
    return video
    }catch(e){
        if(e instanceof ApiError) throw e;
        throw new ApiError(500, "Internal server error")
    }
}