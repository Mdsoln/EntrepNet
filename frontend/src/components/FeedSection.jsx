import axios from 'axios'
import React, { useEffect, useState } from 'react'
import usePosts from 'zustand/usePosts.js'
export default function FeedSection() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { posts, setPosts } = usePosts()
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get('http://localhost:8080/api/v1/post/recentPosts')
        const data = res.data

        if (Array.isArray(data)) {
          setPosts(data)
        } else {
          setError('Unexpected data format')
          console.log('Unexpected data format:', data)
        }
      } catch (error) {
        setError('Failed to fetch posts')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="flex flex-col gap-y-4 mt-12">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : (
        posts.map((post, i) => (
          <div key={i}>

            {/* This is for the user and the profile */}
            <div
              className="flex gap-x-1 flex-shrink items-center"
              key={post.name}
            >
              <div>
                <Image
                  src={post.profilePic}
                  width={40}
                  height={40}
                  alt="profile"
                />
              </div>

              <div className="grid grid-cols-1">
                <div className="text-white text-sm text-nowrap">{post.name}</div>
                <div className="flex space-x-1 items-center text-white">
                  <div className="text-xs">{post.role}</div>
                  <div className="text-white">|</div>
                  <div className="text-white text-xs text-nowrap">{post.job}</div>
                </div>
              </div>
            </div>


            {/* This is the div for tweets */}
            <div className='text-white font-thin text-sm my-4'>{post.postContent}</div>

            {/* This is the div for images */}
            <div>
              <Image
                src={post.src}
                width={400}
                height={250}
                alt='Post'
              />
            </div>

          </div>

        ))
      )}
    </div>
  )
}
