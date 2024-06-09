import {useState} from "react";
import useConversation from "../zustand/store.js";

const useSendMessage = () => {

    const [loading, setLoading] = useState(false );
    const {messages, setMessages,selectedConversation}= useConversation()
    
    const sendMessage = async ({message}) => {
        setLoading(true)
        try {
            
           const res = await fetch(`http://localhost/messages/send/${selectedConversation.id}`,{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({message})
            })

            const data = await res.json()

            if(data.error){
                throw new Error(data.error)
            }

            setMessages([...messages,data])

        }catch(err){

          console.error(err.message)

        }finally {
        setLoading(false)
        }



    }

    return {sendMessage,loading};
}

export default useSendMessage