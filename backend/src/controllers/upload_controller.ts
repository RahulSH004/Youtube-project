import { NextFunction, Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import { ApiError } from '../utils/ApiError';
import slugify from 'slugify';
import { prisma } from '../../db';
import { Upload } from '../schema/upload_schema';

const apiKey = process.env.CLOUDINARY_API_KEY as string;
const cloudname = process.env.CLOUDINARY_CLOUD_NAME as string;

export function getSignature(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if(!userId) return res.status(401).json({message: "Unauthorized"})
    
        const timestamp = Math.round((new Date()).getTime() / 1000);
    
        const params = {
            timestamp,
            folder:`videos/${userId}`,
        }
    
        const signature =  cloudinary.utils.api_sign_request(
            params,
            process.env.CLOUDINARY_API_SECRET as string
        )
        return res.status(200).json({
            signature,
            timestamp,
            apiKey,
            cloudname,
            folder: `videos/${userId}`, 
        })
    } catch (error) {
        console.error("Error getting signature:", error);
        return res.status(500).json({ message: "Failed to get signature" });
    }
}

export async function saveVideo(req: Request, res: Response, next: NextFunction) {

    try {
        const userId = req.user?.id;
        if(!userId) return res.status(401).json({message: "Unauthorized"})
        
        const { title, slug, videoUrl, videoPublicId, description } = req.body;
    
        if(!title || !videoUrl || !videoPublicId) {
            return res.status(400).json({message: "Missing required fields"})
        }
        const baseslug = `${slugify(title, { lower: true, strict: true })}-${Date.now()}`

        const newupload = await prisma.uploads.create({
            data: {
                title,
                slug: baseslug,
                videoUrl,
                videoPublicId,
                description,
                userId,
                type: "PUBLIC",
                status: "PROCESSING",
            }
        })
        return res.status(201).json({
            id: newupload.id,
            title: newupload.title,
            slug: newupload.slug,
            videoUrl: newupload.videoUrl,
            thumbnail: newupload.Thumbnail,
            type: newupload.type,
            createdAt: newupload.createdAt,
            message: "Video Uploaded successfully",
            
        });
    } catch (error) {
        next(error);
    }
}