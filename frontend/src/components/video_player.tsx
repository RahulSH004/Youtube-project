interface videoplayer{
    videoUrl: string,
    ChannelThumbnail: string,
}

export const Videoplayer = ({videoUrl, ChannelThumbnail}: videoplayer) => {
    return (
        <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-neutral-900/5">
        <video 
            className="size-full outline-none" 
            controls 
            autoPlay 
            src={videoUrl} 
            poster={ChannelThumbnail}
        />
        </div>
    )
}