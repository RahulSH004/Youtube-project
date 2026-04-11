
import { NextFunction, Request, Response } from "express"
import { getvideosbid, getvideosservice } from "../services/get_videos_service"
import { ApiResponse } from "../utils/ApiResponse"

export async function getvideoController(req: Request, res: Response, next: NextFunction) {
    try{
        const cursor = req.query.cursor as string | undefined
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 12
        const videos = await getvideosservice(cursor, limit)

        res.status(200).json(
            new ApiResponse(200, "Videos fetched", videos
        ))
    }catch(error){
        next(error)
    }

};

export async function videobyidController(req: Request, res: Response, next: NextFunction){
    try {
        const videoid = req.params.id as string
        if(!videoid){
            return res.status(400).json({
                error: "Video ID is required"
            })
        }
        const getvideo = await getvideosbid(videoid)
        if(!getvideo){
            return res.status(404).json({
                error: "Video Not Found"
            })
        }
        return res.status(200).json(
            new ApiResponse(200, "Video fetched", getvideo)
        )
    } catch (error) {
        next(error)
    }
}