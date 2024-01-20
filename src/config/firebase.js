import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/*
  const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_API_KEY ,
    authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN ,
    projectId: process.env.NEXT_FIREBASE_PROJECT_ID ,
    storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.NEXT_FIREBASE_APP_ID ,
  };
*/
const firebaseConfig = {
  apiKey: "AIzaSyAiDRpxNbuzgoA6SXE-KgOonMWIKPn85vY",
  authDomain: "bitirmeprojesi-firebase.firebaseapp.com",
  projectId: "bitirmeprojesi-firebase",
  storageBucket: "bitirmeprojesi-firebase.appspot.com",
  messagingSenderId: "653293713219",
  appId: "1:653293713219:web:6cd40aac4a7f2e603021f6",
};

// Initialize Firebase
{
  console.log(process.env.NEXT_FIREBASE_API_KEY);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 