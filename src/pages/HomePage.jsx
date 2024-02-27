import React, { useState } from "react";
import Sidebar from "../ChatComponents/Sidebar";
import Chat from "../ChatComponents/Chat";

export default function Home() {
  const [showChat, setShowChat] = useState(true);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="flex w-screen h-screen ">
      <Sidebar toggleChat={toggleChat} showChat={showChat} />
      <Chat toggleChat={toggleChat} showChat={showChat} />
    </div>
  );
}
