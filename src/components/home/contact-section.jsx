"use client";
import React, { useEffect, useState } from "react";
import { Loader2, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stagger, useAnimate, useInView } from "motion/react";
import { AllInput } from "../form-elements";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { z } from "zod";
import MotionCheck from "../icon/check";
import { cn } from "@/lib/utils";
import MotionX from "../icon/x";

const formAnimation = {
  initial: { x: 30, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
};

const ContactSection = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.5 });
  const [formData, setFormData] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (isInView) {
      animate(
        ".form-element",
        { x: [30, 0], opacity: [0, 1] },
        { duration: 0.3, delay: stagger(0.1) }
      );
    }
  }, [isInView]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formStatus = await handleFormSubmitHelper({
      formSchema: z.object({
        email: z
          .string({
            required_error: "Email is required",
          })
          .email("Invalid email address"),
        name: z.string({ required_error: "Name is required" }),
        message: z.string({ required_error: "Message is required" }),
      }),
      formData,
      endPoint: "/coming-soon",
      setSubmitStatus,
      onError() {
        setSubmitStatus({ status: "success" });
        setTimeout(setSubmitStatus, 3000, null);
      },
    });
  };

  return (
    <section id="contact" className="bg-neutral-100">
      <div className="container mx-auto">
        <h2 className="my-0">Get In Touch With Us</h2>
        <p className="mb-8">
          Connecting Beyond Boundaries: Reach Out and Get in Touch with Us
          Today.
        </p>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="info basis-2/5 space-y-4 [&_p]:mb-2 text-sm sm:text-base">
            <div className="email-section flex gap-2">
              <Mail className="text-primary shrink-0 mt-px" />
              <div className="email-info text-sm sm:text-base">
                <h3 className="text-primary m-0">Email Address</h3>
                <p>emergingtechskill@gmail.com</p>
                <p>enugutechhub@enugustate.gov.ng</p>
              </div>
            </div>
            <div className="location-section flex gap-4">
              <MapPin className="text-primary shrink-0 mt-px" />
              <div className="location-info">
                <h3 className="text-primary m-0">Location</h3>
                <p>
                  International Bioresearch Institute Nigerian office, along
                  Ugwogo, Enugu state, Nigeria
                </p>
                <p>
                  Enugu State Technology Hub NO 2 Upper Presidential road,
                  Independence Layout Enugu, Nigeria
                </p>
              </div>
            </div>
          </div>
          <hr className="border-primary md:hidden" />
          <form
            ref={scope}
            onSubmit={handleFormSubmit}
            method="post"
            className="contact-form basis-2/5 flex flex-col gap-4 overflow-x-hidden"
          >
            <AllInput
              inputs={[
                { name: "name", placeholder: "Full Name" },
                { name: "email", placeholder: "Email Address" },
                {
                  name: "message",
                  type: "textarea",
                  placeholder: "Message",
                },
              ].map((input) => ({
                ...input,
                classes: {
                  main: "form-element opacity-0",
                  input: cn(
                    "bg-neutral-200 rounded-md w-full p-4 focus-visible:ring-0 h-auto",
                    input.classes?.input
                  ),
                },
              }))}
              formData={formData}
              setFormData={setFormData}
              errors={
                submitStatus?.status === "form_error" && submitStatus?.error
              }
            />
            <Button
              size="lg"
              type="submit"
              className={cn(
                "form-element opacity-0 transition-all",
                submitStatus?.status === "success" &&
                  "bg-green-500 !opacity-90",
                submitStatus?.status === "error" && "bg-red-500 !opacity-90",
                submitStatus?.status === "submitting" && "!opacity-50"
              )}
              disabled={
                submitStatus?.status && submitStatus?.status !== "form_error"
              }
            >
              {submitStatus?.status === "submitting" ? (
                <>
                  Sending...
                  <Loader2 className="animate-spin" />
                </>
              ) : submitStatus?.status === "success" ? (
                <>
                  Message Sent
                  <MotionCheck />
                </>
              ) : submitStatus?.status === "error" ? (
                <>
                  Error sending message
                  <MotionX />
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
