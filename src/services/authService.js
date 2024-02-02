import Cookies from 'js-cookie';
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
    Cookies.set('user', JSON.stringify(user)); 
    return user; 
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error while signing up", errorCode, errorMessage);
    throw error; 
  }
};

const signIn = async (email, password, rememberMe) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (rememberMe) {
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
      }
      else{
        Cookies.set('user', JSON.stringify(user));
      }
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
      Cookies.set('user');
    })
    .catch((error) => {
      console.log("An error happened");
      console.log(error);
      throw error;
    });
};

const signInWithGoogle =  async() => {
  try{
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    Cookies.set('user', JSON.stringify(user));
    console.log("Google Sign In");
    console.log(user);
  } catch (error) {
    console.error("Google Sign In failed:", error.message);
    throw error;
  }
}



export { signUp, signIn, seeState, logout, signInWithGoogle };
