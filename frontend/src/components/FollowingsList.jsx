"use client"
import React, { useState } from "react";
import { Followings } from "../lib/constants";
import Image from "next/image";

export default function FollowingsList() {
    const [isFollowing,setIsFollowing]= useState(true)
  return (
    <div className="grid gap-y-6 mt-12 px-4">
      {Followings.map((following) => (
        <div 
        className="flex justify-evenly flex-shrink gap-x-2 items-center h-full"
        key={following.name} 
        >
       <div>
        <Image
         src={following.src}
         width={32}
         height={32}
         alt="profile"
         />
       </div>
        
        <div className="grid grid-cols-1">
            <div className="text-white text-sm">{following.name}</div>
            <div className="flex space-x-1 items-center text-white">
              <div className="text-xs">{following.role}</div>
              <div className="text-white">|</div>
              <div className="text-white text-xs text-nowrap">{following.job}</div>
            </div>
        </div>
        <div>
        <div className="ml-6">
        <button className='bg-[#FCA311] rounded-lg  text-sm px-1  font-medium w-18' onClick={()=>{setIsFollowing(!isFollowing)}}>
            {isFollowing ? "follow" :"following"}
        </button>
        </div>
        
        </div>
        </div>
      ))}
    </div>
  );
}
