import React from 'react'
import Sidebar from '@/components/Sidebar'
import FeedSection from '@/components/FeedSection'
import RightBar from '@/components/RightBar'

export default function page() {
  return (
    <div className='h-full grid grid-cols-3 gap-64'>
        <Sidebar /> 
        <FeedSection/>
        <RightBar />
        
    </div>
  )
}
