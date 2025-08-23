import { Badge, BadgeCheck, X } from 'lucide-react'
import React,{useEffect, useState} from 'react'

const StoriesViewer = ({ viewStory, setViewStory }) => {

    const [progress, setProgress] = useState(0)

    useEffect(()=>{ 
        let timer,progressIneterval;
        
        if(viewStory && viewStory.media_type !== 'video'){
            setProgress(0)
            const duration = 10000
            const setTime = 100  
            let elapsed = 0

            progressIneterval = setInterval(() => {
                elapsed += setTime  
                setProgress((elapsed/duration)*100)
            }, setTime);

            // close story after duration(10sec)
            timer = setTimeout(() => {
                setViewStory(null)
            }, duration);
        }
        return ()=>{
            clearTimeout(timer)
            clearInterval(progressIneterval)
        }

    },[viewStory,setViewStory])

if(!viewStory) return null

    const renderContent = () => {
        switch (viewStory.media_type) {
            case 'image':
                return (
                    <img className='max-w-full max-h-screen object-contain' src={viewStory.media_url}/>
                )
            case 'video':
                return (
                    <video onEnded={()=>setViewStory(null)} className=' max-h-screen' src={viewStory.media_url} controls autoPlay/>
                )
            case 'text':
                return (
                   <div className=' text-2xl text-white ' >{viewStory.content}</div>
                )
                
                 
            default:
                null;
        }
    }

    return (
        <div className='fixed inset-0   bg-black bg-opacity-90 z-110 flex items-center justify-center' style={{ backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : '#000000' }}>

            {/* progress bar */}
            <div className='absolute top-0 left-0 w-full h-1 bg-gray-700'>
                <div className='h-full bg-white transition-all duration-100 linear' style={{ width: `${progress}%` }}>
                </div>
            </div>
            {/* user info top left */}
            <div className=' flex px-6 py-4 gap-2 items-center justify-center bg-black/50 backdrop:blur-2xl rounded absolute top-5 left-5'>
                <img className='border border-white rounded-full size-8' src={viewStory.user.profile_picture} alt="" />
                <p className=' opacity-100 font-medium  text-white'>{viewStory.user.full_name}</p>
                <BadgeCheck className='text-white w-5' />

            </div>
            {/* close button */}
            <button onClick={() => setViewStory(null)} className='absolute top-4 right-4 text-white text-3xl font-bold '>
                <X className='w-8 h-8 hover:scale-110 transition cursor-pointer' />
            </button>

            {/* content wrapper */}
            <div>
        {renderContent()}
            </div>

        </div>
    )
}

export default StoriesViewer
