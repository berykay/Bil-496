import React from 'react'
import { useState } from "react";
import styles from "./SignInForm.module.css";

export default function SignInForm() {
    const [goal, setGoal] = useState('');
    const [formData, setFormData] = useState({
      fullName: "",
      gender: "",
      age: null,
      height: null,
      weight: null,
      goal: "",
      dietPreference: "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const { fullName, gender, age, height, weight, goal, dietPreference } = formData;
      if (fullName && gender && age && height && weight && goal && dietPreference) {
        navigate("/overview", {
          state: { ...formData },
        });
      } else {
        alert("All fields are required!");
        //print the empty fields
        alert(Object.keys(formData).filter((key) => !formData[key]).join(", "));
      }
    };
  
    const handleHeightChange = (e) => {
      const { value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        height: value,
      }));
    };
  
    const handleWeightChange = (e) => {
      const { value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        weight: value,
      }));
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  return (
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
              onChange={(e) => handleHeightChange(e)}
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
              onChange={(e) => handleWeightChange(e)}
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
          <label htmlFor="goal" className={styles.entryLabel}>
            Goal :
            <select id="goal" name="goal" onBlur={handleChange} value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="">Select Goal</option>
              <option value="Gain Muscle">Gain Muscle</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Maintain Weight">Maintain Weight</option>
              <option value="Other">Other</option>
              
            </select>
            {goal === "Other" && (
              <input
                type="text"
                id="otherGoal"
                name="otherGoal"
                placeholder="Please specify"
                onChange={handleChange}
              />
            )}
          </label>
          <label htmlFor="activityLevel" className={styles.entryLabel}>
            Activity Level :
            <select id="activityLevel" name="activityLevel" onBlur={handleChange}>
              <option value="">Select Activity Level</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly Active">Lightly Active</option>
              <option value="Moderately Active">Moderately Active</option>
              <option value="Very Active">Very Active</option>
              <option value="Extra Active">Extra Active</option>
            </select>
          </label>
          <label htmlFor="dietPreference" className={styles.entryLabel}>
            Diet Preference :
            <select id="dietPreference" name="dietPreference" onBlur={handleChange} value={formData.dietPreference} onChange={(e) => setFormData({ ...formData, dietPreference: e.target.value })}>
              <option value="">Select Diet Preference</option>
              <option value="Omnivore">Omnivore</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Other">Other</option>
            </select>
            {formData.dietPreference === "Other" && (
              <input
                type="text"
                id="otherDiet"
                name="otherDiet"
                placeholder="Please specify"
                onChange={handleChange}
              />
            )}
          </label>
          <button className={styles.submitBtn} type="submit"> Save </button>
        </form>
      </div>
  )
}
