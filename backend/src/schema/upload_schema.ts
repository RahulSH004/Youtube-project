import z from "zod";

export const Upload = z.object({
    id: z.string(),
    title: z.string(),
    videoUrl: z.string(),
    Channelthumnail: z.string().optional(),
    Description: z.string()
})

export type UploadSchema = z.infer<typeof Upload>