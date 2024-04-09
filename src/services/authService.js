import Cookies from "js-cookie";
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

const getCurrentUserId = () => {
  const user = auth.currentUser;
  try {
    if (user) {
      return user.uid;
    } else {
      console.error("No user is currently signed in.");
      return null;
    }
  } catch (error) {
    console.error("Error while getting current user ID:", error);
    throw error;
  }
};

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    Cookies.set(`user_${user.uid}`, JSON.stringify(user));
    console.log("Signed up with Firebase", user);

    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // or response.json() if the server sends JSON response
      throw new Error(`Failed to create user in database: ${errorDetails}`);
    }

    const dbUser = await response.json();
    console.log("User created in database", dbUser);
  } catch (error) {
    console.error("Error while signing up", error);
    throw error;
  }
};

const signIn = async (email, password, rememberMe) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (rememberMe) {
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    } else {
      Cookies.set("user", JSON.stringify(user));
    }
    console.log("Signed in", user);
  } catch (error) {
    console.error("Error while signing in", error);
    throw error;
  }
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
      Cookies.remove("user");
    })
    .catch((error) => {
      console.log("An error happened");
      console.log(error);
      throw error;
    });
};

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    Cookies.set("user", JSON.stringify(user));
    console.log("Google Sign In");
    console.log(user);
  } catch (error) {
    console.error("Google Sign In failed:", error.message);
    throw error;
  }
};

export { getCurrentUserId ,signUp, signIn, seeState, logout, signInWithGoogle };
