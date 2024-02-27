import React, { useContext, useEffect, useState } from "react";
import Profile from "../assets/poto-profil.png";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

export default function Contacts({ toggleChat }) {
  const handleSelect = (u) => {
    toggleChat();

    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const [contacts, setContacts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getContacts = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setContacts(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getContacts();
  }, [currentUser.uid]);

  return (
    <>
      {Object.entries(contacts)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((contact) => (
          <div
            className="flex items-center gap-3 px-3 py-5 cursor-pointer hover:bg-purple-700"
            onClick={() => handleSelect(contact[1].userInfo)}
            key={contact[0]}>
            <img
              className="object-cover rounded-full w-9 h-9"
              src={contact[1].userInfo.photoURL}
              alt=""
            />
            <div className="userchatinfo">
              <span className="font-semibold text-gray-100 capitalize">
                {contact[1].userInfo.displayName}
              </span>
              <p className="text-white">{contact[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </>
  );
}
