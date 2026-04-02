// types.ts
export interface Video {
    id: string;
    title: string;
    videoUrl: string;
    Thumbnail: string;
    type: string;
    user: {
        ChannelName: string;
        ProfilePicture?: string
    }
}