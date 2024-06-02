import {useEffect, useState} from "react";
import useConversation from "../zustand/store.js";
import toast from "react-hot-toast";

const useGetMessages = () => {

    const [loading, setLoading] = useState(false );
    const {messages, setMessages,selectedConversation}= useConversation()

    useEffect(()=>{
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`http://localhost/messages/${selectedConversation._id.toString()}`)
    
                const data = await res.json()
                if(data){
                    console.log("we have connected with the api")
                }
    
                if(data.error){
                    throw new Error(data.error)
                }
    
                setMessages(data)
    
            }catch(err){
    
              console.log(`error in the get messages `)
    
            }finally {
            setLoading(false)
            }
    
    
    
        }
           if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id,setMessages])

    return {messages,loading};
}

export default useGetMessages