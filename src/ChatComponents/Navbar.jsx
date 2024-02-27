import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between px-3 text-white h-14 bg-purple-950">
      <span className="font-medium">ChatApp</span>
      <div className="flex items-center justify-center gap-2 text-xs ">
        <img
          className="object-cover w-8 h-8 rounded-full"
          src={currentUser.photoURL}
          alt=""
        />
        <span className="capitalize">{currentUser.displayName}</span>
        <button
          className="px-2 py-1 ml-5 bg-purple-400 rounded-sm cursor-pointer hover:bg-purple-500 md:text-sm text-xs"
          onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>
    </div>
  );
}
