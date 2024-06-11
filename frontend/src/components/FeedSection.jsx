import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function FeedSection() {
  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(
  ()=>{
 
        const fetchPost =  async ()=>{
          setLoading(true)
         try {
          let res = await axios.get('http://localhost:8080/api/v1/post/recentPosts')
          let data = res.data
          setPosts(data)
          console.log(data)
         } catch (error) {
          console.log(error)
         }finally{
            setLoading(false)
         }
      }

      fetchPost()
  },
  []
  )
  return (
    loading?(
      <p>Loading...</p>
    ):(
      posts.map((post,i)=>(
        <div key={i}>
            {post}
        </div>
      ))
    )
  )
}
