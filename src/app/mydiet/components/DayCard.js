import React from "react";
import styles from "./DayCard.module.css";
import Meal from "./Meal";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

export default function DayCard({ dayIndex,isActivated, onClick }) {
  return (
    <div onClick={onClick}>
      {isActivated ? (
        <div className={styles.activeDayCard}>
          {days[dayIndex]} 
          <Meal key={1} className={styles.meal} mealTitle="Kahvaltı" mealInfo="400Kcal" mealContent="asşldkads" />
          <Meal key={2} className={styles.meal} mealTitle="Kahvaltı" mealInfo="400Kcal" mealContent="asşldkads" />
          <Meal key={3} className={styles.meal} mealTitle="Kahvaltı" mealInfo="400Kcal" mealContent="asşldkads" />
          <Meal key={4} className={styles.meal} mealTitle="Kahvaltı" mealInfo="400Kcal" mealContent="asşldkads" />
          <Meal key={5} className={styles.meal} mealTitle="Kahvaltı" mealInfo="400Kcal" mealContent="asşldkads" />
          
          </div>
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
