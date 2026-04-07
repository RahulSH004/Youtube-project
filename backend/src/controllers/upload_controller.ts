import { Request, Response } from 'express';

export async function UploadController(req: Request, res: Response) {
    const userId = req.user?.id;
    if(!userId) return res.status(401).json({message: "Unauthorized"})

    
}