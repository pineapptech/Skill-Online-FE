"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/navbar";
import RegistrationForm from "@/components/auth/registration-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [authData, setAuthData] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    try {
      const localAuthData = JSON.parse(localStorage.getItem("_auth"));
      if (localAuthData === null) throw new Error("Auth Data Not Found");
      setAuthData(localAuthData);
    } catch {
      setAuthData(false);
    }
  }, []);

  if (authData === null) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-muted animate-pulse">
        <Loader2 className="animate-spin size-12" />
      </div>
    );
  }

  console.log(authData);
  if (authData === false) {
    return (
      <>
        <Navbar className="max-w-[900px]" />
        <Suspense>
          <RegistrationForm />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <Navbar className="max-w-[900px]" />
      <div className="flex justify-center items-center mt-[15vh]">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl text-center">Already registered</h1>
            </CardTitle>
            <CardDescription className="text-center">
              Click on proceed to payment to complete your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            You have been already been registered with the following details:
            <div className="details my-4">
              Name: <span className="font-bold">{authData?.name}</span> <br />
              Email: <span className="font-bold">{authData?.email}</span>
            </div>
            You should pay an application fee to complete your application
            process
          </CardContent>
          <CardFooter>
            <Button
              className="grow"
              disabled={submitStatus?.status === "submitting"}
            >
              Proceed to payment
              {submitStatus?.status === "submitting" && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Register;
