export interface SignatureResponse {
  signature: string
  timestamp: number
  apiKey: string
  cloudname: string
  folder: string
}

export interface CloudinaryResponse {
  secure_url: string
  public_id: string
  duration?: number
  bytes: number
}

export interface SignatureResponseWrapper {
  video: SignatureResponse
  thumbnail: SignatureResponse
}

export interface cloudnaryUploadResponse {
    videoUrl: string;
    videoPublicId: string;
    thumbnailUrl: string;
    thumbnailPublicId: string;
    title: string;
    description: string;
    slug: string;
    type: string;
}

export interface UploadState {
  progress: number        // 0-100
  isLoading: boolean
  error: string | null
  videoUrl: string | null
  thumbnailUrl: string | null
}

