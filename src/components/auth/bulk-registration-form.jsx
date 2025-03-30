"use client";
import React, { useEffect, useState } from "react";
import courses from "@/data/courses";
import { AllInput } from "../form-elements";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { createZodSchema, handleFormSubmitHelper } from "@/lib/form-utils";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import ErrorDialog from "@/components/ui/error-dialog";
import SuccessDialog from "@/components/ui/success-dialog";
import Link from "next/link";

const inputs = [
  {
    label: "Select a course",
    type: "select",
    placeholder: "Select a course you want to register for",
    name: "course",
    options: courses.map((course) => ({
      label: course.name,
      value: course.name,
    })),
  },
  {
    label: "Bulk ID",
    name: "bulkId",
    placeholder: "Enter Bulk ID provided to you",
  },
  {
    label: "Unique Reg Number",
    name: "regNo",
    placeholder: "This will automatically be generated for you",
    inputProps: {
      readOnly: true,
    },
    classes: { input: "italic cursor-not-allowed" },
  },
  {
    label: "Full Name",
    name: "fullname",
    placeholder: "Enter your fullname",
  },
  {
    label: "Email Address",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Gender",
    type: "select",
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Non-binary", value: "other" },
    ],
    placeholder: "Select your gender",
  },
  { label: "Province", name: "province", placeholder: "Enter your province" },
  { label: "Address", name: "address", placeholder: "Enter your address" },
  {
    label: "I agree",
    placeholder:
      "Skillonline will use your data only for application processing and onboarding purposes.",
    type: "checkbox",
    name: "agreement",
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

const BulkRegistrationForm = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    course:
      courses.find((course) => course.id === searchParams.get("course"))
        ?.name ?? "",
    bulkId: searchParams.get("id") ?? "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [rand, setRand] = useState(Math.random);

  useEffect(() => {
    if (!formData.course) return;

    setFormData((fd) => ({
      ...fd,
      regNo: `ETSAP/SO/${
        courses.find((course) => course.name === fd.course).id
      }/${Math.floor(rand * 90000 + 10000)}`,
    }));
  }, [formData.course, rand]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formSchema = createZodSchema(inputs).extend({
      agreement: z.literal(true, {
        errorMap: () => ({
          message: "You must agree to the terms and conditions",
        }),
      }),
      email: z.string().email({ message: "Invalid email address" }),
      regNo: z.string().optional(),
    });

    const formStatus = await handleFormSubmitHelper({
      formSchema,
      formData,
      endPoint: "/v1/bulk-admin/create-user",
      setSubmitStatus,
      axiosConfig: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      onError(formStatus) {
        console.log("Error registering under bulk", formStatus);
        // Filter and handle unhandled/unfriendly backend errors
        const issueField = Object.keys(formData).find((formField) =>
          formStatus.error.includes(formField)
        );

        if (formStatus.error.includes("duplicate key") && issueField) {
          setSubmitStatus({
            ...formStatus,
            error: `User with ${issueField}: ${formData[issueField]} already exists.`,
          });
        }
      },
    });

    if (formStatus.status === "success") {
      localStorage.setItem(
        "_auth",
        JSON.stringify(formStatus?.response?.data?.user)
      );
    }
  };

  return (
    <form className="section" method="post" onSubmit={handleFormSubmit}>
      <div className="container mx-auto">
        <h1 className="text-3xl text-center mb-12">Bulk Registration Form</h1>
        <div className="max-w-[800px] mx-auto flex flex-col gap-4">
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
            Register
            {submitStatus?.status === "submitting" && (
              <Loader2 className="animate-spin" />
            )}
          </Button>
        </div>
      </div>

      <SuccessDialog
        open={submitStatus?.status === "success"}
        onOpenChange={() => {
          setSubmitStatus(null);
        }}
        title="Registration Successful"
        description=""
        body={
          <>
            Thank you for registering with us, we are excited that you have
            taken this milestone step towards acquiring you tech emerging skill,
            we are currently processing your application so you&apos;ll receive
            your admission letter and your onboarding details shortly. In the
            mean time, kindly join our{" "}
            <Link
              href="https://discord.gg/3x7yPdjW"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              discord community
            </Link>{" "}
            to be part of our community.
          </>
        }
        controls={
          <div className="flex grow gap-4 justify-between">
            <Button variant="outline">
              <Link href="/">Back to homepage</Link>
            </Button>
            <Button>
              <Link
                href="https://discord.gg/3x7yPdjW"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to discord
              </Link>
            </Button>
          </div>
        }
      />
      <ErrorDialog
        open={submitStatus?.status === "error"}
        onOpenChange={() => {
          setSubmitStatus(null);
        }}
        title="Registration Failed"
        description={
          submitStatus?.error ||
          "An Error Occured. Try again. If error persists, contact us."
        }
        classes={{ body: "text-center" }}
      />
    </form>
  );
};

export default BulkRegistrationForm;
