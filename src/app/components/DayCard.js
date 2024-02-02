import React from "react";
import styles from "./DayCard.module.css";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

export default function DayCard({ dayIndex,isActivated, onClick }) {
  return (
    <div onClick={onClick}>
      {isActivated ? (
        <div className={styles.activeDayCard}>{days[dayIndex]} - DayCardActivated</div>
      ) : (
        <div className={styles.dayCard}>
            {days[dayIndex]}
          <div className={styles.intakes}>
            <div className={styles.intake}>Kalori 4000cal</div>
            <div className={styles.intake}>Protein 50g</div>
            <div className={styles.intake}>Yağ 120g</div>
            <div className={styles.intake}>Karbonhidrat 340</div>
            <div className={styles.intake}>Protein</div>
          </div>
        </div>
      )}
    </div>
  );
}
