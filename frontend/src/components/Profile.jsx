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
import axios from 'axios';
import { toast } from "sonner";
export default function Profile() {
    const [data, setData] = useState({});
    useEffect(async () => {

        try {
            const token = localStorage.getItem('jwtToken');
            let response;
            ({ data: response } = await axios.get('http://localhost:8080/api/v1/user/'
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ));
            setData(response)
        } catch (err) {
            toast.error("something went wrong fetching ur profile")

            console.log(err)
        }

    }, []);

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
                    <div className='grid grid-cols-2'><span>Name:</span><span>{data.name}</span></div>
                    <div className='grid grid-cols-2'><span>Phone:</span><span>{data.phone}</span></div>
                    <div className='grid grid-cols-2'><span>Email:</span>{data.email}<span></span></div>
                    <div className='grid grid-cols-2'><span>Job:</span><span>{data.job}</span></div>

                </div>
                <Separator orientation="horizontal" className="w-full mt-8" />
                <SheetFooter className={"mt-2"}>
                    <div className='flex'><Pencil className='text-white' /><div className='text-white'>Update profile</div></div>
                </SheetFooter>
            </SheetContent>

        </Sheet>
    )
}
