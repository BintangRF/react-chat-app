import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Contacts from "./Contacts";

export default function Sidebar({ toggleChat, showChat }) {
  return (
    <div
      className={`bg-purple-600 border-r border-purple-600 ${
        showChat ? " " : "md:block hidden"
      }`}
      style={{ flex: 1.5 }}>
      <Navbar />
      <Search toggleChat={toggleChat} />
      <Contacts toggleChat={toggleChat} />
    </div>
  );
}
