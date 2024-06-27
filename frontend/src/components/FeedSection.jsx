"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import usePosts from '../zustand/usePosts'
import Image from 'next/image'

export default function FeedSection() {
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  const [page, setPage] = useState(1) // Page number for pagination
  const { posts, setPosts ,error,loading,fetchPosts} = usePosts()
  const url ="http://localhost:8080"

  // const fetchPosts = async (page) => {
  //   setLoading(true)
  //   setError(null)
  //   try {
  //     const res = await axios.get(`http://localhost:8080/api/v1/post/recentPosts?page=${page}`)
  //     const data = res.data

  //     if (Array.isArray(data)) {
  //       setPosts(data) // Append new posts to existing ones
  //     } else {
  //       setError('Unexpected data format')
  //       console.log('Unexpected data format:', data)
  //     }
  //   } catch (error) {
  //     setError('Failed to fetch posts')
  //     console.log(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    fetchPosts(page)
  }, [page])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
      setPage((prevPage) => prevPage + 1) // Load next page
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loading])

  return (
      <div className="flex flex-col gap-y-4 mt-12">
        {loading && page === 1 ? (
            <p>Loading...</p>
        ) : error ? (
            <p className='text-center text-red-500'>{error}</p>
        ) : (
            posts.map((post, i) => (
                <div key={i}>

                  {/* This is for the user and the profile */}
                  <div
                      className="flex gap-x-1 flex-shrink items-center"
                      key={post.userName}
                  >
                    <div>
                      <Image
                          src={url + post?.userPicture}
                          width={40}
                          height={40}
                          alt="profile"
                      />
                    </div>

                    <div className="grid grid-cols-1">
                      <div className="text-white text-sm text-nowrap">{post.userName}</div>
                      <div className="flex space-x-1 items-center text-white">
                        <div className="text-xs">{post.userRole}</div>
                        <div className="text-white">|</div>
                        <div className="text-white text-xs text-nowrap">{post.userJob}</div>
                      </div>
                    </div>
                  </div>

                  {/* This is the div for tweets */}
                  <div className='text-white font-thin text-sm my-4'>{post.postContent}</div>


                  { console.log(posts)}
                  {/* This is the div for images */}
                  <div>
                    <Image
                        src={ url + post?.postImage }
                        width={400}
                        height={250}
                        alt={post?.postImage}
                    />
                  </div>

                </div>

            ))
        )}
        {loading && page > 1 && <p>Loading more posts...</p>}
      </div>
  )
}
