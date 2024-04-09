"use client";
import React from "react";
import styles from "./page.module.css";
import { Header } from "./components/Header";
import { useState } from "react";

export default function Mylayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  return (
    <main className={styles.main}>
      <Header
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        setIsFirstLogin={setIsFirstLogin}
        isFirstLogin={isFirstLogin}
      />
      {isLoggedIn && !isFirstLogin && children}
    </main>
  );
}
