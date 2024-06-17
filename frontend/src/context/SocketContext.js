"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SocketContext = createContext(null);


export  const useSocketContext =()=>{
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');

        if(socket){
            console.log(socket)
        }
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/topic/messages', (msg) => {
                    const receivedMessage = JSON.parse(msg.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            },
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

    const sendMessage = (message) => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/message',
                body: JSON.stringify(message),
            });
        }
    };

    return (
        <SocketContext.Provider value={{ messages, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};


