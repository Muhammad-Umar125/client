import { ArrowLeft, TextIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

const StoryModal = ({ setShowModal, fetchStories }) => {

    const bgColors = ["#4f46e5", "#7c3aed", "#db2777", "#aa1938", "#ca8a04", "#0d9488"]

    const [mode, setMode] = useState("text")
    const [background, setBackground] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleMediaUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleCreateStory = async () => {

    }

    return (
        <div className="fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4 ">
            <div className='w-full max-w-md'>
                <div className='text-center mb-4 flex items-center justify-between'>
                    <button onClick={() => setShowModal(false)} className='text-white p-2 cursor-pointer'>
                        <ArrowLeft />
                    </button>
                    <h2 className='text-lg font-semibold'>Create Story</h2>
                    <span className='w-10'></span>
                </div>
                <div className='rounded-lg h-96 flex items-center justify-center relative' style={{ backgroundColor: background }}>
                    { mode==="text"&&(
                        <textarea className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none' placeholder="What's on your mnid" onChange={(e)=>setText(e.target.value)} value ={text}/>
                    )}
                    {
                        mode === 'media '&& previewUrl &&( 
                            media.type.startsWith('image')?(
                                <img src={previewUrl} alt="" className='object-contain max-h-full' />
                            ):(
                                <video src={previewUrl} className='object-contain max-h-full'/>
                            )
                        )
                    }
                </div>

                <div className='flex mt-4 gap-2'>
                    {bgColors.map((color)=>(
                        <button key={color} className='w-6 h-6 rounded-full ring ' onClick={()=>setBackground(color)} style={{backgroundColor:color}}/>
                    ))}
                </div>
                <div className='gap-2 mt-4 flex'>
                    <button className='flex justify-center bg-white w-full rounded text-black'>
                        <TextIcon  />Text
                    </button>

                </div>
            </div>
        </div >

    )
}

export default StoryModal
