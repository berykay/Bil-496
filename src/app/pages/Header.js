'use client'
import Link from 'next/link';
import styles from './Header.module.css';
import SignInModal from '../components/SignInModal';
import { useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginClick = () => {
    setModalOpen(true);
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.appName}>My Diet Diary</div>
      <nav>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/" className={styles.headerLink}>Home</Link> 
          </li>
          <li>
            <Link href="/mydiet" className={styles.headerLink}>My Diet</Link> 
          </li>
          <li>
            <Link href="/search" className={styles.headerLink}>Search</Link> 
          </li>
          {isLoggedIn ? (
            <li>
              <Link href="/profile" className={styles.headerLink}>Profile</Link> 
            </li>
          ) : (
            <li>
              <Link href="/" onClick={handleLoginClick} className={styles.headerLink}>Login</Link> 
            </li>
          )}
        </ul>
      </nav>
      <SignInModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};

export default Header;
