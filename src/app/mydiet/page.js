"use client"
import React from 'react'
import Mylayout from '../mylayout'
import styles from './page.module.css'
import DayCard from '../components/DayCard'
import { useState } from 'react'

export default function page() {
    const today = new Date().getDay();
    const [activeDay, setActiveDay] = useState(today-1);
  return (
    <Mylayout>
        <div className={styles.days}>
        {[...Array(7)].map((_, index) => (
        <DayCard 
          key={index}
          dayIndex={index}
          isActivated={index === activeDay}
          onClick={() => setActiveDay(index)}
        />
      ))}
      </div>
    </Mylayout>
  )
}
