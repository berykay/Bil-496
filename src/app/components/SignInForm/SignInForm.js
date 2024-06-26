import React from "react";
import { useState, useEffect } from "react";
import styles from "./SignInForm.module.css";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { getUserInfo } from "@/services/databaseService";
import { updateUserInfo } from "@/services/databaseService";

export default function SignInForm({ setIsFirstLogin, isFirstLogin, setIsLoggedIn }) {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: null,
    gender: null,
    age: null,
    height: null,
    weight: null,
    goal: null,
    activityLevel: null,
    dietPreference: null,
    allergies: null,
    country: null,
    state: null,
    otherGoal: null,
  });

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  //const [citiesList, setCitiesList] = useState([]);

  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  // const [cityId, setCityId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const countries = await GetCountries();
      setCountriesList(countries);
      if(!isFirstLogin){
        const userInfo = await getUserInfo();
        if (userInfo) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            fullName: userInfo.Username,
            gender: userInfo.Gender,
            age: userInfo.Age,
            height: userInfo.Height,
            weight: userInfo.Weight,
            goal: userInfo.Goal,
            activityLevel: userInfo.ActivityLevel,
            dietPreference: userInfo.DietPreference,
            allergies: userInfo.Allergies,
            country: userInfo.Country,
            state: userInfo.State,
            otherGoal: userInfo.OtherGoal,
          }));
        }
      }

      
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSkip = (e) => {
    e.preventDefault();
    setIsFirstLogin(false);
    setIsLoggedIn(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFirstLogin) {
      setIsFirstLogin(false);
    }
    try {
      await updateUserInfo(formData);
      console.log("User information updated successfully");
    } catch (error) {
      console.error("Failed to update user information:", error);
      alert("Failed to save user information."); // Display error message to the user
    }
  };

  const handleChange = (e) => {
    const { name, value, type, id } = e.target;
    //if type is number then name : Number(value)
    if (type === "number") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: Number(value),
      }));
      return;
    }
    if (name === "allergies") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
      return;
    }
    if (name === "goal" && value === "Other") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        otherGoal: "",
      }));
      return;
    } else if (name === "goal" && value !== "Other") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        otherGoal: null,
      }));
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <>
      {/*console.log(formData)*/}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.getStartedForm}>
          <h1>Please fill in the informations below to get started!</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="fullName" className={styles.entryLabel}>
              Full Name :
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName || ""}
                autoFocus
                onChange={handleChange}
              />
            </label>
            <label htmlFor="gender" className={styles.entryLabel}>
              Gender :
              <select
                id="gender"
                name="gender"
                onBlur={handleChange}
                value={formData.gender}
                onChange={handleChange}
              >
                {["", "Male", "Female", "Other"].map((item, index) => (
                  <option key={index}>{item || "Select Gender"}</option>
                ))}
              </select>
            </label>
            <label htmlFor="age" className={styles.entryLabel}>
              Age :
              <input
                type="number"
                name="age"
                placeholder="e.g. 20"
                min="13"
                value={formData.age || ""}
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
                value={formData.height || ""}
                onChange={handleChange}
              />
              <div className={styles.unitToggle}>
                <fieldset className={styles.radioSwitch}>
                  <legend>Height Unit</legend>
                  <input type="radio" name="height" id="cm" />
                  Cm
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
                value={formData.weight || ""}
                onChange={handleChange}
              />
              <div className={styles.unitToggle}>
                <fieldset className={styles.radioSwitch}>
                  <legend>Height Unit</legend>
                  Kg
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
                {[
                  "",
                  "Lose Weight",
                  "Gain Weight",
                  "Maintain Weight",
                  "Other",
                ].map((item, index) => (
                  <option key={index}>{item || "Select Goal"}</option>
                ))}
              </select>
              {formData.goal === "Other" && (
                <input
                  type="text"
                  id="otherGoal"
                  name="otherGoal"
                  placeholder={formData.otherGoal || "Please specify"}
                  onChange={handleChange}
                />
              )}
            </label>
            <label htmlFor="activityLevel" className={styles.entryLabel}>
              Activity Level :
              <select
                id="activityLevel"
                name="activityLevel"
                onBlur={handleChange}
                onChange={handleChange}
                value={formData.activityLevel}
              >
                {[
                  "",
                  "Sedentary",
                  "Lightly Active",
                  "Moderately Active",
                  "Very Active",
                  "Extra Active",
                ].map((item, index) => (
                  <option key={index}>{item || "Select Activity Level"}</option>
                ))}
              </select>
            </label>
            <label htmlFor="dietPreference" className={styles.entryLabel}>
              Diet Preference :
              <select
                id="dietPreference"
                name="dietPreference"
                onBlur={handleChange}
                value={formData.dietPreference}
                onChange={handleChange}
              >
                {["", "Vegetarian", "Vegan", "Keto", "Paleo", "Other"].map(
                  (item, index) => (
                    <option key={index}>
                      {item || "Select Diet Preference"}
                    </option>
                  )
                )}
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
                id="country"
                name="country"
                onBlur={handleChange}
                value={formData.country}
                onChange={(e) => {
                  handleChange(e);
                  const selectedCountry = countriesList.find( (item) => item.name === e.target.value);
                  GetState(selectedCountry.id).then((result) => {
                    console.log(result);
                    setStateList(result);
                  });
                }}
              >
                <option>Select Country</option>
                {countriesList.map((item, index) => (
                  <option key={index}>{item.name}</option>
                ))}
              </select>
            </label>
            <label htmlFor="state" className={styles.entryLabel}>
              State/City :
              <select
                name="state"
                value={formData.city}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {stateList.map((item, index) => (
                  <option key={index}>{item.name}</option>
                ))}
              </select>
            </label>
            {isFirstLogin ? (
              <>
                <button className={styles.submitBtn} type="submit">
                  Save and Continue
                </button>
                <button onClick={handleSkip} className={styles.skipBtn}> Skip </button>
              </>
            ) : (
              <button className={styles.submitBtn} type="submit">
                Save
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
