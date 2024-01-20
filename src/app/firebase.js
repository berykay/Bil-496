import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
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
const provider = new GoogleAuthProvider();

const singUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up");
    const user = userCredential.user;
    // Additional logic for handling user information can go here
    return user; // Return the user object if signup is successful
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error while signing up", errorCode, errorMessage);
    throw error; // Rethrow the error for the caller to handle
  }
};

const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Signed in");
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error while signing in");
      console.log(errorCode, errorMessage);
      throw error; // Rethrow the error for the caller to handle
    });
};

const seeState = async (auth) => {
  try {
    const user = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });

    if (user) {
      // User is signed in
      console.log("User is signed in");
      return true;
    } else {
      // User is signed out
      console.log("User is signed out");
      return false;
    }
  } catch (error) {
    console.error("Error while checking user state:", error);
    throw error; // Optionally, you can rethrow the error for the caller to handle
  }
};

const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful");
    })
    .catch((error) => {
      // An error happened.
      console.log("An error happened");
      console.log(error);
    });
};

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(errorCode, errorMessage, email, credential);
  });
}



export { singUp, signIn, seeState, logout, signInWithGoogle };
