'use client';
import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { seeState } from "../../services/authService";
import SignInModal from "./SignInModal";
import HeaderComponent from "./HeaderComponent";
import { getAuth } from "firebase/auth";

export const Header = ({ setIsLoggedIn, isLoggedIn }) => {
    useEffect(() => {
      const checkUserState = async () => {
        setIsLoggedIn(await seeState(getAuth()));
      };
      checkUserState();
    }, []);
  
    useEffect(() => {
      
    }, []);
  return (
    <>
      {!isLoggedIn ? (
        <>
        <SignInModal setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        {console.log("Not Logged In")}
        </>
      ) : (
        <>
          <HeaderComponent className={styles.header}  setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        </>
      )}
    </>
  );
};
