import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
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
          <li>
            <Link href="/profile" className={styles.headerLink}>Profile</Link> 
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
