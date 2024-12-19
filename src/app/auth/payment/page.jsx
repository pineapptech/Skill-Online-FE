"use client";
import { AllInput } from "@/components/form-elements";
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
import LoadingDialog from "@/components/ui/loading-dialog";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { Loader2, Mail } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Payment = () => {
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

  const handlePayment = async (e) => {
    e.preventDefault();

    const paymentStatus = await handleFormSubmitHelper({
      formData: { email: authData.email, amount: 6000, userId: authData.id },
      endPoint: "/initialize-payment",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      setSubmitStatus,
    });

    if (paymentStatus?.status === "success") {
      redirect(paymentStatus.response.data.paymentUrl);
    }
  };

  if (authData === false) redirect("/auth/register");

  if (authData === null) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-muted animate-pulse">
        <Loader2 className="animate-spin size-12" />
      </div>
    );
  }

  return (
    <>
      <form
        method="post"
        className="section flex h-fulls justify-center items-center"
        onSubmit={handlePayment}
      >
        <Card className="w-[480px]">
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl text-center">Payment</h1>
            </CardTitle>
            <CardDescription className="text-center">
              Click on pay now to complete your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AllInput
              inputs={[
                {
                  name: "email",
                  value: authData?.email,
                  inputProps: { readOnly: true },
                  classes: { input: "text-gray-600 cursor-not-allowed" },
                  icon: <Mail />,
                },
                {
                  name: "amount",
                  value: "6000",
                  type: "number",
                  inputProps: { readOnly: true },
                  classes: { input: "text-gray-600 cursor-not-allowed" },

                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
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
                  ),
                },
              ]}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="grow"
              disabled={submitStatus?.status === "submitting"}
            >
              Pay now
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
        title={submitStatus?.error ?? "Payment initiation failed"}
      />

      <LoadingDialog
        open={submitStatus?.status === "success"}
        title="Redirecting to payment gateway...."
      />
    </>
  );
};

export default Payment;
