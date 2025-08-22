import React from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus, Video } from 'lucide-react'
import { useState, useEffect } from 'react'
import moment from 'moment'
import StoryModal from './storyModal'
import StoriesViewer from './StoriesViewer.jsx';

const StoriesBar = () => {

    const [stories, setStories] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [viewStory, setViewStory] = useState(null)

    const fetchStories = async () => {
        setStories(dummyStoriesData)
    }

    useEffect(() => {
        fetchStories()
    }, [])


    return (
        <div className=' w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar'>
            <div className='flex gap-4 pb-5 overflow-x-auto no-scrollbar'>
                {/* add story card */}
                <div onClick={() => setShowModal(true)} className=" rounded-1g shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white">
                    <div className='h-full flex flex-col items-center justify-center'>
                        <div className='size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3'>
                            <Plus className='w-5 h-5 text-white' />
                        </div>
                        <p className=''>Create Story</p>

                    </div>
                </div>

                {/* story cards */}
                {
                    stories.map((story, index) => (
                        //gpt
                        <div key={index} onClick={() => setViewStory(story)} className={"relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-880 active:scale-95 "}>

                            <img src={story.user.profile_picture} alt="" className='absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow' />
                            <p className='absolute top-15 left-3 text-white/60 text-sm truncate max-w-24'>{story.content}</p>
                            <p className='text-white absolute bottom-1 right-2 z-10 text-xs'>{moment(story.createdAt).fromNow()}</p>
                            {
                                story.media_type !== "text" && (
                                    <div className='absolute inset-0 z-1 rounded-lg bg-black overflow-hidden'>
                                        {
                                            story.media_type === "image" ?
                                                <img src={story.media_url} alt="" className='h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80' /> : <video className='h-full w-full object-cover hover:110 transition duration-5 opacity-70 hover:opacity-80 ' src={story.media_url} />
                                        }
                                    </div>
                                )
                            }


                        </div>
                    ))
                }
            </div>

            {/* add story model */}
            {showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />}
            {/* view story modal */}
            {viewStory && (
                <StoriesViewer viewStory={viewStory} setViewStory={setViewStory} />
            )}

        </div>
    )
}

export default StoriesBar
