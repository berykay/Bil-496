"use client";
import React from "react";
import styles from "./page.module.css";
import { Header } from "./components/Header";
import Homepage from "./pages/Homepage";
import { useState } from "react";
import Mylayout from "./mylayout";

export default function Home({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Mylayout>
      <Homepage />
    </Mylayout>
  );
}
