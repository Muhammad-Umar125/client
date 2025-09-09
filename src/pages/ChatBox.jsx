import React, { useState, useRef, useEffect } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { useParams } from 'react-router-dom'
import { Image, SendHorizonalIcon } from 'lucide-react'

const ChatBox = () => {

  const { profileId } = useParams()

  const messages = dummyMessagesData
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(dummyUserData)
  const messagesEndRef = useRef(null) //last messages 

  const sendMessage = async () => {

  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  return user && (
    <div className=' relative min-h-screen' >
      {/* header */}
      <div className='flex gap-2 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 items-center md:px-10 xl:pl-42 border-b border-gray-300'>
        <img className='rounded-full size-8' src={user.profile_picture} alt="" />
        <div>

          <div className='font-medium'>{user.full_name}</div>
          <div className='text-sm to-gray-500 -mt-1.5'>@{user.username}</div>
        </div>
      </div>
      {/* messsages */}
      <div className='p-5 md:px-10 h-full overflow-y-scroll'>
        <div className='space-y-4 max-w-4xl mx-auto'>
          {
            messages.toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((message, index) => (
              <div key={index} className={`flex flex-col ${message.to_user_id !== user._id ? 'items-start' : 'items-end'}`}>
                <div className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${message.to_user_id !== user._id ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                  {message.message_type === 'image' &&
                    <img src={message.media_url} className='w-full max-w-sm rounded-lg mb-1' alt="" />
                  }
                  <p>{message.text}</p>
                </div>
              </div>
            ))
          }
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className=' absolute bottom-4 left-0 right-0 flex justify-center'>
        {/* input field */}
        <div className='items-center flex w-full max-w-2xl p-2 shadow rounded-full justify-between bg-white '>
          <input className='px-2 py-1 outline-none w-full text-slate-700'
            placeholder='Type a message...' type="text"
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            onChange={(e) => setText(e.target.value)} value={text} />
          <div className='flex gap-2 items-center'>
            <label htmlFor="image">
              {
                image ? <img src={URL.createObjectURL(image)} className='h-8 rounded'></img> : <Image className='size-6 cursor-pointer' />
              }
              <input type="file" id='image' accept='image/*' hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
            <button onClick={sendMessage}
              className='bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 cursor-pointer text-white p-2 rounded-full'>
              <SendHorizonalIcon size={18}/>
            </button>
          </div>
        </div>
      </div>

    </div >
  )
}

export default ChatBox
