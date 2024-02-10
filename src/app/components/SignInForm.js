import React from "react";
import { useState, useEffect } from "react";
import styles from "./SignInForm.module.css";
import {
  GetCountries,
  GetState,
  GetCity,
  //async functions
} from "react-country-state-city";

export default function SignInForm({ setIsFirstLogin, isFirstLogin }) {
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: null,
    height: null,
    weight: null,
    goal: "",
    dietPreference: "",
    allergies: "",
    region: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const {fullName,gender,age,height,weight,goal,dietPreference,allergies,region,} = formData;
    if (
      fullName &&
      gender &&
      age &&
      height &&
      weight &&
      goal &&
      dietPreference &&
      allergies &&
      region
    ) {
      setIsFirstLogin(false);
    } else {
      alert("All fields are required!");
      alert(
        Object.keys(formData)
          .filter((key) => !formData[key])
          .join(", ")
      );
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
            name="height"
            placeholder="e.g. 150"
            min="0"
            onChange={handleChange}
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
            name="weight"
            placeholder="e.g. 160"
            min="0"
            onChange={handleChange}
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
          <select
            id="goal"
            name="goal"
            onBlur={handleChange}
            value={formData.goal}
            onChange={handleChange}
          >
            <option value="">Select Goal</option>
            <option value="Gain Muscle">Gain Muscle</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Maintain Weight">Maintain Weight</option>
            <option value="Other">Other</option>
          </select>
          {formData.goal === "Other" && (
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
          <select
            id="dietPreference"
            name="dietPreference"
            onBlur={handleChange}
            value={formData.dietPreference}
            onChange={(e) =>
              setFormData({ ...formData, dietPreference: e.target.value })
            }
          >
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
        <label htmlFor="allergies" className={styles.entryLabel}>
          Allergies :
          <input
            type="text"
            id="allergies"
            name="allergies"
            placeholder="e.g. peanuts, shellfish"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="country" className={styles.entryLabel}>
          Country :
          <select
            id="region"
            name="region"
            onBlur={handleChange}
            onChange={(e) => {
              handleChange;
              setCountryId(countriesList[e.target.value].id);
              setCitiesList([]);
              GetState(countriesList[e.target.value].id).then((result) => {
                setStateList(result);
              });
            }}
          >
            {countriesList.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="state" className={styles.entryLabel}>
          State/City :
          <select
            onChange={(e) => {
              handleChange;
              setStateId(stateList[e.target.value].id);
              GetCity(countryId,stateList[e.target.value].id).then((result) => {
                console.log(result);
                setCitiesList(result);
              });
            }}
            name="state"
          >
            {stateList.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="city" className={styles.entryLabel}>
          City/Street :
          <select
            onChange={(e) => {
              handleChange;
            }}
            name="state"
          >
           {citiesList.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        {isFirstLogin ? (
          <>
            <button className={styles.submitBtn} type="submit">
              Save and Continue
            </button>
            <button onClick={() => setIsFirstLogin(false)}>Skip</button>
          </>
        ) : (
          <button className={styles.submitBtn} type="submit">
            {" "}
            Save{" "}
          </button>
        )}
      </form>
    </div>
  );
}
