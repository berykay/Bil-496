"use client";
import React from "react";
import styles from "./page.module.css";
import Homepage from "./pages/Homepage";
import Mylayout from "./mylayout";

export default function Home({children}) {

  return (
    <Mylayout>
      <Homepage />
    </Mylayout>
  );
}
