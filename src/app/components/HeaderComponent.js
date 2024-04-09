import Link from "next/link";
import styles from "./Header.module.css";
import { logout } from "../../services/authService";

const HeaderComponent = ({ setIsLoggedIn, isLoggedIn }) => {
  const logoutClick = () => {
    console.log("Logout Clicked");
    logout();
    setIsLoggedIn(false);
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.appName}>
          My Diet Diary
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.headerLinks}>
            <li>
              <Link href="/mydiet" className={styles.headerLink}>
                My Diet
              </Link>
            </li>
            <li>
              <Link href="/recipe" className={styles.headerLink}>
                Ask me
              </Link>
            </li>
            <li></li>
          </ul>
        </nav>
        <Link href="/profile" className={styles.headerLink}>
                Profile
        </Link>
        <Link
          href="/"
          onClick={logoutClick}
          className={`${styles.headerLink} ${styles.logoutLink}`}
        >
          Logout
        </Link>
      </header>
    </>
  );
};

export default HeaderComponent;
