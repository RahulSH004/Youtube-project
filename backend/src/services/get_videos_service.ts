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