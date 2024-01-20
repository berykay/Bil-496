import { auth } from "../config/firebase";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from "firebase/auth";

const provider = new GoogleAuthProvider();

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up");
    const user = userCredential.user;
    return user; 
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error while signing up", errorCode, errorMessage);
    throw error; 
  }
};

const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed in");
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error while signing in");
      console.log(errorCode, errorMessage);
      throw error;
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
      console.log("User is signed in");
      return true;
    } else {
      console.log("User is signed out");
      return false;
    }
  } catch (error) {
    console.error("Error while checking user state:", error);
    throw error; 
  }
};

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
    })
    .catch((error) => {
      console.log("An error happened");
      console.log(error);
      throw error;
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
    throw error;
  });
}



export { signUp, signIn, seeState, logout, signInWithGoogle };
