"use client";
import React, { useState } from "react";
import Mylayout from "../mylayout";
import SignInForm from "../components/SignInForm/SignInForm";

const GetStartedForm = () => {
 

  return (
    <Mylayout>
      <SignInForm setIsFirstLogin={null} isFirstLogin={false} />
    </Mylayout>
  );
};

export default GetStartedForm;
