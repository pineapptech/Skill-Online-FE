"use client";
import React, { Suspense } from "react";
import Navbar from "@/components/navbar";
import RegistrationForm from "@/components/auth/registration-form";

const Register = () => {
  return (
    <>
      <Navbar className="max-w-[900px]" />
      <Suspense>
        <RegistrationForm />
      </Suspense>
    </>
  );
};

export default Register;
