import z from "zod";

export const upload = z.object({
    videoUrl: z.string(),
    Channelthumnail: z.string(),
    videoTitle: z.string(),
    videoDescription: z.string()
})