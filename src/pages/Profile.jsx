import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/UserProfileInfo'
import { useState, useEffect } from 'react'
import Feed from './Feed'
import PostCard from '../components/PostCard'


const Profile = () => {
  const { profileId } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState('false')

  const fetchUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    fetchUser()
  }, [])


  return user ? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* profile card */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          {/* cover photo */}
          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
            {user.cover_photo && <img src={user.cover_photo} className='w-full h-full object-cover' />}
          </div>
          {/* user info */}
          <UserProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit} />
        </div>
        {/* tabs */}
        <div className=' mt-6'>
          <div className='  bg-white flex shadow rounded-xl p-1 max-w-md mx-auto gap-2'>
            <button onClick={() => setActiveTab('posts')} className={`flex-1 transition-colors cursor-pointer text-gray-500 py-2 px-4 rounded-lg ${activeTab === 'posts' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'} `}>Post</button>
            <button onClick={() => setActiveTab('media')} className={` flex-1 transition-colors cursor-pointer text-gray-500 py-2 px-4 rounded-lg ${activeTab === 'media' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'} `}>Media</button>
            <button onClick={() => setActiveTab('likes')} className={` flex-1 transition-colors cursor-pointer text-gray-500 py-2 px-4 rounded-lg ${activeTab === 'likes' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'} `}>Likes</button>
          </div>
          {/* posts */}
          {activeTab === 'posts' && (
            <div className='mt-6 flex flex-col items-center gap-6'>
              {posts.map((post) => <PostCard key={post._id} post={post} />)}
            </div>
          )}
        </div>
        {/* media */}
        {activeTab === 'media' && (
          <div className='mt-6 flex flex-wrap max-w-6xl'>
            {
              posts.filter((post) => post.image_urls.length > 0).map((post)=>(
                <>
                {
                  post.image_urls.map((image,index)=>(
                  <Link>
                  <img src={image} key={index} className='-64 aspect-video object-cover' alt="" />
                  <p>Posted</p>
                  </Link>
                  )
                  )
                }
                </>
              ))
            }
          </div>
        )}
      </div>
    </div>
  ) : <Loading />
}

export default Profile
