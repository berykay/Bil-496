"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import Homepage from "./pages/Homepage";
import Mylayout from "./mylayout";
import { getIsNewUser } from "../services/databaseService";

export default function Home() {

  


  
  return (
    <Mylayout>
      <Homepage />
    </Mylayout>
  );
}
