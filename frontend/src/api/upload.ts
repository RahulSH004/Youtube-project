import { api } from "./axios";

export async function getUploadSignature() {
    const response = await api.get("/upload/signature");
    return response.data;
}