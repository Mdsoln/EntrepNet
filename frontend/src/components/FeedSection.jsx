import axios from 'axios'
import React, { useEffect, useState } from 'react'
import usePosts from 'zustand/usePosts.js'
export default function FeedSection() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {posts,setPosts}= usePosts()
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
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        posts.map((post, i) => (
          <div key={post.id || i}> {/* Use a unique identifier if available */}
            {post.content || JSON.stringify(post)} {/* Adjust according to your post structure */}
          </div>
        ))
      )}
    </>
  )
}
