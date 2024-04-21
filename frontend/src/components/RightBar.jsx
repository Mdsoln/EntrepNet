"use client"
import React from "react";
import Profile from "./Profile";
import Notification from "./Notification";
import FollowingList from "./FollowingsList"
export default function RightBar() {
  return (
    <div className="mt-8 ">
      <div className="flex gap-x-8 ">
        <Notification />
        <Profile />
      </div>
      <div className="bg-[#15264B] h-full rounded-xl">
          <div className="text-white mt-12 text-center">Suggested people</div>
           <FollowingList />
      </div>
    </div>
  );
}
