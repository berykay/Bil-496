import React from "react";
import styles from "./page.module.css";
import HomePage from "./pages/Homepage";
import Header from "./pages/Header";

export default function Home() {
  return (
      <main className={styles.main}>
        <Header />
        <HomePage />
      </main>
  );
}
