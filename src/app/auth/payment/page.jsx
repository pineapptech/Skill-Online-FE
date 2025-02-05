"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ErrorDialog from "@/components/ui/error-dialog";
import { Input } from "@/components/ui/input";
import LoadingDialog from "@/components/ui/loading-dialog";
import { axiosInstance } from "@/lib/axios";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { cn } from "@/lib/utils";
import { Loader2, Mail } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Payment = () => {
  const searchParams = useSearchParams();
  const defaultEmail = searchParams.get("email");

  const [email, setEmail] = useState(defaultEmail ?? "");
  const [submitStatus, setSubmitStatus] = useState(null);

  const [userInfo, setUserInfo] = useState();
  const [userError, setUserError] = useState("");

  const fetchUserInfo = async () => {
    setSubmitStatus({ status: "submitting" });

    try {
      const response = await axiosInstance.get("/v1/auth/get-users");
      const user = response.data.data.find((user) => user.email === email);

      if (!user) throw new Error("User not found");
      setUserInfo(user);
    } catch (error) {
      console.log("Error fetching user details", error);
      setUserError("User not found");
    }

    setSubmitStatus(null);
  };

  const handlePayment = async (e) => {
    const paymentStatus = await handleFormSubmitHelper({
      formData: { userId: userInfo._id, email: userInfo.email, amount: 6000 },
      endPoint: "/initialize-payment",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      onError(formStatus) {
        console.log("payment failed", formStatus);
      },
      setSubmitStatus,
    });

    if (paymentStatus?.status === "success") {
      redirect(paymentStatus.response.data.paymentUrl);
    }
  };

  return (
    <>
      <form
        method="post"
        className="section flex h-fulls justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          setUserError("");

          if (userInfo) {
            handlePayment();
          } else {
            fetchUserInfo();
          }
        }}
      >
        <Card className="w-[480px]">
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl text-center">Payment</h1>
            </CardTitle>
            <CardDescription className="text-center">
              You have to pay an application fee to complete your onboarding
              process. Enter your email and click on pay now to complete your
              application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="form-group relative my-4">
              <Input
                type="email"
                className="pl-8"
                value={email}
                onChange={(e) => {
                  setUserError("");
                  setUserInfo("");
                  setEmail(e.target.value);
                }}
              />
              <Mail className="absolute top-1/2 -translate-y-1/2 left-1" />
            </div>
            <div className="form-group relative text-gray-500 my-4">
              <Input
                type="number"
                value="6000"
                className="text-gray-600 cursor-not-allowed pl-8"
                readOnly
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className="absolute top-1/2 -translate-y-1/2 left-1"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 18V7.052a1.05 1.05 0 0 1 1.968-.51l6.064 10.916a1.05 1.05 0 0 0 1.968-.51V6M5 10h14M5 14h14"
                ></path>
              </svg>
            </div>

            {userError && (
              <div className="user-error text-red-500 text-center">
                {userError}
              </div>
            )}
            {userInfo && (
              <div className="user-info">
                Pay registration fee for{" "}
                <span className="font-bold">
                  {userInfo.firstName} {userInfo.lastName}
                </span>
              </div>
            )}

            {!userInfo && submitStatus?.status === "submitting" && (
              <Loader2 className="animate-spin mx-auto" />
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="grow"
              disabled={submitStatus?.status === "submitting"}
            >
              {userInfo ? "Pay now" : "Proceed"}
              {submitStatus?.status === "submitting" && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <ErrorDialog
        open={submitStatus?.status === "error"}
        onOpenChange={() => setSubmitStatus(null)}
        title={"Payment initiation failed"}
      />

      <LoadingDialog
        open={submitStatus?.status === "success"}
        title="Redirecting to payment gateway...."
      />
    </>
  );
};

export default Payment;
