import React from 'react'
import Button from './Button'
import LinkBtn from './LinkBtn'

export default function Hero() {
  return (
    <div className="flex flex-col gap-12">
    <div className="text-white text-3xl font-extrabold ">
        Get connected to your <br />
        fellow entrepreneurs
     </div>
    <div className="text-white text-lg">
       EnterpeneurConnect connects you <br />
       with like minded entrepreneurs for sharing <br />
       experiences and opportunities as well as <br />
       getting mentorship while expanding your <br />
       market and experience
    </div>
   <LinkBtn text = "Continue" href="/signin" />
</div>
  )
}