import { NextFunction, Request, Response } from 'express';
import { getUploadSignature, saveVideoMetadata } from '../services/upload_service';


const apiKey = process.env.API_KEY as string;
const cloudname = process.env.CLOUDINARY_NAME as string;

export async function getSignature(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if(!userId) return res.status(401).json({message: "Unauthorized"})
        const SignatureData = await getUploadSignature(userId);
        return res.status(200).json({
            video: SignatureData,
            thumbnail: SignatureData,
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
        
        const { title, slug, videoUrl, videoPublicId, description, type, thumbnail } = req.body;
    
        if(!title || !videoUrl || !videoPublicId || !type) {
            return res.status(400).json({message: "Missing required fields"})
        }
        
        const newupload = await saveVideoMetadata({ title, videoUrl, videoPublicId, Description: description, type, Thumbnail: thumbnail }, userId);
        
        return res.status(201).json({
            data:{
                id: newupload.id,
                title: newupload.title,
                slug: newupload.slug,
                videoUrl: newupload.videoUrl,
                thumbnail: newupload.Thumbnail,
                status: newupload.status,
                type: newupload.type,
                createdAt: newupload.createdAt,
            },
            message: "Video Uploaded successfully",
            
        });
    } catch (error) {
        next(error);
    }
}