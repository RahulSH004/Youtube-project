import { prisma } from "../../db";
import { UploadSchema } from "../schema/upload_schema";
import cloudinary from "../utils/cloudinary";
import  slugify  from "slugify";


export async function getUploadSignature(userid: string){
    const timestamp = Math.round((new Date()).getTime() / 1000);
    
    const params = {
            timestamp,
            folder:`videos/${userid}`,
    }
    
    const signature =  cloudinary.utils.api_sign_request(
        params,
        process.env.API_SECRET as string
    )
    return { 
        signature, 
        timestamp, 
        apiKey: process.env.API_KEY, 
        cloudname: process.env.CLOUDINARY_CLOUD_NAME, 
        folder: `videos/${userid}` 
    };
}

export async function saveVideoMetadata(data: UploadSchema, userId: string) {

    const baseSlug = slugify(data.title, { lower: true, strict: true })
    const uniqueSlug = `${baseSlug}-${Date.now()}`

    const newupload = await prisma.uploads.create({
        data: {
                title: data.title,
                slug: uniqueSlug,
                videoUrl: data.videoUrl,
                videoPublicId: data.videoPublicId,
                description: data.Description,
                userId,
                type: "PUBLIC",
                status: "PROCESSING",
        }
    })
    return newupload;
}