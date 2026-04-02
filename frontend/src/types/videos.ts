// types.ts
export interface Video {
    id: string;
    title: string;
    videoUrl: string;
    Thumbnail: string;
    type: string;
    User: {
        ChannelName: string;
        ProfilePicture?: string
    }
}