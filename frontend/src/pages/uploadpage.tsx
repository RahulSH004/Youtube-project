import { useState } from "react"
import { getUploadSignature, savetodb, uploadToCloudinary } from "../api/upload";


export default function UploadPage() {
    const [video, setvideo]  = useState<File | null>(null);
    const [thumbnail, setthumbnail] = useState<File | null>(null);
    const [isloading, setisloading] = useState(false);


    const [formdata , setformdata]  = useState({
        title: "",
        description: "",
        type: "PUBLIC",
    })

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!video || !thumbnail) return alert("Please select both video and thumbnail files");

        setisloading(true);

        try{
          const sign = await getUploadSignature();

          const [videoresult , thumbnailresult] = await Promise.all([
            uploadToCloudinary(video, sign.video, "video"),
            uploadToCloudinary(thumbnail, sign.thumbnail, "image")
          ]);

          const slug = formdata.title.toLowerCase().replace(/\s+/g, '-');

          await savetodb({
            videoUrl: videoresult.secure_url,
            videoPublicId: videoresult.public_id,
            thumbnailUrl: thumbnailresult.secure_url,
            thumbnailPublicId: thumbnailresult.public_id,
            title: formdata.title,
            description: formdata.description,
            slug: slug,
            type: formdata.type,
          })
          alert("Upload successful!");
        }catch(err){
          console.error(err);
          alert("Upload failed. Please try again.");
        }finally{
          setisloading(false);
        }   
    }
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
      <div className="max-w-2xl mx-auto py-16 px-6">
        
        {/* Simple Heading */}
        <header className="mb-12">
          <h1 className="text-xl font-medium tracking-tight">New Upload</h1>
          <p className="text-sm text-zinc-500">Video and metadata information</p>
        </header>

        <form 
        onSubmit={handlesubmit}
        className="space-y-10">
          
          {/* File Selection Area */}
          <div className="grid grid-cols-1 gap-8">
            <div className="group">
              <label className="text-[12px] uppercase tracking-wider font-semibold text-zinc-400 mb-2 block">
                Video File
              </label>
              <input 
                type="file" 
                accept="video/*"
                onChange={(e) => setvideo(e.target.files?.[0] || null)}
                className="w-full text-sm text-zinc-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border file:border-zinc-200 file:bg-transparent file:text-zinc-700 file:cursor-pointer hover:file:bg-zinc-50 transition-all"
              />
            </div>

            <div className="group">
              <label className="text-[12px] uppercase tracking-wider font-semibold text-zinc-400 mb-2 block">
                Thumbnail
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setthumbnail(e.target.files?.[0] || null)}
                className="w-full text-sm text-zinc-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border file:border-zinc-200 file:bg-transparent file:text-zinc-700 file:cursor-pointer hover:file:bg-zinc-50 transition-all"
              />
            </div>
          </div>

          {/* Text Fields */}
          <div className="space-y-6 pt-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Title"
                value={formdata.title}
                onChange={(e) => setformdata({...formdata, title: e.target.value})}
                className="w-full bg-transparent border-b border-zinc-200 py-2 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-300"
              />
            </div>

            <div className="relative">
              <textarea 
                placeholder="Description"
                value={formdata.description}
                onChange={(e) => setformdata({...formdata, description: e.target.value})}
                className="w-full bg-transparent border-b border-zinc-200 py-2 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-300 resize-none"
              />
            </div>

            <div className="flex items-center justify-between border-b border-zinc-200 py-2">
              <label className="text-sm text-zinc-500">Visibility</label>
              <select 
                value={formdata.type}
                onChange={(e) => setformdata({...formdata, type: e.target.value})}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer text-zinc-800"
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
                <option value="UNLISTED">Unlisted</option>
              </select>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end space-x-6 pt-6">
            <button 
              type="button"
              className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="bg-zinc-900 text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all active:scale-95"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}