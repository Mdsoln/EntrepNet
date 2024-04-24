"use client"
import React from 'react'
import Header from './Header'
import { Separator } from './ui/separator'
import { BsBookmarks } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { Settings,LogOut,Pencil, Mails, CircleHelp} from 'lucide-react';
import PostModal from './PostModal'
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className='flex flex-col gap-y-12 w-48 mx-0 bg-[#15264B] h-full'>
        <Header fontSize={"text-lg"}/>
        <div><Separator orientation='horizontal' className="w-full" /></div> 
        <div className='flex flex-col gap-y-8 pl-6 '>
             <div className='text-white hover:rounded-lg flex gap-x-4 hover:bg-teal-50 hover:text-black hover:p-4 transition-all ease'><Mails  /><div>Inbox</div></div>
             <div className='text-white hover:rounded-lg flex gap-x-4  hover:bg-teal-50 hover:text-black hover:p-4 transition-all ease'><BsBookmarks className='text-lg font-bold'/> <div>Bookmarks</div></div>
                  <PostModal />
             <div className='text-white hover:rounded-lg flex gap-x-4  hover:bg-teal-50 hover:text-black hover:p-4 transition-all ease'><Settings /> <div>Settings</div></div>
             <div className="text-white flex gap-x-4 hover:rounded-lg hover:bg-teal-50 hover:text-black hover:p-4 transition-all ease"><HiOutlineSpeakerphone className='text-2xl font-extrabold'/>
               <div><Link href={'/bankoffers'}>Bank offers</Link></div>
            </div>  
        </div> 
        <div><Separator orientation='horizontal' className="w-full" /></div> 
        <div className="flex flex-col gap-y-8 pl-6">
             <div className="text-white flex gap-x-4">
              <BiHelpCircle  className='text-2xl font-extrabold  hover:bg-teal-50 hover:text-black hover:p-4 transition-all ease'/><div>Help</div>
            </div>
             <div className='text-white flex gap-x-4  hover:bg-teal-50 hover:text-black hover:p-4 transition-all ease'> <LogOut /><div>logout</div></div>        
        </div>
       
    </div>
  )
}
