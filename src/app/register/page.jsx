"use client";
import React, { Suspense } from "react";
import Navbar from "@/components/navbar";
import RegistrationForm from "@/components/register/registration-form";

const Register = () => {
  return (
    <>
      <Navbar />
      <Suspense>
        <RegistrationForm />
      </Suspense>
    </>
  );
};

export default Register;
