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
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { TypeInput } from "@/components/form-elements";
import { Loader2, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { z } from "zod";
import LoadingDialog from "@/components/ui/loading-dialog";
import SuccessDialog from "@/components/ui/success-dialog";
import Link from "next/link";
import ErrorDialog from "@/components/ui/error-dialog";

const VerifyPaymentPage = () => {
  return (
    <Suspense>
      <VerifyPayment />
    </Suspense>
  );
};

const VerifyPayment = () => {
  const [authData, setAuthData] = useState(null);
  const [email, setEmail] = useState("");
  const [verifyStatus, setVerifyStatus] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Fetch auth data if it exists
    try {
      const localAuthData = JSON.parse(localStorage.getItem("_auth"));
      if (localAuthData === null) throw new Error("Auth Data Not Found");
      setAuthData(localAuthData);
      setEmail(localAuthData.email ?? "");
    } catch {
      setAuthData(false);
    }
  }, []);

  useEffect(() => {
    // Automatically verify payment if searchParams are available
    if (!searchParams.toString()) return;

    const controller = handlePaymentVerification();

    return () => controller.abort();
  }, [searchParams]);

  const handlePaymentVerification = async (e) => {
    e?.preventDefault();
    const controller = new AbortController();

    const verifyStatus = await handleFormSubmitHelper({
      formSchema: z.object({
        email: z
          .string({ required_error: "Email is required" })
          .email("Invalid email address"),
      }),
      formData: { email },
      endPoint: "/v1/attachment/offer-letter",
      setSubmitStatus: setVerifyStatus,
      axiosConfig: {
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
      },
    });

    console.log(verifyStatus);
    return controller;
  };

  if (authData === null) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-muted animate-pulse">
        <Loader2 className="animate-spin size-12" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <form
        method="post"
        className="flex h-full justify-center items-center p-2 pt-[15vh]"
        onSubmit={handlePaymentVerification}
      >
        <Card className="min-w-[400px]">
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl text-center">Verify Payment</h1>
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email to verify payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypeInput
              label="Email"
              placeholder="Enter email address"
              name="email"
              value={email}
              onChange={(value) => {
                setVerifyStatus(null);
                setEmail(value);
              }}
              icon={<Mail />}
              required={true}
              error={
                verifyStatus?.status === "form_error"
                  ? verifyStatus?.error?.email
                  : null
              }
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="grow"
              disabled={verifyStatus?.status === "submitting"}
            >
              Verify
              {verifyStatus?.status === "submitting" && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <LoadingDialog
        open={verifyStatus?.status === "submitting"}
        title="Verifying Payment..."
      />

      <SuccessDialog
        open={verifyStatus?.status === "success"}
        onOpenChange={() => setVerifyStatus(null)}
        title="Application Successful"
        body={
          <div className="success-message text-pretty text-justify">
            <h4>Congratulations! </h4>I am pleased to inform you that you have
            successfully applied for the{" "}
            <em>Emerging Technology Skill For Africa Program</em>.{" "}
            <strong>
              Please check your email for your admission letter and your program
              onboarding details.
            </strong>
            <div className="italic mt-1">Signed Gabriele Tomasi-Canova</div>
          </div>
        }
        controls={
          <Button className="grow" asChild>
            <Link href="/">Go to homepage</Link>
          </Button>
        }
      />

      <ErrorDialog
        open={verifyStatus?.status === "error"}
        onOpenChange={() => setVerifyStatus(null)}
        title={verifyStatus?.error ?? "Failed to verify payment"}
        description={
          <>
            If error persists, contact our customer support,
            <em> emergingtechskill@gmail.com</em>
          </>
        }
        classes={{ title: "text-center leading-6" }}
      />
    </>
  );
};

export default VerifyPaymentPage;
