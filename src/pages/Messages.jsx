import { Eye, MessageSquare, MessagesSquareIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Messages = () => {

  const navigate = useNavigate()

  const [connection, setConnection] = useState([])

  useEffect(() => {
    setConnection(dummyConnectionsData)
  }, [])



  return (
    <div className=' pl-27 pt-6 bg-slate-50 '>
      <div className='flex flex-col gap-3 ' >
        <h1 className='font-bold text-3xl'>Messages</h1>
        <p className='text-slate-600'>Talk to your friends and family</p>

        {/* connected users */}

        {connection.map((user) => (
          <div key={user._id} className='rounded shadow p-4 w-4xl bg-white flex gap-4' >
            <div>
              <img className='rounded-full size-12' src={user.profile_picture} alt="" />
            </div>
            <div>
              <p className='mb-1' >{user.full_name}</p>
              <p className='text-slate-500 ' >@{user.username}</p>
              <p className='text-slate-600 text-sm' >{user.bio}</p>
            </div>
            <div className='flex gap-2 flex-col'>
              <button onClick={() => navigate(`/messages/${user._id}`)} className=' p-1 cursor-pointer flex items-center justify-center text-sm size-10 rounded hover:bg-slate-200 text-slate-800 bg-slate-100  ' >
                <MessageSquare  className='w-4 h-4' />
              </button>
              <button onClick={() => navigate(`/profile/${user._id}`)} className='p-1 cursor-pointer flex items-center justify-center text-sm size-10 rounded hover:bg-slate-200 text-slate-800  bg-slate-100 ' >
                <Eye  className='w-4 h-4' />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Messages
