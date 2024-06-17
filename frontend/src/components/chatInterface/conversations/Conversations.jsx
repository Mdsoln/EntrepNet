"use client"
import axios from "axios";
import {useSocketContext} from "@/context/SocketContext";
import Conversation from "./Conversation";

const Conversations = () => {
const fetchUsers = async ()=>{

    try {
        const fetched = await axios.get('http://localhost:8080/users')
        console.log(fetched)
    }catch (e) {
        console.log(e)

    }

}
fetchUsers()

 	return (
	<div className='py-2 flex flex-col overflow-auto'>
			<Conversation />
			<Conversation />
			<Conversation />
           <Conversation />
			<Conversation />
			<Conversation />
    </div>
 	);
};
export default Conversations;