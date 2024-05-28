
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/store';



export default function Conversation({ conversation}) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)
  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`${isSelected ? "bg-sky-500" : ""} flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
    >
      {/* Avatar goes here */}
      <div className={`avatar ${isOnline ? "online" :""}`}>
        <div className="w-12 h-12 rounded-full">
          {/* eslint-disable-next-line react/prop-types */}
          <img src={conversation.profile} alt="image" />
        </div>
      </div>

      {/* Name and mood emoji */}
      <div className='flex gap-4 justify-between'>
        {/* eslint-disable-next-line react/prop-types */}
        <p className='font-bold text-white'>{conversation.firstName}</p>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </div>
  );
}
