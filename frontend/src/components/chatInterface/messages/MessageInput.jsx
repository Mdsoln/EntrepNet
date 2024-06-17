"use client"
import {BsSend} from "react-icons/bs";
import {useState} from "react";
import useSendMessage from "../../../hooks/useSendMessage.js";
import {useSocketContext} from "@/context/SocketContext";
import {useAuthContext} from "@/context/AuthContext";

export default function MessageInput() {
    const {sendMessage} = useSocketContext();
    const {auth} = useAuthContext()
    const [message, setMessage] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const chatMessage = {
            sender:auth.userID, // Replace with actual sender ID
            receiver: 2,
            content: message,
        };

        if(!message) return;

         try{
             sendMessage('/app/chat', chatMessage);
         }catch (e) {
             console.log(e)
         }finally {
             setMessage("")
         }

    }
    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type="text" 
                    name="message" 
                    value={message}
                    onChange={(e)=> {setMessage(e.target.value)}}
                    placeholder='send a message'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
                />
                <button type="submit" className="pe-3 absolute inset-y-0 end-0 flex items-center">
                   <BsSend className='text-white'/>
                </button>
            </div>
        </form>
    )
}
