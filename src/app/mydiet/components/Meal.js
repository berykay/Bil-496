import styles from "./Meal.module.css";

export default function Meal(props) {
  return (
    <div className={styles.meal}>
      <div className={styles.mealTitle}>{props.mealTime}</div>
      <div className={styles.mealTitle}>{props.mealTitle}</div>
      <div className={styles.mealInfo}>{props.mealCal} cal</div>
      <div className={styles.mealContent}></div>
    </div>
  );
}
