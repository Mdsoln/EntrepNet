import React from 'react'
import Conversations from './Conversations'
export default function SideBar() {
  return (
    <div className='border-slate-500 border-r p-4 flex flex-col'>
        <div className='px-3 my-4'>
           <Conversations/>
        </div>
    </div>
  )
}
