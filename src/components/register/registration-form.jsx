import React, { useEffect, useRef, useState } from "react";
import courses from "@/data/courses";
import { AllInput } from "../form-elements";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const inputs = [
  {
    label: "Select a course",
    type: "select",
    placeholder: "Select a course you want to register for",
    name: "course",
    options: courses.map((course) => ({
      label: course.name,
      value: course.name.toLowerCase().replaceAll(" ", "-"),
    })),
  },
  {
    label: "Unique Reg Number",
    name: "regNumber",
    placeholder: "This will automatically be generated for you",
    inputProps: {
      readOnly: true,
    },
    classes: { input: "italic cursor-not-allowed" },
  },
  {
    type: "flex",
    items: [
      { label: "Surname", name: "surname", placeholder: "Enter your surname" },
      {
        label: "First name",
        name: "firstname",
        placeholder: "Enter your first name",
      },
    ],
  },
  {
    label: "Gender",
    name: "gender",
    options: ["Gay"],
    placeholder: "Select your gender",
  },
  { label: "Email Address", name: "email", placeholder: "Enter your email" },
  {
    label: "Phone Number",
    name: "phone",
    placeholder: "Enter your phone number",
  },
  {
    label: "State/Country",
    name: "state",
    placeholder: "Enter your state or country residence",
  },
  { label: "Province", name: "province", placeholder: "Enter your province" },
  { label: "City", name: "city", placeholder: "Enter your City of residence" },
  {
    label: "Passport ID/National ID",
    name: "id",
    placeholder: "Enter your Passport/National ID number",
  },
  { label: "Passport ID/National ID", name: "idImage", type: "file" },
].map((input) => ({
  ...input,
  required: true,
  classes: {
    input: `${input.type !== "file" ? "p-6" : ""} ${input.classes?.input}`,
  },
}));

const RegistrationForm = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    course: searchParams.get("course") ?? "",
  });
  const [submitStatus, setSubmitStatus] = useState();
  const [rand, setRand] = useState(Math.random);

  useEffect(() => {
    if (!formData.course) return;

    setFormData((fd) => ({
      ...fd,
      regNumber: `ETSAP/SO/${fd.course
        .split("-")
        .map((s) => s[0]?.toUpperCase())
        .join("")}/${Math.floor(rand * 90000 + 10000)}`,
    }));
  }, [formData.course, rand]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic coming soon...

    setSubmitStatus({ status: "success" });
  };

  return (
    <form className="p-8" onSubmit={handleFormSubmit}>
      <div className="container mx-auto">
        <h1 className="text-3xl text-center mb-12">Application Form</h1>
        <div className="max-w-[800px] mx-auto flex flex-col gap-4">
          <AllInput
            inputs={inputs}
            formData={formData}
            setFormData={setFormData}
            className="p-4 rounded-lg shadow bg-neutral-50"
            errors={submitStatus?.status === "form_error" && submitStatus.error}
          />
          <Button className="w-full">Submit</Button>
        </div>
      </div>

      <Dialog
        open={submitStatus?.status === "success"}
        onOpenChange={() => {
          setSubmitStatus(null);
          setFormData({});
        }}
      >
        <DialogContent>
          <DialogHeader>
            <motion.svg
              whileInView="draw"
              animate="draw"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-circle-check self-center size-16 text-green-500 fill-transparent"
            >
              <motion.path
                variants={{
                  draw: { pathLength: [0, 1], transition: { duration: 0.5 } },
                }}
                d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
              />
              <motion.path
                variants={{
                  draw: { pathLength: [0, 1], transition: { duration: 0.5 } },
                }}
                d="M9 12l2 2l4 -4"
              />
            </motion.svg>
            <DialogTitle className="self-center my-2">
              Registration Successful
            </DialogTitle>
            <DialogDescription>
              {submitStatus?.message ??
                "Check your email for necessary documents"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button>
              <Link href="/">Go to homepage</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default RegistrationForm;
