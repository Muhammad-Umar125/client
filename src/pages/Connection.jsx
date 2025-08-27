import React, { useEffect, useState } from 'react'
import { Users, UserPlus, UserCheck, UserRoundPen, User } from 'lucide-react'
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
      <div className='border flex items-center justify-between h-50 w-180'>
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
            className={`flex cursor-pointer items-center gap-1 text-sm px-3 py-1 transition-colors ${
              currentTab === tab.label
                ? "bg-white font-medium text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Connection
