"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { z } from "zod";
import { Copy, Loader2 } from "lucide-react";
import ErrorDialog from "@/components/ui/error-dialog";
import SuccessDialog from "@/components/ui/success-dialog";
import { AllInput } from "@/components/form-elements";
import { toast } from "sonner";

const PromoCodePage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formSchema = z.object({
      fullName: z.string().min(1, { message: "Full name is required" }),
      email: z.string().email({ message: "Invalid email address" }),
    });

    const formStatus = await handleFormSubmitHelper({
      formSchema,
      formData,
      endPoint: "/v1/promo/create-promo",
      setSubmitStatus,
      axiosConfig: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Promo Code</CardTitle>
          <CardDescription>
            Enter the recipient&apos;s details to generate a promo code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <AllInput
              inputs={[
                {
                  label: "Full Name",
                  placeholder: "Enter full name",
                  name: "fullName",
                },
                {
                  label: "Email",
                  placeholder: "Enter email address",
                  name: "email",
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              errors={
                submitStatus?.status === "form_error" && submitStatus.error
              }
            />

            <Button
              type="submit"
              className="w-full"
              disabled={submitStatus?.status === "submitting"}
            >
              {submitStatus?.status === "submitting" ? (
                <>
                  Generating
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Generate Promo Code"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <SuccessDialog
        open={submitStatus?.status === "success"}
        onOpenChange={() => {
          setSubmitStatus(null);
        }}
        title="Success"
        description={
          <>
            Promo code generated successfully
            <div className="mt-2 flex items-center justify-center gap-2">
              <code className="rounded bg-muted text-black px-2 py-1">
                {submitStatus?.response?.data?.data?.promoCode}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(
                    submitStatus?.response?.data?.data?.promoCode
                  );
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </>
        }
      />

      <ErrorDialog
        open={submitStatus?.status === "error"}
        onOpenChange={() => {
          setSubmitStatus(null);
        }}
        title="Error"
        description={
          submitStatus?.error ||
          "Failed to generate promo code. Please try again."
        }
        classes={{ body: "text-center" }}
      />
    </div>
  );
};

export default PromoCodePage;
