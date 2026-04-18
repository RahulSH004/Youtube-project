
import { cloudnaryUploadResponse, SignatureResponse, SignatureResponseWrapper } from "../types/upload";
import { api } from "./axios";

export async function getUploadSignature(): Promise<SignatureResponseWrapper> {
    const response = await api.get("/upload/signature");
    console.log(response.data);
    return response.data;
}
export async function uploadToCloudinary(file: File, sign: SignatureResponse, type: "video" | "image") {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("api_key", sign.apiKey);
    formdata.append("cloud_name", sign.cloudname);
    formdata.append("timestamp", String(sign.timestamp));
    formdata.append("signature", sign.signature);
    formdata.append("folder", sign.folder);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudname}/${type}/upload`, {
        method: "POST",
        body: formdata
    });
    return response.json();
}

export async function savetodb(data: cloudnaryUploadResponse): Promise<void>{
    await api.post("/upload", {
        title: data.title,
        slug: data.slug,
        videoUrl: data.videoUrl,
        videoPublicId: data.videoPublicId,
        description: data.description,
        type: data.type,
        thumbnail: data.thumbnailUrl,
        thumbnailPublicId: data.thumbnailPublicId
    });

}