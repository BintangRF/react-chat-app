import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Message({
  isUser,
  isInterface,
  isBackground,
  message,
}) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  isUser = message.senderId === currentUser.uid;
  isInterface = isUser;
  isBackground = isUser;

  const userMessage = isUser ? "flex-row-reverse" : "";
  const userInterface = isInterface ? "items-end" : "";
  const userBackground = isBackground ? "bg-purple-500" : "bg-purple-900";

  return (
    <div
      id="message"
      className={`flex md:gap-3 gap-1 p-5 md:text-sm text-xs ${userMessage}`}>
      <div className={`flex flex-col gap-2 ${userInterface} `}>
        <img
          className="object-cover rounded-full size-14"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span className="text-gray-400">Just Now</span>
      </div>
      <div
        className={`flex flex-col h-auto px-4 py-5 my-auto space-y-10 ${userInterface} `}>
        {message.text !== "" && (
          <p
            className={`flex  min-w-12 w-96 max-w-max flex-wrap font-semibold text-white px-2 py-3 md:px-4 md:py-5 rounded-md ${userBackground}`}>
            {message.text}
          </p>
        )}
        {message.img && (
          <img
            className="object-cover min-w-12 w-64 max-w-96"
            src={message.img}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
