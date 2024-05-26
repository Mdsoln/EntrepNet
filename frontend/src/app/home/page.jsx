"use client"
import Sidebar from '@/components/Sidebar'
import FeedSection from '@/components/FeedSection'
import RightBar from '@/components/RightBar'
import {useAuthContext} from '../../context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter()
  const {auth,setAuth} = useAuthContext()

  useEffect(()=>{
     if(!auth){
      router.push("/signin")
     }
  },[router])

  return (
    <main className='h-full grid grid-cols-3 gap-64'>
        <Sidebar /> 
        <FeedSection/>
        <RightBar />
        
    </main>
  )
}
