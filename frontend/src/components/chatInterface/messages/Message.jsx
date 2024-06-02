import {useAuthContext} from '../../context/AuthContext'
import { TimeConverter } from '../../utils/Timeconverter'
import useConversation from '../../zustand/store'
export default function Message({message}) {
  
  const {auth} = useAuthContext()

  const {selectedConversation} = useConversation()
  const shakeClass = message.shouldShake ? "shake" : ""
  const fromMe = message.senderId === auth._id
  
  const chatClassName = fromMe ? "chat-end" : "chat-start"
  const profilePic = fromMe ? auth.profilePic:selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? "bg-blue-500" : " "

  const formattedTime = TimeConverter(message.createdAt)
  
  return (
    <div className={`chat pb-3 ${chatClassName} ${shakeClass}`}>
        <div className="chat-image avatar shake">
             <div className="w-10 rounded-full">
                 <img src={profilePic || "/vite.svg"} alt="Profile" />
             </div>
        </div>
        <div className={`chat-bubble pb-3 text-white ${bubbleBgColor}`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-cyan-400">{formattedTime}</div>

    </div> 
  )
}

