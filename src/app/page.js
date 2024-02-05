"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import Homepage from "./pages/Homepage";
import Mylayout from "./mylayout";
import { getUserInfo } from "../services/databaseService";
import { getIsNewUser } from "../services/databaseService";

export default function Home() {

  useEffect(() => {
    //console.log(getUserInfo().then((data) => console.log(data)));
    console.log(getIsNewUser());
  }
  , []);


  
  return (
    <Mylayout>
      <Homepage />
    </Mylayout>
  );
}
