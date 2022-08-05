import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "beee-ef1c2.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_ID,
  storageBucket: "beee-ef1c2.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSGID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

export default initializeApp(firebaseConfig);