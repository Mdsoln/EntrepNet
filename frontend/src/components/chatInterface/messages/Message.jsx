import {useAuthContext} from '@/context/AuthContext'
import useConversation from '@/zustand/store'
export default function Message({message}) {

  const fromMe = true

  const chatClassName = fromMe ? "chat-end" : "chat-start"
  const profilePic = fromMe? "path/myprofilepic.jpg":"path/sender.jpc"
  const bubbleBgColor = fromMe ? "bg-blue-500" : " "

  return (
    <div className={`chat pb-3 ${chatClassName}`}>
        <div className="chat-image avatar shake">
             <div className="w-10 rounded-full">
                 <img src={profilePic || "/vite.svg"} alt="Profile" />
             </div>
        </div>
        <div className={`chat-bubble pb-3 text-white ${bubbleBgColor}`}>
          Hii
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-cyan-400">12:33</div>

    </div> 
  )
}

