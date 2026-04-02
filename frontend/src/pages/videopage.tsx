import { useEffect, useState } from "react";
import { Videoplayer } from "../components/video_player";
import { Video } from "../types/videos";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";

export default function Videopage(){
    const {id}  = useParams()
    const [video, setVideo] =  useState<Video>()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchvideos = async() => {

            try{
                const response = await api.get(`/video/${id}`)
                setVideo(response.data.data);
            }catch(error){
                console.error("Error fetching video:", error);
            }finally{
                setLoading(false);
            }
        }
        if(id){
            fetchvideos()
        }
    },[id])
    if (!video) {
        return <div className="p-8 text-center text-red-500 font-medium">Video not found.</div>;
    }
    return (
        <div>
            <Videoplayer 
                videoUrl={video.videoUrl} 
                ChannelThumbnail={video.Thumbnail}
            />
        </div>
    )
}