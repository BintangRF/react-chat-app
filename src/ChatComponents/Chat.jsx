import React, { useContext } from "react";
import Cam from "../assets/cam.png";
import AddFriends from "../assets/add.png";
import More from "../assets/more.png";
import Back from "../assets/back.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

export default function Chat({ showChat, toggleChat }) {
  const { data } = useContext(ChatContext);
  const handleSelect = () => {
    toggleChat();
  };

  return (
    <div
      className={`max-h-screen w-screen ${showChat ? "md:block hidden" : ""}`}
      style={{ flex: 3 }}>
      <div className="flex items-center justify-between px-3 text-white bg-purple-800 h-14 max-w-screen">
        <span className="font-semibold flex items-center capitalize">
          <button className="mr-2 md:hidden block" onClick={handleSelect}>
            <img src={Back} alt="" />
          </button>
          {data.user?.displayName}
        </span>
        <div className="flex gap-3">
          <img src={Cam} className="size-7 cursor-pointer" alt="" />
          <img src={AddFriends} className="size-7 cursor-pointer" alt="" />
          <img src={More} className="size-7 cursor-pointer" alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
