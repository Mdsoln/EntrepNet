import { Separator } from "@/components/ui/separator"
import React from 'react'

export default function IconsBar() {
  const icons =[
    {
      name:"google",
      src:"./Google.svg"
    },
   
  ]
  return (
    <div className="flex flex-col gap-y-2">
      {/** the line and the separator */}
      <div className="flex justify-center items-center gap-x-4">
        <div><Separator orientation='horizontal' className="w-16" /></div>  
        <div className="text-white text-sm">OR</div>
        <div> <Separator orientation='horizontal' className="w-16"/></div>   
      </div>
      <div className="text-xs text-white text-center">continue with</div>
       {/** the icons*/}
      <div className="flex justify-center gap-x-14 flex-grow-1">
        {
          icons.map((icon)=>(
           <i key={icon.name} className="w-6 h-6"><img src={icon.src}/></i>
          ))
        }
      </div>
    </div>
  )
}
