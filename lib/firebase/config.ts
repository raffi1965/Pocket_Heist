import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANQ3GEWoxyx1U1brrxy5l5809v83orwfs",
  authDomain: "pocket-heist-website-13dd6.firebaseapp.com",
  projectId: "pocket-heist-website-13dd6",
  storageBucket: "pocket-heist-website-13dd6.firebasestorage.app",
  messagingSenderId: "1026256900135",
  appId: "1:1026256900135:web:da7aad7095cb332c7efe02",
  measurementId: "G-JLXLDD78VQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
