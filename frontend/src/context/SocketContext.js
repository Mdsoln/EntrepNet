"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState([]);

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8080/ws');

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'chat') {
                setMessages((prevMessages) => [...prevMessages, message]);
            } else if (message.type === 'userUpdate') {
                setConnectedUsers(message.users);
            }
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    const sendMessage = (chatMessage) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(chatMessage));
        }
    };

    return (
        <SocketContext.Provider value={{ messages, connectedUsers, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};
