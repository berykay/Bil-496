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
    const userCookie = Cookies.get("user");
    const user = userCookie ? JSON.parse(userCookie) : null;

    if (user) {
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
              />
              {console.log("Logged In")}
            </>
          ) : (
            <>
              <HeaderComponent
                className={styles.header}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
              {console.log("Logged In")}
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
          {console.log("Not Logged In")}
        </>
      )}
    </>
  );
};
