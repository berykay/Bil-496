import React from "react";
import styles from "./Xintake.module.css";

const Xintake = (props) => {
  return (
    <div className={styles.item}>
      <h2 className={styles.h2}>{props.name}</h2>
      <span className={styles.span}>{props.qty} g until now</span>
      <meter
        className={styles.meter}
        min={props.min}
        max={props.max}
        value={props.qty}
        id={styles.protein}
      />
      <span>Need {props.max - props.qty}g for weekly goal</span>
    </div>
  );
};

export default Xintake;