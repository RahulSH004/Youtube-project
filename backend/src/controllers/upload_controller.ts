import { NextFunction, Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import { ApiError } from '../utils/ApiError';
import slugify from 'slugify';
import { prisma } from '../../db';
import { getUploadSignature, saveVideoMetadata } from '../services/upload_service';
import { string } from 'zod';

const apiKey = process.env.CLOUDINARY_API_KEY as string;
const cloudname = process.env.CLOUDINARY_CLOUD_NAME as string;

export async function getSignature(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if(!userId) return res.status(401).json({message: "Unauthorized"})
        const { signature, timestamp } = await getUploadSignature(userId, req.body);
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
        
        const { title, slug, videoUrl, videoPublicId, description, type } = req.body;
    
        if(!title || !videoUrl || !videoPublicId || !type) {
            return res.status(400).json({message: "Missing required fields"})
        }
        
        const newupload = await saveVideoMetadata({ title, videoUrl, videoPublicId, Description: description, type }, userId);
        
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