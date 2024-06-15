
import {BsSend} from "react-icons/bs";
import {useState} from "react";
import useSendMessage from "../../../hooks/useSendMessage.js";

export default function MessageInput() {
    const  {sendMessage,loading} = useSendMessage();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();

        console.log(message)

        if(!message) return;

          try {
              console.log({message});
              await sendMessage({message})
          }catch(err){
              console.log(err)
          }


        setMessage("")

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
                    {loading?<span className="loading loading-spinner"></span>:  <BsSend className='text-white'/>}
                </button>
            </div>
        </form>
    )
}
