export interface SignatureResponse {
  signature: string
  timestamp: number
  apiKey: string
  cloudName: string
  folder: string
}

export interface CloudinaryResponse {
  secure_url: string
  public_id: string
  duration: number
  bytes: number
}

export interface UploadState {
  progress: number        // 0-100
  isLoading: boolean
  error: string | null
  videoUrl: string | null
}