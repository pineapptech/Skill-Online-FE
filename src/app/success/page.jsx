"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const [authData, setAuthData] = useState(null);
  const [verifyStatus, setVerifyStatus] = useState(null);

  useEffect(() => {
    try {
      const localAuthData = JSON.parse(localStorage.getItem("_auth"));
      if (localAuthData === null) throw new Error("Auth Data Not Found");
      setAuthData(localAuthData);
    } catch {
      setAuthData(false);
    }
  }, []);

  useEffect(() => {
    // Verify payment

    handleFormSubmitHelper({
      method: "get",
      endPoint: `/verify?${searchParams.toString()}`,
      setSubmitStatus: setVerifyStatus,
      onSuccess(formStatus) {
        if (!formStatus.response.data.verified) {
          setVerifyStatus({
            status: "error",
            error: "Payment not found",
          });
        } else {
          const localAuthData = JSON.parse(localStorage.getItem("_auth"));
          localStorage.setItem(
            "_auth",
            JSON.stringify({ ...localAuthData, paymentVerified: true })
          );
        }
      },
    });
  }, [searchParams]);

  console.log(verifyStatus);

  if (
    authData === null ||
    verifyStatus?.status === "submitting" ||
    verifyStatus === null
  ) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-muted animate-pulse">
        <Loader2 className="animate-spin size-12" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-[10vh]">
        {verifyStatus?.status === "success" ? (
          <SuccessCard authData={authData} />
        ) : (
          <ErrorCard verifyStatus={verifyStatus} />
        )}
      </div>
    </>
  );
};

const SuccessCard = ({ authData }) => {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <motion.svg
          animate="draw"
          initial="initial"
          transition={{ staggerChildren: 0.2 }}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-check-big self-center dialog-x-icon size-16 text-green-500 fill-transparent"
        >
          <motion.path
            variants={{
              draw: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.5 },
              },
              initial: { pathLength: 0, opacity: 0 },
            }}
            d="M21.801 10A10 10 0 1 1 17 3.335"
          />
          <motion.path
            variants={{
              draw: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.5 },
              },
              initial: { pathLength: 0, opacity: 0 },
            }}
            d="m9 11 3 3L22 4"
          />
        </motion.svg>
        <CardTitle>
          <h1 className="text-3xl text-center text-green-600">
            Application Successful
          </h1>
        </CardTitle>
        <CardDescription className="text-center"></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="success-message text-pretty text-justify">
          <h4>Congratulations {authData.name}! </h4>I am pleased to inform you
          that you have successfully been admitted in to the{" "}
          <em>Emerging Technology Skill For Africa Program</em>. Please check
          your email for your admission letter and your program onboarding
          details.
          <div className="italic mt-1">Signed Gabriele Tomasi-Canova</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="grow">
          <Link href="/">Go to homepage</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
const ErrorCard = ({ verifyStatus }) => {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <motion.svg
          animate="draw"
          initial="initial"
          transition={{ staggerChildren: 0.2 }}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-x self-center dialog-x-icon size-16 text-red-500 fill-transparent"
        >
          <motion.circle
            variants={{
              draw: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.5 },
              },
              initial: { pathLength: 0, opacity: 0 },
            }}
            cx={12}
            cy={12}
            r={10}
          />
          <motion.path
            variants={{
              draw: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.5 },
              },
              initial: { pathLength: 0, opacity: 0 },
            }}
            d="m15 9-6 6"
          />
          <motion.path
            variants={{
              draw: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.5 },
              },
              initial: { pathLength: 0, opacity: 0 },
            }}
            d="m9 9 6 6"
          />
        </motion.svg>
        <CardTitle>
          <h1 className="text-3xl text-center text-red-600">
            {verifyStatus?.errorTitle ?? "Error verifying payment"}
          </h1>
        </CardTitle>
        <CardDescription className="text-center"></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="error-message text-pretty text-center">
          {verifyStatus?.error}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="grow">
          <Link href="/">Go to homepage</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSuccess;
