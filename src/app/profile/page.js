"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Mylayout from "../mylayout";

const GetStartedForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: null,
    height: null,
    weight: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, gender, age, height, weight } = formData;
    if (fullName && gender && age && height && weight) {
      navigate("/overview", {
        state: { ...formData },
      });
    } else {
      alert("All fields are required!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Mylayout>
      <div className={styles.getStartedForm}>
        <h1>Please fill in the informations below to get started!</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="fullName" className={styles.entryLabel}>
            Full Name :
            <input
              type="text"
              id="fullName"
              name="fullName"
              autoFocus
              onChange={handleChange}
            />
          </label>
          <label htmlFor="gender" className={styles.entryLabel}>
            Gender :
            <select id="gender" name="gender" onBlur={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label htmlFor="age" className={styles.entryLabel}>
            Age :
            <input
              type="number"
              name="age"
              placeholder="e.g. 20"
              min="18"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="height" className={styles.entryLabel}>
            Height :
            <input
              type="number"
              id="height"
              placeholder="e.g. 150"
              min="0"
              onChange={(e) => this.handleHeightChange(e)}
            />
            <div className={styles.unitToggle}>
              <fieldset className={styles.radioSwitch}>
                <legend>Height Unit</legend>
                <input type="radio" name="height" id="ft" />
                <label htmlFor="ft" className="switchLabel">
                  Feet
                </label>

                <input type="radio" name="height" id="cm" />
                <label htmlFor="cm" className="switchLabel">
                  Cm
                </label>
              </fieldset>
            </div>
          </label>
          <label htmlFor="weight" className={styles.entryLabel}>
            Weight :
            <input
              type="number"
              id="weight"
              placeholder="e.g. 160"
              min="0"
              onChange={(e) => this.handleWeightChange(e)}
            />
            <div className={styles.unitToggle}>
              <fieldset className={styles.radioSwitch}>
                <legend>Height Unit</legend>
                <input type="radio" name="weight" id="lbs" />
                <label htmlFor="lbs" className="switchLabel">
                  Lbs
                </label>

                <input type="radio" name="weight" id="kg" />
                <label htmlFor="kg" className="switchLabel">
                  Kg
                </label>
              </fieldset>
            </div>
          </label>
          <button className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </Mylayout>
  );
};

export default GetStartedForm;
