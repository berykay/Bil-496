import React from 'react';
import styles from './page.module.css';
import HomePage from './pages/Homepage';

export default function Home() {
  return (
    <main className={styles.main}>
      <HomePage/>
    </main>
  );
}
