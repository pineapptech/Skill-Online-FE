"use client";
import { useState } from "react";
import { Loader2, Mail, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { TypeInput } from "../form-elements";
import { cn } from "@/lib/utils";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { z } from "zod";
import MotionCheck from "../icon/check";
import MotionX from "../icon/x";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubscription = async (e) => {
    e.preventDefault();

    const formStatus = await handleFormSubmitHelper({
      formSchema: z.object({
        email: z
          .string({
            required_error: "Email is required",
          })
          .email("Invalid email address"),
      }),
      formData: { email },
      endPoint: "/coming-soon",
      setSubmitStatus,
      onError() {
        setSubmitStatus({ status: "success" });
        setTimeout(setSubmitStatus, 3000, null);
      },
    });
  };

  return (
    <section
      className="newsletter text-white"
      style={{
        background:
          "url(/images/newsletter-bg.svg) fixed no-repeat center center / cover",
      }}
    >
      <div className="container flex flex-col items-center text-center">
        <Rss className="size-20 text-neutral-400 mb-4" />
        <h2>SUBSCRIBE TO NEWSLETTER</h2>
        <p>News . Opportunities . Information . & More </p>
        <form
          onSubmit={handleSubscription}
          method="post"
          className="flex flex-col sm:flex-row gap-4 my-4"
        >
          <TypeInput
            classes={{
              input: "placeholder:current text-black bg-white pl-9 h-12",
              label: "hidden",
              error: "sm:text-left",
            }}
            icon={<Mail />}
            placeholder="Email Address"
            inputProps={{ size: 50 }}
            name="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              if (submitStatus?.status === "form_error") setSubmitStatus(null);
            }}
            error={
              submitStatus?.status === "form_error" && submitStatus?.error.email
            }
          />
          <Button
            size="lg"
            type="submit"
            className={cn(
              "mx-auto w-[80%] sm:w-auto h-12 border border-white/50",
              submitStatus?.status === "success" && "bg-green-500 !opacity-90",
              submitStatus?.status === "error" && "bg-red-500 !opacity-90",
              submitStatus?.status === "submitting" && "!opacity-50"
            )}
            disabled={
              submitStatus?.status && submitStatus?.status !== "form_error"
            }
          >
            {submitStatus?.status === "submitting" ? (
              <>
                Subcribing...
                <Loader2 className="animate-spin" />
              </>
            ) : submitStatus?.status === "success" ? (
              <>
                <MotionCheck />
              </>
            ) : submitStatus?.status === "error" ? (
              <>
                Subscription failed
                <MotionX />
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
