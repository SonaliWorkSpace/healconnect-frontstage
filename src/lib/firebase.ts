import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-k3LA_mBBKtamByxZW4dzivV-wqwaogw",
  authDomain: "healconnect-c63b1.firebaseapp.com",
  projectId: "healconnect-c63b1",
  storageBucket: "healconnect-c63b1.firebasestorage.app",
  messagingSenderId: "258469403755",
  appId: "1:258469403755:web:0a47c004de65821582252e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
