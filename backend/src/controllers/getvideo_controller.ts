
import { Request, Response } from "express"
import { getvideosbid, getvideosservice } from "../services/get_videos_service"
import { ApiResponse } from "../utils/ApiResponse"

export async function getvideoController(req: Request, res: Response) {
    const videos = await getvideosservice()
    res.status(200).json(new ApiResponse(200, "Videos fetched", videos))
};

export async function videobyidController(req: Request, res: Response){
    const videoid = req.params.id as string
    const getvideo = await getvideosbid(videoid)
    if(!getvideo){
        return res.status(404).json({
            error: "Video Not Found"
        })
    }
    return res.json(getvideo)
}