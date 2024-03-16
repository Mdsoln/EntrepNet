import React from 'react'

export default function LinkBtn({text,href}) {
  return (
   <a href={href}  className='bg-[#FCA311] rounded-lg  text-lg px-4 py-1  font-light w-32'>{text}</a>
  )
}
