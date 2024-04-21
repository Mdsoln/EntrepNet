"use client"
import React from 'react'
import Header from './Header'
import { Separator } from './ui/separator'
import { BsBookmarks } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { Settings,LogOut,Pencil, Mails, CircleHelp} from 'lucide-react';
import PostModal from './PostModal'

export default function Sidebar() {
  return (
    <div className='flex flex-col gap-y-12 w-48 mx-0 bg-[#15264B] h-full'>
        <Header fontSize={"text-lg"}/>
        <div><Separator orientation='horizontal' className="w-full" /></div> 
        <div className='flex flex-col gap-y-8 pl-6 '>
             <div className='text-white flex gap-x-4'><Mails  /><div>Inbox</div></div>
             <div className='text-white flex gap-x-4'><BsBookmarks className='text-lg font-bold'/> <div>Bookmarks</div></div>
             <PostModal />
             <div className='text-white flex gap-x-4'><Settings /> <div>Settings</div></div>
             <div className="text-white flex gap-x-4"><HiOutlineSpeakerphone className='text-2xl font-extrabold'/><div>Bank offers</div></div>  
        </div> 
        <div><Separator orientation='horizontal' className="w-full" /></div> 
        <div className="flex flex-col gap-y-8 pl-6">
             <div className="text-white flex gap-x-4"><BiHelpCircle  className='text-2xl font-extrabold'/><div>Help</div></div>
             <div className='text-white flex gap-x-4'> <LogOut /><div>logout</div></div>        
        </div>
       
    </div>
  )
}
