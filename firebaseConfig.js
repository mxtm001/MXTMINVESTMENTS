
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB31SlqSOA5ltuXlBXT8Xxud_qHUtNOq0Q",
  authDomain: "mxtm-investment-platform.firebaseapp.com",
  projectId: "mxtm-investment-platform",
  storageBucket: "mxtm-investment-platform.firebasestorage.app",
  messagingSenderId: "185739830490",
  appId: "1:185739830490:web:18a4f6fd1abc0f8899b1e3",
  measurementId: "G-B645485THM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
