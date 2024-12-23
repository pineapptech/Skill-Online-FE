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
import { Button } from "@/components/ui/button";
import { TypeInput } from "@/components/form-elements";
import { Loader2, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { z } from "zod";
import LoadingDialog from "@/components/ui/loading-dialog";
import SuccessDialog from "@/components/ui/success-dialog";
import Link from "next/link";
import ErrorDialog from "@/components/ui/error-dialog";

const VerifyPayment = () => {
  const [authData, setAuthData] = useState(null);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
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

  // useEffect(() => {
  //   // Automatically verify payment if searchParams are available
  //   if (!searchParams.toString()) return;

  //   const controller = handleSendMail();

  //   return () => controller.abort();
  // }, [searchParams]);

  const handleSendMail = async ({ axiosConfig, ...formSubmitParams } = {}) => {
    const sendStatus = await handleFormSubmitHelper({
      formSchema: z.object({
        email: z
          .string({ required_error: "Email is required" })
          .email("Invalid email address"),
      }),
      formData: { email },
      endPoint: "/v1/attachment/offer-letter",
      setSubmitStatus: setSubmitStatus,
      axiosConfig: {
        headers: { "Content-Type": "application/json" },
        ...axiosConfig,
      },

      onSubmitStart(status) {
        setSubmitStatus({ ...status, title: "Sending Application Details..." });
      },
      ...formSubmitParams,
    });

    console.log("Send Status", sendStatus);
  };

  const handlePaymentVerification = async (formSubmitParams) => {
    const verifyStatus = await handleFormSubmitHelper({
      method: "get",
      endPoint: `/verify?${searchParams.toString()}`,
      setSubmitStatus: setSubmitStatus,

      onSubmitStart(status) {
        setSubmitStatus({ ...status, title: "Verifying Payment..." });
      },
      ...formSubmitParams,
    });

    console.log("Verification Status", verifyStatus);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    handlePaymentVerification({
      onSuccess(formStatus) {
        if (!formStatus.response.data?.verified) {
          setSubmitStatus({
            status: "error",
            errorTitle: "Error verifying payment",
            error: (
              <>
                <strong>Payment not found.</strong>
                If you paid and error persists, pleae contact our customer
                support,
                <em> emergingtechskill@gmail.com</em>
              </>
            ),
          });
        } else {
          handleSendMail();
        }
      },
    });
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
      <form
        method="post"
        className="section flex h-full justify-center items-center"
        onSubmit={handleFormSubmit}
      >
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl text-center">Complete Application</h1>
            </CardTitle>
            <CardDescription className="text-center">
              You are one step to completing your application. Click on the
              button below to verify your payment and receive your onboarding
              details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypeInput
              label="Email"
              placeholder="Enter email address"
              name="email"
              value={email}
              onChange={(value) => {
                setSubmitStatus(null);
                setEmail(value);
              }}
              icon={<Mail />}
              required={true}
              error={
                submitStatus?.status === "form_error"
                  ? submitStatus?.error?.email
                  : null
              }
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="grow"
              disabled={submitStatus?.status === "submitting"}
            >
              Verify and complete
              {submitStatus?.status === "submitting" && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <LoadingDialog
        open={submitStatus?.status === "submitting"}
        title={submitStatus?.title}
      />

      <SuccessDialog
        open={submitStatus?.status === "success"}
        onOpenChange={() => setSubmitStatus(null)}
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
        open={submitStatus?.status === "error"}
        onOpenChange={() => setSubmitStatus(null)}
        title={submitStatus?.errorTitle ?? "Error completing application"}
        description={submitStatus?.errorTitle ? submitStatus?.error : ""}
        classes={{ title: "text-center leading-6" }}
      />
    </>
  );
};

export default VerifyPayment;
