import React, { useEffect, useState } from 'react'
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
import {useAuthContext} from '../context/AuthContext'

export default function Profile() {

    const {auth} = useAuthContext()
    const image = auth.image
    const url ="http://localhost:8080"

     const profilePic = url + image
    console.log(profilePic)
    return (
        <Sheet>
            <SheetTrigger>
                <Avatar>
                    <AvatarImage src={profilePic} />
                    <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent className="bg-[rgb(21,38,75)]">
                <SheetHeader className={"gap-y-6 mb-12"}>
                    <SheetTitle className="text-white text-center">
                        <div>Profile Details</div>

                    </SheetTitle>
                    <div className='flex justify-center'>
                        <img
                            src={profilePic}
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
                    <div className='grid grid-cols-2'><span>Name:</span><span>{auth.name}</span></div>
                    <div className='grid grid-cols-2'><span>Phone:</span><span>{auth.phone}</span></div>
                    <div className='grid grid-cols-2'><span>Email:</span>{auth.sub}<span></span></div>
                    <div className='grid grid-cols-2'><span>Job:</span><span>{auth.job}</span></div>

                </div>
                <Separator orientation="horizontal" className="w-full mt-8" />
                <SheetFooter className={"mt-2"}>
                    <div className='flex'><Pencil className='text-white' /><div className='text-white'>Update profile</div></div>
                </SheetFooter>
            </SheetContent>

        </Sheet>
    )
}
