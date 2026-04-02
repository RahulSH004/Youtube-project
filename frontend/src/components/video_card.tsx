interface CardProps {
    id: string;
    thumbnail: string;
    videoUrl: string;
    title: string;
    channelName?: string;
    profilePicture?: string;
  }

export const VideoCard = ({thumbnail, title, channelName, profilePicture}: CardProps) => {
    return (
    <div className="w-full max-w-[360px] cursor-pointer group m-2">
      
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
          <img 
            src={thumbnail} 
            alt={title} 
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
        <div className="mt-3 flex gap-3">
          <div className="shrink-0">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt=""
                className="size-9 rounded-full object-cover ring-1 ring-neutral-100"
              />
            ) : (
              <div className="size-9 rounded-full bg-neutral-200 animate-pulse" />
            )}
          </div>
          <div className="flex flex-col pr-2">
            <h3 className="line-clamp-2 text-sm font-bold leading-tight text-neutral-900 group-hover:text-blue-600">
              {title}
            </h3>
            
            <div className="mt-1 flex flex-col text-xs text-neutral-500">
              <span>{channelName}</span>
            </div>
          </div>
          
        </div>
    </div>
    );
};