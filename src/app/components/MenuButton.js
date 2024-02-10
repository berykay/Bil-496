import Link from "next/link";
import styles from "./MenuButton.module.css";

export default function MenuButton(props) {
    return ( 
    <div className={styles.menu}>
      <Link className={styles.tarifler} href="/">
        <div>
          <span className="material-icons md-48 center margin-card-title">
            edit_calendar
          </span>
        </div>
        <p className="center">Make My Diet Plan</p>
      </Link>
    </div>
    );
  }