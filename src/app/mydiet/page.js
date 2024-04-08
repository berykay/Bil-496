"use client"
import React from 'react'
import Mylayout from '../mylayout'
import styles from './page.module.css'
import DayCard from './components/DayCard'
import { useState } from 'react'
import OpenAI from "openai";
import Xintake from "../components/Xintake";


export default function page() {
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date().getDay();
    const [activeDay, setActiveDay] = useState(today-1);
    const [dietPlan, setDietPlan] = useState({
      day1: {
        meals: {
          breakfast: {
            meal: "Oatmeal",
            cal: 300,
            protein: 10,
            carb: 50,
            fat: 5,
            explanation: "Oatmeal is a healthy breakfast option that is high in fiber and protein. It is a great way to start your day and keep you full until lunchtime."
          },
          lunch: {
            meal: "Chicken Salad",
            cal: 400,
            protein: 20,
            carb: 30,
            fat: 10
          },
          dinner: {
            meal: "Grilled Salmon",
            cal: 500,
            protein: 30,
            carb: 20,
            fat: 15
          },
          extra: {
            meal: "Greek Yogurt",
            cal: 200,
            protein: 15,
            carb: 25,
            fat: 5
          }
        }
      },
      day2: {
        meals: {
          breakfast: {
            meal: "Eggs",
            cal: 350,
            protein: 15,
            carb: 20,
            fat: 10
          },
          lunch: {
            meal: "Turkey Sandwich",
            cal: 450,
            protein: 25,
            carb: 35,
            fat: 10
          },
          dinner: {
            meal: "Pasta",
            cal: 600,
            protein: 35,
            carb: 50,
            fat: 20
          },
          extra: {
            meal: "Apple",
            cal: 100,
            protein: 1,
            carb: 25,
            fat: 0
          }
        }
      },
      day3: {
        meals: {
          breakfast: {
            meal: "Pancakes",
            cal: 400,
            protein: 10,
            carb: 60,
            fat: 10
          },
          lunch: {
            meal: "Caesar Salad",
            cal: 350,
            protein: 15,
            carb: 20,
            fat: 15
          },
          dinner: {
            meal: "Steak",
            cal: 700,
            protein: 40,
            carb: 30,
            fat: 25
          },
          extra: {
            meal: "Banana",
            cal: 150,
            protein: 2,
            carb: 30,
            fat: 1
          }
        }
      },
      day4: {
        meals: {
          breakfast: {
            meal: "Waffles",
            cal: 500,
            protein: 10,
            carb: 70,
            fat: 15
          },
          lunch: {
            meal: "Tuna Salad",
            cal: 300,
            protein: 20,
            carb: 10,
            fat: 10
          },
          dinner: {
            meal: "Sushi",
            cal: 800,
            protein: 50,
            carb: 60,
            fat: 30
          },
          extra: {
            meal: "Orange",
            cal: 50,
            protein: 1,
            carb: 10,
            fat: 0
          }
        }
      },
      day5: {
        meals: {
          breakfast: {
            meal: "Bagel",
            cal: 450,
            protein: 10,
            carb: 60,
            fat: 15
          },
          lunch: {
            meal: "Greek Salad",
            cal: 350,
            protein: 15,
            carb: 20,
            fat: 15
          },
          dinner: {
            meal: "Burger",
            cal: 700,
            protein: 40,
            carb: 30,
            fat: 25
          },
          extra: {
            meal: "Grapes",
            cal: 100,
            protein: 1,
            carb: 25,
            fat: 0
          }
        }
      },
      day6: {
        meals: {
          breakfast: {
            meal: "Cereal",
            cal: 300,
            protein: 10,
            carb: 50,
            fat: 5
          },
          lunch: {
            meal: "Chicken Wrap",
            cal: 400,
            protein: 20,
            carb: 30,
            fat: 10
          },
          dinner: {
            meal: "Pizza",
            cal: 800,
            protein: 50,
            carb: 60,
            fat: 30
          },
          extra: {
            meal: "Strawberries",
            cal: 50,
            protein: 1,
            carb: 10,
            fat: 0
          }
        }
      },
      day7: {
        meals: {
          breakfast: {
            meal: "Toast",
            cal: 300,
            protein: 10,
            carb: 50,
            fat: 5
          },
          lunch: {
            meal: "Soup",
            cal: 400,
            protein: 20,
            carb: 30,
            fat: 10
          },
          dinner: {
            meal: "Tacos",
            cal: 800,
            protein: 50,
            carb: 60,
            fat: 30
          },
          extra: {
            meal: "Pineapple",
            cal: 50,
            protein: 1,
            carb: 10,
            fat: 0
          }
        }
      }
    });

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
      model : "gpt-3.5-turbo"
    });
  
    const handleGPT = async (e) => {
      e.preventDefault();
      setIsLoading(true); 
      console.log("GPT button clicked");
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: "Bana json formatında 7 günlük bir diyet programı oluştur. Oluşturacağın bu json şunları içermeli ve tamamen ingilzce olmalı: dayX{meals{breakfast{meal,cal,protein,carb,fat,explanation(shortly describe the meal)},lunch{same},dinner{same},extra{same}}}" },
          ],
        });
        console.log("coming")
        setDietPlan(JSON.parse(completion.choices[0].message.content));
        console.log(completion.choices[0].message.content);
      } catch (error) {
        console.error('Error fetching data:', error);
        setGeneratedText("An error occurred, please try again.");
      }
      setIsLoading(false); // End loading
    };

  const calculateMaxNutrient = (nutrient) => {
    return Object.values(dietPlan).reduce((acc, day) => {
      const { breakfast, lunch, dinner, extra } = day.meals;
      const nutrientSum = breakfast[nutrient] + lunch[nutrient] + dinner[nutrient] + extra[nutrient];
      return acc + nutrientSum;
    }, 0);
  };

  const maxProtein = calculateMaxNutrient('protein');
  const maxCarbs = calculateMaxNutrient('carb');
  const maxFat = calculateMaxNutrient('fat');
  const maxCals = calculateMaxNutrient('cal');

  const sumNutrients = (day, nutrient) => {
    let sum = 0;
    for (let i = 1; i <= day; i++) {
      sum += dietPlan[`day${i}`]?.meals?.breakfast?.[nutrient] + dietPlan[`day${i}`]?.meals?.lunch?.[nutrient] + dietPlan[`day${i}`]?.meals?.dinner?.[nutrient] + dietPlan[`day${i}`]?.meals?.extra?.[nutrient];
    }
    return sum;
  };

  const sumCarbs = (day) => sumNutrients(day, 'carb');
  const sumProtein = (day) => sumNutrients(day, 'protein');
  const sumFat = (day) => sumNutrients(day, 'fat');
  const sumCals = (day) => sumNutrients(day, 'cal');
  return (
    <Mylayout>
      {isLoading && <div>Loading...</div> }

      {!isLoading && 
      <>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleGPT}>Create Diet Plan</button>
        <button className={styles.button}>Save Diet Plan</button>
      </div>
      <div className={styles.days}>
        <div className={styles.intakes}>
          <Xintake name={"PROTEIN"} qty={sumProtein(activeDay+1)} min={"0"} max={maxProtein} />
          <Xintake name={"CARBS"} qty={sumCarbs(activeDay+1)} min={"0"} max={maxCarbs} />
        </div>
        {[...Array(7)].map((_, index) => (
          <DayCard 
            key={index}
            dayIndex={index}
            isActivated={index === activeDay}
            onClick={() => setActiveDay(index)}
            meals={dietPlan[`day${index+1}`]?.meals}
          />
        ))}
        <div className={styles.intakes}>
          <Xintake name={"FAT"}  qty={sumFat(activeDay+1)} min={"0"} max={maxFat} />
          <Xintake name={"CALS"} qty={sumCals(activeDay+1)} min={"0"} max={maxCals} />
        </div>
      </div>
      </>
      }
    </Mylayout>
  )
}
