import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetFooter,
  } from "./ui/sheet";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { Separator } from './ui/separator';
export default function Profile() {
  return (
    <Sheet>
    <SheetTrigger>
    <Avatar>
              <AvatarImage src="/profile.svg" />
              <AvatarFallback>Profile</AvatarFallback>
     </Avatar>
    </SheetTrigger>
    <SheetContent className="bg-[rgb(21,38,75)]">
         <SheetHeader className={"gap-y-6 mb-12"}>
            <SheetTitle className="text-white text-center">
                <div>Profile Details</div>
                
            </SheetTitle>
            <div className='flex justify-center'>
              <Image
                 src={"/profile.svg"}
                 width={85}
                 height={85}
                 alt='profile pic'
                 />
              </div>
            <div className='text-center text-white text-xs underline '>
             profile photo
             </div>
         </SheetHeader>

         <div className='text-white flex flex-col gap-y-8'>
              <div className='grid grid-cols-2'><span>Name:</span><span>Periset Niamh</span></div>
              <div className='grid grid-cols-2'><span>Phone:</span><span>+255 765 456 890</span></div>
              <div className='grid grid-cols-2'><span>Email:</span>peri.niamh@hotmail.com<span></span></div>
              <div className='grid grid-cols-2'><span>Job:</span><span>Makeup artist</span></div>
             
         </div>
         <Separator orientation="horizontal" className="w-full mt-8"/>
         <SheetFooter className={"mt-2"}>
            <div className='flex'><Pencil className='text-white'/><div className='text-white'>Update profile</div></div>
         </SheetFooter>
    </SheetContent>
    
</Sheet>
  )
}
