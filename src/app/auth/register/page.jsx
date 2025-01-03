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
import RegistrationForm from "@/components/auth/registration-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const Register = () => {
  const [authData, setAuthData] = useState(null);

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

  if (authData === false) {
    return (
      <>
        <RegistrationForm />
      </>
    );
  }

  return (
    <>
      <div className="section flex justify-center items-center">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl text-center">
                You&apos;re Already Registered! 🎉
              </h1>
            </CardTitle>
            {!authData?.hasPaid && (
              <CardDescription className="text-center">
                Click on proceed to payment to complete your application
              </CardDescription>
            )}
          </CardHeader>
          {authData?.hasPaid ? (
            <CardContent>
              It looks like you&apos;ve already successfully registered for this
              course. We&apos;re excited to have you on board! Kindly check your
              email to view your onboarding details. If you need any assistance
              or want to review your registration details, please contact
              emergingtechskill@gmail.com
              <div className="text-sm my-3">
                <span className="italic">Registration Details:</span>
                <div className="details my-1">
                  Name: <span className="font-bold">{authData?.name}</span>{" "}
                  <br />
                  Email: <span className="font-bold">{authData?.email}</span>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              You have been already been registered with the following details:
              <div className="details my-4">
                Name: <span className="font-bold">{authData?.name}</span> <br />
                Email: <span className="font-bold">{authData?.email}</span>
              </div>
              You should pay an application fee to complete your application
              process
            </CardContent>
          )}
          <CardFooter>
            {!authData?.hasPaid && (
              <Button className="grow" asChild>
                <Link href="/auth/payment">Proceed to payment</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Register;
