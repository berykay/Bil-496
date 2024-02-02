import styles from "./Meal.module.css";

export default function Meal(props) {
  return (
    <div className={styles.meal}>
      <div className={styles.mealTitle}>Kahvaltı</div>
      <div className={styles.mealInfo}>400Kcal</div>
      <div className={styles.mealContent}>asşldkads</div>
    </div>
  );
}
