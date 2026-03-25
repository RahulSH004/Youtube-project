export class ApiResponse {
    success: boolean
    
    constructor(
        public statusCode: number,
        public message: string,
        public data?: unknown
    ) {
        this.success = statusCode < 400
    }
}