import React from "react";
import styles from "./DayCard.module.css";
import Meal from "./Meal";
import { useState, useEffect} from "react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function DayCard({ dayIndex, isActivated, onClick, meals }) {
  console.log(meals);
  const [totals, setTotals] = useState([
    {
      totalCal: 0,
      totalProtein: 0,
      totalCarb: 0,
      totalFat: 0,
    },
  ]);

  useEffect(() => {
    const newTotals = Object?.values(meals).reduce(
      (acc, meal) => {
        acc.totalCal += meal.cal;
        acc.totalProtein += meal.protein;
        acc.totalCarb += meal.carb;
        acc.totalFat += meal.fat;
        return acc;
      },
      {
        totalCal: 0,
        totalProtein: 0,
        totalCarb: 0,
        totalFat: 0,
      }
    );

    setTotals(newTotals);
  }, [meals]);

  return (
    <div onClick={onClick}>
      {isActivated ? (
        <div className={styles.activeDayCard}>
          {days[dayIndex]}
          {Object.entries(meals).map(([mealName, mealDetails], index) => (
            <Meal
              className={styles.meal}
              key={index}
              mealTime={mealName}
              mealTitle={mealDetails.meal}
              mealCal={mealDetails.cal}
              mealExplanation={mealDetails.explanation}
            />
          ))}
        </div>
      ) : (
        <div className={styles.dayCard}>
          {days[dayIndex]}
          <div className={styles.intakes}>
            <div className={styles.intake}>Calories: {totals.totalCal} cal</div>
            <div className={styles.intake}>Protein: {totals.totalProtein}g</div>
            <div className={styles.intake}>Fat: {totals.totalFat}g</div>
            <div className={styles.intake}>Carbs: {totals.totalCarb}g
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
