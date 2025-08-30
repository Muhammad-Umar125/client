import { useEffect, useState } from 'react'
import { UserPlus, UserCheck, UserRoundPen, User, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  dummyConnectionsData,
  dummyFollowersData,
  dummyFollowingData,
  dummyPendingConnectionsData
} from '../assets/assets'

const Connection = () => {
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState("Followers")

  const [connection, setConnection] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [pendingConnection, setPendingConnection] = useState([])

  useEffect(() => {
    setConnection(dummyConnectionsData)
    setFollowers(dummyFollowersData)
    setFollowing(dummyFollowingData)
    setPendingConnection(dummyPendingConnectionsData)
  }, [])

  // ✅ define all tabs in one array
  const dataArray = [
    { label: 'Followers', value: followers, icon: User },
    { label: 'Following', value: following, icon: UserCheck },
    { label: 'Pending', value: pendingConnection, icon: UserRoundPen },
    { label: 'Connections', value: connection, icon: UserPlus },
  ]

  return (
    <div className='min-h-screen pl-27 pt-6 bg-slate-50'>
      <div className='flex flex-col gap-3'>
        <h1 className='font-bold text-3xl'>Connection</h1>
        <p className='text-slate-600'>Manage your network and discover new connections</p>
      </div>

      {/* ✅ stats cards */}
      <div className=' flex items-center justify-between h-50 w-180'>
        {dataArray.map((tab, index) => (
          <div key={index} className='bg-white rounded shadow-lg items-center flex flex-col gap-2 justify-center px-10 py-3'>
            <p className='font-bold'>{tab.value.length}</p>
            <p className='text-slate-600'>{tab.label}</p>
          </div>
        ))}
      </div>

      {/* ✅ navigation tabs */}
      <div className='border bg-white gap-4 shadow-lg p-2 rounded border-gray-200 inline-flex'>
        {dataArray.map((tab, index) => (
          <button
            key={index}
            onClick={() => setCurrentTab(tab.label)}
            className={`flex cursor-pointer items-center gap-1 text-sm px-3 py-1 transition-colors ${currentTab === tab.label
              ? "bg-white font-medium text-black"
              : "text-gray-500 hover:text-black"
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
      <div className='flex flex-wrap gap-6 mt-6'>
        {dataArray.find((item) => item.label === currentTab).value.map((user) => (
          <div key={user._id} className='w-full max-w-88 flex gap-5 p-6 bg-white shadow rounded-md'>
            <img src={user.profile_picture} className='rounded-full w-12 h-12 shadow-md mx-auto' alt="" />
            <div className='flex-1'>
              <p className='font-medium text-slate-700'>{user.full_name}</p>
              <p className=' text-slate-500'>@{user.username}</p>
              <p className='text-sm text-slate-600'>{user.bio.slice(0, 30)}...</p>
              <div className='flex max-sm:flex-col gap-2 mt-4'>
                {
                  <button onClick={() => navigate(`/profile/${user._id}`)} className='w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-680 hover:to-purple-788 active:scale-95 transition text-white cursor-pointer'>
                    View Profile
                  </button>
                }
                {
                  currentTab === 'Following' && (
                    <button className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer'>
                      Unfollow
                    </button>
                  )
                }
                {
                  currentTab === 'Pending' && (
                    <button className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer'>
                      Accept
                    </button>
                  )
                }
                {
                  currentTab === 'Connectoins' && (
                    <button onClick={()=>navigate(`/messages/${user._id}`)} className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-280 text-slate-800 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1'>
                      <MessageSquare className='w-4 h-4' />
                      Message
                    </button>
                  )
                }
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Connection
