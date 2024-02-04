'use client';
import React, { useEffect } from "react";
import styles from "./Header.module.css";
import SignInModal from "./SignInModal";
import HeaderComponent from "./HeaderComponent";
import Cookies from "js-cookie";

export const Header = ({ setIsLoggedIn, isLoggedIn }) => {
  useEffect(() => {
    const userCookie = Cookies.get('user'); 
    const user = userCookie ? JSON.parse(userCookie) : null; 
  
    if (user) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
    }
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
          {console.log("Logged In")}
        </>
      )}
    </>
  );
};
