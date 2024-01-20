"use client";
import React from "react";
import styles from "./page.module.css";
import HomePage from "./pages/Homepage";
import Header from "./pages/Header";
import { useState } from "react";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { seeState } from "./firebase";
import SignInModal from "./components/SignInModal";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserState = async () => {
      setIsLoggedIn(await seeState(getAuth()));
    };
    checkUserState();
  }, []);

  useEffect(() => {
    
  }, []);

  return (
    <main className={styles.main}>
      {!isLoggedIn ? (
        <>
        <SignInModal setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        {console.log("Not Logged In")}
        </>
      ) : (
        <>
          <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          <HomePage />
        </>
      )}
    </main>
  );
}
