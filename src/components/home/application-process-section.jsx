"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const processList = [
  {
    name: "Fill Application form",
    description: "Fill out the application form with the required information",
  },
  {
    name: "Receive Application Confirmation",
    description: "Receive a Confirmation of your application via email",
  },
  {
    name: "Application Review and Processing",
    description: "Your application will be reviewed and processed promptly.",
  },
  {
    name: "Receive Admission letter & Onboarding Credentials",
    description:
      "Check your email for admission letter, Onboarding details and unique student ID.",
  },
  {
    name: "Begin Your Upskilling Journey",
    description:
      "Complete the onboarding process and start your journey towards upskilling.",
  },
];

const ApplicationProcessSection = () => {
  return (
    <section className="application-process flex flex-col gap-8 bg-neutral-100 py-8">
      <div className="container mx-auto">
        <h2>Application Process</h2>
      </div>

      <div className="grid grid-flow-col gap-8">
        <div className="img-wrapper self-start basis-1/2 rounded-e-full overflow-hidden">
          <img
            src="/images/application-process.png"
            alt="Application Process Image"
            className="w-full h-full object-cover"
            style={{
              clipPath:
                "path(M0 0H491C617.473 0 720 102.527 720 229C720 355.473 617.473 458 491 458H0V0Z)",
            }}
          />
        </div>
        <ul className="info flex flex-col gap-4 basis-1/2 pr-8">
          {processList.map(({ name, description }, index) => (
            <motion.li
              key={name}
              className="my-2 rounded-md p-4 bg-neutral-200 group flex gap-4 items-center "
              style={{
                marginLeft: `calc(${Math.abs(index * 2 - 4) * -10}px)`,
              }}
              initial="hide"
              whileHover="show"
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <div
                className="number size-8 flex justify-center items-center rounded-full shrink-0 bg-slate-950 text-white"
                style={{
                  clipPath:
                    "path(M0 0H491C617.473 0 720 102.527 720 229C720 355.473 617.473 458 491 458H0V0Z)",
                }}
              >
                {index + 1}
              </div>
              <div className="">
                <h4>{name}</h4>
                <motion.p
                  variants={{
                    show: { height: "auto" },
                    hide: { height: 0 },
                  }}
                  className="transition-transform overflow-hidden origin-top duration-500"
                >
                  {description}
                </motion.p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
      <Button className="mx-auto container max-w-[500px] md:p-6">
        <Link href="/register">Apply Now</Link>
      </Button>
    </section>
  );
};

export default ApplicationProcessSection;
