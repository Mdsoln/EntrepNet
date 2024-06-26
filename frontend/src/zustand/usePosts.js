import axios from 'axios';
import { create } from 'zustand';

const usePosts = create((set)=>({
    loading:false,
    setLoading:(value)=>set({loading:value}),
    error:null,
    setError:(value)=>set({error:value}),
    posts:[],
    setPosts:(posts)=>set({posts}),
    fetchPosts : async (page) => {
       set(state=>({...state,loading:true}));
        try {
          const res = await axios.get(`http://localhost:8080/api/v1/post/recentPosts?page=${page}`)
          const data = res.data
    
          if (Array.isArray(data)) {
            set(state=>({...state,posts:res.data}));// Append new posts to existing ones
          } else {
            set(state=>({...state,error:"unexpected error happened please try again"}))
            console.log('Unexpected data format:', data)
          }
        } catch (error) {
            set(state=>({...state,error:"Failed to fetch posts"}))
          
          console.log(error)
        } finally {
            set(state=>({...state,loading:false}))
        }
      }
}))

export default usePosts;