import z from "zod";
import { vi } from "zod/locales";

export const Upload = z.object({
    title: z.string(),
    videoUrl: z.string(),
    videoPublicId: z.string(),
    Channelthumnail: z.string().optional(),
    Description: z.string(),
    type: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]),
})

export type UploadSchema = z.infer<typeof Upload>