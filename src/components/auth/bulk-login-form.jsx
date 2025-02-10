"use client";
import React, { useState } from "react";
import { AllInput } from "../form-elements";
import { Button } from "@/components/ui/button";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import ErrorDialog from "@/components/ui/error-dialog";
import SuccessDialog from "@/components/ui/success-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inputs = [
  {
    label: "Email Address",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "........",
  },
].map((input) => ({
  ...input,
  required: true,
  classes: {
    input: `${
      input.type !== "file"
        ? "py-6 border-0 shadow-none rounded-none focus-visible:ring-0"
        : ""
    } border-b border-neutral-500 ${input.classes?.input}`,
  },
}));

const BulkLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formSchema = z.object({
      email: z.string().min(1, { message: "Email is required" }),
      password: z.string().min(1, { message: "Password is required" }),
    });

    handleFormSubmitHelper({
      formSchema,
      formData,
      endPoint: "/v1/bulk-admin/auth",
      setSubmitStatus,
      axiosConfig: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      onSuccess(formStatus) {
        localStorage.setItem("token", formStatus.response.data.token);
        setTimeout(() => router.push("/admin"), 1000);
      },
      onError(formStatus) {
        console.log("Error creating bulk", formStatus);
      },
    });
  };

  const lookingForRegisteration = (
    <Link
      href="/auth/bulk/create"
      className="text-center text-blue-400 hover:underline"
    >
      Don&apos;t have a bulk? Click here to create one
    </Link>
  );

  return (
    <form className="section" method="post" onSubmit={handleFormSubmit}>
      <div className="container mx-auto">
        <h1 className="text-3xl text-center mb-12">Bulk Admin Login</h1>
        <div className="max-w-[800px] mx-auto flex flex-col gap-4">
          {lookingForRegisteration}
          <AllInput
            inputs={inputs}
            formData={formData}
            setFormData={setFormData}
            className="p-4 rounded-lg bg-neutral-50 border"
            errors={submitStatus?.status === "form_error" && submitStatus.error}
          />
          <Button
            size="xl"
            className="w-full"
            type="submit"
            disabled={submitStatus?.status === "submitting"}
          >
            Login
            {submitStatus?.status === "submitting" && (
              <Loader2 className="animate-spin" />
            )}
          </Button>
          {lookingForRegisteration}
        </div>
      </div>

      <SuccessDialog
        open={submitStatus?.status === "success"}
        onOpenChange={() => {
          setSubmitStatus(null);
        }}
        title="Bulk Login Successful"
        description={submitStatus?.response?.data?.message || ""}
        controls={
          <Button className="mx-auto">
            <Link href="/admin">Go to bulk management</Link>
          </Button>
        }
      />
      <ErrorDialog
        open={submitStatus?.status === "error"}
        onOpenChange={() => {
          setSubmitStatus(null);
        }}
        title="Login Failed"
        description={
          submitStatus?.error ||
          "An Error Occured. Try again. If error persists, contact us."
        }
        classes={{ body: "text-center" }}
      />
    </form>
  );
};

export default BulkLoginForm;
