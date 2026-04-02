
import { Request, Response } from "express"
import { getvideosservice } from "../services/get_videos_service"
import { ApiResponse } from "../utils/ApiResponse"

export async function getvideoController(req: Request, res: Response) {
    const videos = await getvideosservice()
    res.status(200).json(new ApiResponse(200, "Videos fetched", videos))
}