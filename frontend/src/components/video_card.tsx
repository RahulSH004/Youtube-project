interface CardProps {
    id: string;
    thumbnail: string;
    title: string;
    channelName?: string;
    profilePicture?: string;
  }

export const VideoCard = ({thumbnail, title, channelName, profilePicture}: CardProps) => {
    return (
        <div className="max-w-sm rounded-base shadow-xs p-2">
            <img src={thumbnail} alt={title} className="display:block; rounded-lg m-4" />
            <div className="flex flex-row gap-2">
                <img src={profilePicture} alt={channelName} className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm text-black">{channelName}</p>
                </div>
            </div>
        </div>
    );
};