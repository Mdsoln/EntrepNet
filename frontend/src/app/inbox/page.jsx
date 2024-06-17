import React from 'react'
import Conversations from '../../components/chatInterface/conversations/Conversations'
import SideBar from "@/components/chatInterface/conversations/SideBar";
import MessageContainer from "@/components/chatInterface/messages/MessageContainer";

export default function page() {
  return (
      <div className={'flex h-full'}>
        <SideBar />

          <MessageContainer />
      </div>

  )
}
