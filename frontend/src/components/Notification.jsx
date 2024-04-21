"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetFooter,
  } from "./ui/sheet";
import { BellIcon } from 'lucide-react';
export default function Notification() {
  return (
      <Sheet>
          <SheetTrigger><BellIcon className='text-white text-3xl'/></SheetTrigger>
          <SheetContent className="bg-[#15264B]">
               <SheetHeader>
                  <SheetTitle className="text-white text-center">Notifications</SheetTitle>
               </SheetHeader>
          </SheetContent>
          
    </Sheet>
  )
}
