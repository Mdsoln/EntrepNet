import  {useEffect} from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import NoChatSelected from './NoChatSelected';
import useConversation from "../../../zustand/store";

export default function MessageContainer() {
     const {selectedConversation,setSelectedConversation} =useConversation()

    return (
        <div className='md:min-w-[450px] flex flex-col h-full'>
            {!selectedConversation ? (
                <NoChatSelected/>
            ) : (
                <>
                    {/* Header to display the receiver's name */}
                    <div className="bg-slate-500 px-4 py-2 mb-2">
                        <span className="label-text">
                            To:
                        </span>
                        <span className="text-gray-900 fontbold">
                            {selectedConversation.fullName}
                        </span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}

        </div>
    )
}

