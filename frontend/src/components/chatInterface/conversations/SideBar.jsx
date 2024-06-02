import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import { LogOutButton } from './LogOutButton'
export default function SideBar() {
  return (
    <div className='border-slate-500 border-r p-4 flex flex-col'>
        <SearchInput />
        <div className='px-3 my-4'>
           <Conversations/>
           <LogOutButton/>
        </div>
    </div>
  )
}
