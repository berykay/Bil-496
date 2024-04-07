"use client"
import React from 'react'
import Mylayout from '../mylayout'
import styles from './page.module.css'
import DayCard from './components/DayCard'
import { useState } from 'react'
import OpenAI from "openai";


export default function page() {
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
            fat: 5
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
      console.log("GPT button clicked");
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: "Bana json formatında haftalık bir diyet programı oluştur. Oluşturacağın bu json şunları içermeli: day{meals{breakfast{meal,cal,protein,carb,fat},lunch{same},dinner{same},extra{same}}}" },
          ],
        });
        console.log(completion.choices[0].message.content);
      } catch (error) {
        console.error('Error fetching data:', error);
        setGeneratedText("An error occurred, please try again.");
      }
      
    };

  return (
    <Mylayout>
      <button className={styles.button} onClick={handleGPT} >Haftalık Diyet Programını Oluştur</button>
      <button className={styles.button}>Diyet Programını Kaydet</button>
        <div className={styles.days}>
        {[...Array(7)].map((_, index) => (
        <DayCard 
          key={index}
          dayIndex={index}
          isActivated={index === activeDay}
          onClick={() => setActiveDay(index)}
          meals={dietPlan[`day${index+1}`]?.meals}
        />
      ))}
      </div>
    </Mylayout>
  )
}
