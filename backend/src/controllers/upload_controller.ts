import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import { ApiError } from '../utils/ApiError';

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