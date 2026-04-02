import { useEffect, useState } from "react"
import { api } from "../api/axios"
import { Video } from "../types/videos"
import { VideoCard } from "../components/video_card"

export default function Home(){
    const [videos, setVideos] = useState<Video[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchvideos = async() => {
        try{
            const response = await api.get("/")
            setVideos(response.data.data)
            setIsLoading(false)
        }catch(error){
            console.log("error: ",error)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchvideos()
    }, [])
    return (
        <div>
            {isLoading ? <div>Loading...</div> : <div>
                {videos.map((video) => (
                    <VideoCard key={video.id}
                        id={video.id}
                        thumbnail={video.Thumbnail}
                        title={video.title}
                        profilePicture={video.User?.ProfilePicture}
                        channelName={video.User?.ChannelName}
                    />
                ))}
            </div>}
        </div>
    )
}