"use client";
import {
  motion,
  scroll,
  stagger,
  useAnimate,
  useInView,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const processList = [
  {
    id: "one",
    name: "Fill Application form",
    description: "Fill out the application form with the required information",
  },
  {
    id: "two",
    name: "Receive Application Confirmation",
    description: "Receive a Confirmation of your application via email",
  },
  {
    id: "three",
    name: "Application Review and Processing",
    description: "Your application will be reviewed and processed promptly.",
  },
  {
    id: "four",
    name: "Receive Admission letter & Onboarding Credentials",
    description:
      "Check your email for admission letter, Onboarding details and unique student ID.",
  },
  {
    id: "five",
    name: "Begin Your Upskilling Journey",
    description:
      "Complete the onboarding process and start your journey towards upskilling.",
  },
];

const listShifts = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-2",
  "col-start-1",
];

const MotionButton = motion.create(Button);

const ApplicationProcessSection = () => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { amount: 0.4, once: true });

  useEffect(() => {
    if (inView) {
      animate([
        [".img-overlay", { left: "100%" }, { duration: 0.5 }],
        [
          ".application-img",
          { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
          { at: "<" },
        ],
        [
          ".info li, .info .accordion-item",
          { x: 0, opacity: 1 },
          { delay: stagger(0.1), duration: 0.4 },
        ],
      ]);
    }
  }, [inView, animate]);

  return (
    <section
      ref={scope}
      className="application-process flex flex-col gap-6 bg-neutral-100"
    >
      <div className="container mx-auto">
        <h2 className="text-center sm:text-left">Application Process</h2>
      </div>

      <Steps animate={animate} />
      <StepsMobile />

      <MotionButton
        whileHover={{ maxWidth: "800px" }}
        className="mx-auto container max-w-[700px] p-7 rounded-2xl md:rounded-md"
        asChild
      >
        <Link href="/auth">Get Started</Link>
      </MotionButton>
    </section>
  );
};

const itemVariants = {
  show: { height: "auto", visibility: "visible" },
  hide: { height: 0, visibility: "hidden" },
};

const Steps = ({ animate }) => {
  return (
    <div className="section-escape-x hidden md:grid grid-cols-2 grid-flow-col gap-4">
      <div className="img-wrapper relative overflow-hidden w-full h-[550px]">
        <motion.div className="img-overlay absolute inset-0 bg-neutral-100" />
        <img
          src="/images/application-process.png"
          alt="Application Process Image"
          className="application-img w-full h-full object-cover rounded-full"
        />
      </div>
      <ul className="info self-center grid grid-cols-12 gap-4 pr-8">
        {processList.map(({ name, description }, index) => (
          <motion.li
            key={name}
            className={cn(
              "col-span-10 grid grid-cols-6 grid-flow-col gap-4 my-2 rounded-md p-4 bg-neutral-200 outline-1 focus:outline",
              listShifts?.[index]
            )}
            tabIndex={0}
            style={{ x: -30, opacity: 0 }}
            initial="hide"
            whileHover="show"
            onFocus={(e) => {
              animate(
                e.target.querySelector(".dropdown-content"),
                itemVariants.show
              );
            }}
            onBlur={(e) => {
              animate(
                e.target.querySelector(".dropdown-content"),
                itemVariants.hide
              );
            }}
            layout
          >
            <div className="number col-span-1 size-8 flex justify-center items-center rounded-full shrink-0 bg-slate-950 text-white">
              {index + 1}
            </div>
            <div className="self-center col-span-5">
              <h4 className="">{name}</h4>
              <motion.p
                variants={itemVariants}
                className="dropdown-content transition-transform m-0 overflow-hidden origin-top duration-500"
              >
                {description}
              </motion.p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const MotionAccordionItem = motion.create(AccordionItem);
const StepsMobile = () => {
  return (
    <div className="grid md:hidden gap-4">
      <div className="img-wrapper relative overflow-hidden w-full h-48 rounded-lg">
        <motion.div className="img-overlay absolute inset-0 bg-neutral-100" />
        <img
          src="/images/application-process.png"
          alt="Application Process Image"
          className="application-img w-full h-full object-cover"
        />
      </div>

      <Accordion type="multiple" className="info flex flex-col gap-4">
        {processList.map(({ id, name, description }, index) => (
          <MotionAccordionItem
            key={id}
            value={id}
            className="my-2 rounded-2xl bg-neutral-200 accordion-item"
            style={{ x: -30, opacity: 0 }}
          >
            <AccordionHeader>
              <AccordionTrigger className="group text-sm grid grid-cols-6 items-center w-full px-4 py-2">
                <div className="number col-span-1 size-8 flex justify-center items-center rounded-full shrink-0 bg-primary text-white">
                  {index + 1}
                </div>

                <div className="col-span-4 justify-self-start text-left text-primary/80">
                  {name}
                </div>
                <ChevronDown className=" size-4 justify-self-end group-data-[state=open]:rotate-180 transition-transform duration-300" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent
              className="group overflow-hidden  text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
              data-content-id={id}
            >
              <div className="grid grid-cols-6 w-full pb-4 pr-4 group-data-[state=open]:pt-2 border-primary/50 group-data-[state=open]:border-t">
                <div className="col-start-2 col-end-7">{description}</div>
              </div>
            </AccordionContent>
          </MotionAccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ApplicationProcessSection;
