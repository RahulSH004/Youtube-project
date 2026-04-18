import { useEffect, useState } from "react"
import { api } from "../api/axios"
import { Video } from "../types/videos"
import { VideoCard } from "../components/video_card"
import { useNavigate } from "react-router-dom"

export default function Home(){
    const [videos, setVideos] = useState<Video[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const fetchvideos = async() => {
        try{
            const response = await api.get("/")
            console.log(response.data)
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
            {isLoading ? (<div>Loading...</div>
                ) : videos.length === 0 ? (
                    <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <p className="text-xl text-gray-500">No videos till now</p>
                    </div>
                </div>
                ) : (
            
            
                <div className="flex flex-auto">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        onClick={() => navigate(`/video/${video.id}`)}
                        className="cursor-pointer"
                    >
                        <VideoCard 
                            thumbnail={video.Thumbnail}
                            videoUrl={video.videoUrl}
                            title={video.title}
                            profilePicture={video.user?.ProfilePicture}
                            channelName={video.user?.ChannelName}
                        />
                    </div>
                    ))}
                </div>
            )}    
        </div>
    )
}