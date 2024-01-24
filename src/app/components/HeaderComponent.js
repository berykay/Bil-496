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
    <header className={styles.header}>
      <div className={styles.appName}>My Diet Diary</div>
      <nav>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/" className={styles.headerLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/mydiet" className={styles.headerLink}>
              My Diet
            </Link>
          </li>
          <li>
            <Link href="/search" className={styles.headerLink}>
              Search
            </Link>
          </li>
          <li>
            <Link href="/profile" className={styles.headerLink}>
              Profile
            </Link>
          </li>
          <li>
            <button
              href="/"
              onClick={logoutClick}
              className={styles.headerLink}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
