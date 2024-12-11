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
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconCircleCheck, IconCircleCheckFilled } from "@tabler/icons-react";
import { motion, useAnimate, useInView } from "motion/react";
import { Link } from "react-router";

const inputs = [
  {
    label: "Select a course",
    type: "select",
    placeholder: "Select a course you want to register for",
    name: "course",
    options: courses.map((course) => course.name),
  },
  { label: "Surname", name: "surname", placeholder: "Enter your surname" },
  {
    label: "First name",
    name: "firstname",
    placeholder: "Enter your first name",
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
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ status: "success" });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic coming soon...

    setSubmitStatus({ status: "success" });
  };

  return (
    <form className="p-8" onSubmit={handleFormSubmit}>
      <div className="container mx-auto">
        <h1 className="text-3xl text-center">Application Form</h1>
        <div className="flex flex-col gap-4">
          <AllInput
            inputs={inputs}
            formData={formData}
            setFormData={setFormData}
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
            <DialogDescription>{submitStatus?.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button>
              <Link to="/">Go to homepage</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default RegistrationForm;
