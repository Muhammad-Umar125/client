import React from 'react'
import MenuItems from './MenuItems'
import { Link, useNavigate } from 'react-router-dom'
import { assets, dummyUserData } from '../assets/assets'
import { CirclePlus, LogOut } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/clerk-react'

const SlideBar = ({ sideBarOpen, setSideBarOpen }) => {

  const navigate = useNavigate()
  const user = dummyUserData
  const { signOut } = useClerk()

  return (
    <div className={`w-60 xl:w-72 flex flex-col justify-between  bg-white max-sm:absolute top-0 bottom-0 z-20 ${sideBarOpen ? `translate-x-0` : `max-sm:-translate-x-full `} transition-all duration-300 ease-in-out`} >
      <div className='z-120'>
        <img onClick={() => navigate('/')} className='w-36 mx-6 my-5 cursor-pointer' src={assets.logo} alt="" />
        <hr className='border-gray-300' />
        <MenuItems setSiteBarOpen={setSideBarOpen} />
        <Link to='/create-post' className='flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer'>

          <CirclePlus className='w-5 h-5' />
          Create post
        </Link>
      </div>

      <div className='flex w-full border-t p-4  px-7 gap-2 border-gray-200 items-center justify-between'>
        <div className='flex gap-3 items-center cursor-pointer'>
          <UserButton />
          <div>
            <h1 className='text-sm font-medium'>{user.full_name}</h1>
            <p className='text-xs text-gray-500'>@{user.username}</p>
          </div>
        </div>
        <LogOut onClick={signOut} className='cursor-pointer text-gray-400 hover:text-gray-700 transition' />
      </div>
    </div>
  )
}

export default SlideBar
