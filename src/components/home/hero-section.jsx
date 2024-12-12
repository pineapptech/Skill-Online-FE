"use client";
import React, { Fragment, useEffect, useState } from "react";
import { motion, stagger, useAnimate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const fadeBottom = {
  out: { y: 50, opacity: 0 },
  in: {
    y: 0,
    opacity: 1,
  },
};

const slideLeft = {
  out: { x: -50, opacity: 0 },
  in: { x: 0, opacity: 1 },
};

const scaleIn = {
  out: { scale: 0.3, opacity: 0 },
  in: { scale: 1, opacity: 1 },
};

const HeroSection = () => {
  const [scope, animate] = useAnimate();

  const animateFunc = async () => {
    await animate([
      [".backdrop", scaleIn.in],
      [".hero-img", scaleIn.in],
      [
        "h1.fade-bottom, h1.fade-bottom * ",
        fadeBottom.in,
        { delay: stagger(0.03) },
      ],
      ["p.fade-bottom:nth-of-type(1)", fadeBottom.in, { delay: stagger(0.1) }],
      [".core-partners .divider", fadeBottom.in, { delay: stagger(0.1) }],
      [".core-partners p", slideLeft.in, { delay: stagger(0.1) }],
      ["p.fade-bottom:nth-of-type(2)", fadeBottom.in, { delay: stagger(0.1) }],
      ["p.fade-bottom:nth-of-type(3)", fadeBottom.in, { delay: stagger(0.1) }],
      [".partners .divider", fadeBottom.in, { delay: stagger(0.1) }],
      [".partners p", slideLeft.in, { delay: stagger(0.1) }],
    ]);

    animate(
      ".hero-text-bg",
      { rotate: 360 },
      { duration: 60, repeat: Infinity, ease: "linear" }
    );
  };

  useEffect(() => {
    animateFunc();
  });

  return (
    <section ref={scope} className={cn("hero p-8 md:px-24 relative")}>
      <div className="absolute -top-1 left-4 size-[300px] md:bg-[url(/images/circuit-3.svg)] bg-no-repeat bg-contain" />
      <div className="container mx-auto flex justify-between gap-4">
        <div className="info w-3/5 grow z-10">
          <motion.h1
            initial={fadeBottom.out}
            className={cn(
              "relative overflow-hidden font-extrabold leading-10 text-4xl md:text-6xl 2xl:text-8xl py-4 ",
              "fade-bottom",
              "flex gap-4 flex-wrap",
              "xl:mb-16"
            )}
          >
            {"Emerging tech skills for *Africa* Program"
              .split(" ")
              .map((item, index) => (
                <motion.div
                  key={item + index}
                  className={cn(
                    "flex",
                    item.startsWith("*") && "text-secondary"
                  )}
                >
                  {item
                    .replaceAll("*", "")
                    .split("")
                    .map((letter, index) => (
                      <motion.span
                        key={letter + index}
                        initial={fadeBottom.out}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                </motion.div>
              ))}
            <div className="hero-text-bg absolute top-0 right-0 bottom-0 w-[296px] h-[296px] bg-[url(/images/circuit.svg)] bg-cover bg-no-repeat bg-right" />
          </motion.h1>

          <motion.p
            initial={fadeBottom.out}
            className="text-gray-500  my-4 text-lg fade-bottom"
          >
            A transformative initiative hosted by
          </motion.p>
          <div className="core-partners font-header grid  grid-flow-col items-center font-bold tracking-wider">
            {["SkillOnline", "ACCREDIA", "Intertek", "CIRPS"].map(
              (item, index) => (
                <Fragment key={item + index}>
                  {index !== 0 && (
                    <motion.div
                      initial={fadeBottom.out}
                      className="divider fade-bottom h-4/5 w-0.5 bg-current"
                    />
                  )}
                  <motion.p
                    initial={slideLeft.out}
                    key={index}
                    className="core-partner"
                  >
                    {item}
                  </motion.p>
                </Fragment>
              )
            )}
          </div>
          <motion.p
            initial={fadeBottom.out}
            className="fade-bottom text-xs xl:text-base font-medium "
          >
            A European consortium supported by the EU
          </motion.p>

          <motion.p
            initial={fadeBottom.out}
            className="fade-bottom text-gray-500  my-4 text-lg"
          >
            In partnership with
          </motion.p>
          <div className="partners font-header w-[700px] capitalize flex justify-between font-bold tracking-wider">
            {[
              "International Bio-research institute",
              "Enugu State TECH HUB - Enugu state GOVERNMENT, NIGERIA",
            ].map((item, index) => (
              <Fragment key={item + index}>
                {index !== 0 && (
                  <motion.div
                    initial={fadeBottom.out}
                    className="fade-bottom divider fade-bottom  h-8 shrink-0 w-0.5 bg-current"
                  />
                )}
                <motion.p
                  initial={slideLeft.out}
                  key={index}
                  className="partner flex items-center justify-center uppercase text-left leading-4 px-4 first:pl-0"
                >
                  {item}
                </motion.p>
              </Fragment>
            ))}
          </div>
        </div>
        <motion.div
          whileHover="hover"
          initial="initial"
          className="img relative w-2/5 grow self-start"
          variants={{ hover: { scale: 1.1 } }}
        >
          <motion.div
            initial={{ ...scaleIn.out }}
            variants={{
              hover: {
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(0, 51, 255, 0.24) 84.5%, rgba(11, 19, 51, 0) 100%)",
              },
            }}
            style={{
              ...scaleIn.out,
              position: "absolute",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(11, 19, 51, 0.18) 59%, rgba(11, 19, 51, 0) 100%)",
              filter: "blur(100px)",
            }}
            className="backdrop w-full h-full"
          />
          <motion.img
            initial={scaleIn.out}
            src="/images/map-of-africa.svg"
            alt="Image of map of Africa"
            className="hero-img relative z-10"
          />
        </motion.div>
      </div>
      <div className="img-bg absolute right-0 bottom-0 -z-10 w-[387px] h-20 md:h-[186px] bg-[url(/images/circuit-2.svg)] bg-cover bg-no-repeat bg-right" />
    </section>
  );
};

export default HeroSection;
