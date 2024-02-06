"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Mylayout from "../mylayout";
import SignInForm from "../components/SignInForm";

const GetStartedForm = () => {
 

  return (
    <Mylayout>
      <SignInForm setIsFirstLogin={null} isFirstLogin={false} />
    </Mylayout>
  );
};

export default GetStartedForm;
