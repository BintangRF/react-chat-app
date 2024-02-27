import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBERwINXxPjBkWObIKZcYgH9eefmMuIQWQ",
  authDomain: "chat-app-db172.firebaseapp.com",
  projectId: "chat-app-db172",
  storageBucket: "chat-app-db172.appspot.com",
  messagingSenderId: "374419734807",
  appId: "1:374419734807:web:8f45e8fc990652bd0eb752",
  measurementId: "G-201PQZBTJH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
