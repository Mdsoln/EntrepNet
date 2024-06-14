import { useEffect, useState } from "react";
import useConversation from "../zustand/store.js";
import toast from "react-hot-toast";
import {useAuthContext} from "@/context/AuthContext";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const {auth} = useAuthContext()
        const getMessages = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `/ws://localhost:8080/api/v1/chat/message/${auth.userID}/${selectedConversation.receiverID}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                } else {
                    console.error("Failed to fetch messages:", response.statusText);
                    // Handle failed response appropriately (e.g., show error message)
                }
            } catch (err) {
                console.error("Error fetching messages:", err);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?.id){
            getMessages()
        }

    }, [selectedConversation?.id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
