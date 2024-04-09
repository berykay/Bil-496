"use client";
import React, { useEffect } from "react";
import styles from "./Header.module.css";
import SignInModal from "./SignInModal/SignInModal";
import HeaderComponent from "./HeaderComponent";
import Cookies from "js-cookie";
import SignInForm from "./SignInForm/SignInForm";


export const Header = ({
  setIsLoggedIn,
  isLoggedIn,
  setIsFirstLogin,
  isFirstLogin,
}) => {
  useEffect(() => {
    let userCookie = Cookies.get("user");
    let user = null;

    try {
      user = userCookie ? JSON.parse(userCookie) : null;
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }

    if (userCookie && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          {isFirstLogin ? (
            <>
              <SignInForm
                setIsFirstLogin={setIsFirstLogin}
                isFirstLogin={isFirstLogin}
                setIsLoggedIn={setIsLoggedIn}
              />
            </>
          ) : (
            <>
              <HeaderComponent
                className={styles.header}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            </>
          )}
        </>
      ) : (
        <>
          <SignInModal
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            setIsFirstLogin={setIsFirstLogin}
            isFirstLogin={isFirstLogin}
          />
        </>
      )}
    </>
  );
};
