import React from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { useParams } from 'react-router-dom'
import { Image, SendHorizonalIcon } from 'lucide-react'

const ChatBox = () => {

  const { profileId } = useParams()

  const messages = dummyMessagesData
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(dummyUserData)
  

  return (
    <div className='relative min-h-screen' >
      {/* header */}
      <div className='bg-slate-200 h-18'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex gap-2 '>
            <div><img src='' alt="" />img</div>
            <div>text</div>
          </div>
        </div>
      </div>
      {/* messsages */}
      <div className=' absolute bottom-4 left-0 right-0 flex justify-center'>
        {/* input field */}
        <div className='flex w-full max-w-2xl p-2 shadow rounded-full justify-between bg-white '>
          <input className='px-2 py-1 outline-none w-full ' placeholder='Type a message...' type="text" />
          <div className='flex gap-2'>

            <Image className='size-6 cursor-pointer' />
            <SendHorizonalIcon className='bg-purple-500 rounded-full p-1 text-white cursor-pointer' />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ChatBox
