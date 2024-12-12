import React, { useEffect, useState } from "react";
import { motion, stagger, useAnimate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const fadeBottom = {
  out: { y: 50, opacity: 0, transition: { duration: 0.4 } },
  in: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const slideLeft = {
  out: { x: -50, opacity: 0, transition: { duration: 0.4 } },
  in: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

const scaleIn = {
  out: { scale: 0.3, opacity: 0, transition: { duration: 0.4 } },
  in: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
};
const HeroSection = () => {
  const [scope, animate] = useAnimate();
  const mapSize = useMotionValue(50);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    animateFunc();
  }, [rerender]);

  const animateFunc = async () => {
    await animate([
      [".hero-img", scaleIn.in],
      [".fade-bottom:not(.divider)", fadeBottom.in, { delay: stagger(0.1) }],
      [".core-partners .divider", fadeBottom.in, { delay: stagger(0.1) }],
      [".partners .divider", fadeBottom.in, { delay: stagger(0.1) }],
      [".core-partners p", slideLeft.in, { delay: stagger(0.1) }],
      [".partners p", slideLeft.in, { delay: stagger(0.1) }],
    ]);
  };

  if (rerender)
    return (
      <section
        ref={scope}
        onClick={() => {
          setRerender(false);
          animateFunc();
        }}
      >
        rerender
      </section>
    );

  return (
    <section
      ref={scope}
      onClick={() => {
        setRerender(true);
        // setTimeout(() => setRerender(false, 3000));
      }}
      className={cn("hero p-8 md:px-24 relative bg-primary-foreground")}
    >
      <div className="absolute top-0 -left-4 size-[170px] md:bg-[url(/images/circuit.svg)] bg-no-repeat bg-[length:170px_170px] " />
      <div className="container mx-auto flex justify-between gap-4">
        <div className="info w-3/5 grow leading-10">
          <motion.h1
            initial={fadeBottom.out}
            className={cn(
              "relative overflow-hidden font-extrabold text-4xl md:text-6xl 2xl:text-8xl py-4 ",
              "fade-bottom"
            )}
          >
            Emerging tech skills for{" "}
            <span className="text-secondary">Africa</span> Program
            <div className="img-bg absolute top-0 right-0 bottom-0 w-[296px] h-[296px] bg-[url(/images/circuit.svg)] bg-cover bg-no-repeat bg-right" />
          </motion.h1>

          <motion.p
            initial={fadeBottom.out}
            className="text-gray-500  my-4 text-lg fade-bottom"
          >
            A transformative initiative hosted by
          </motion.p>
          <div className="core-partners grid grid-flow-col font-bold tracking-wider">
            {["SkillOnline", "ACCREDIA", "Intertek", "CIRPS"].map(
              (item, index) => (
                <>
                  {index !== 0 && (
                    <motion.div
                      initial={fadeBottom.out}
                      className="divider fade-bottom h-full w-0.5 bg-current"
                    />
                  )}
                  <motion.p
                    initial={slideLeft.out}
                    key={index}
                    className="core-partner"
                  >
                    {item}
                  </motion.p>
                </>
              )
            )}
          </div>
          <motion.p
            initial={fadeBottom.out}
            className="fade-bottom text-xs xl:text-base font-medium mt-1"
          >
            A European consortium supported by the EU
          </motion.p>

          <motion.p
            initial={fadeBottom.out}
            className="fade-bottom text-gray-500  my-4 text-lg"
          >
            In partnership with
          </motion.p>
          <div className="partners grid grid-flow-col font-bold tracking-wider">
            {[
              "International Bio-research institute",
              "Enugu State TECH HUB - Enugu state GOVERNMENT, NIGERIA",
            ].map((item, index) => (
              <>
                {index !== 0 && (
                  <motion.div
                    initial={fadeBottom.out}
                    className="fade-bottom divider fade-bottom h-full w-0.5 bg-current"
                  />
                )}
                <motion.p
                  initial={slideLeft.out}
                  key={index}
                  className="partner flex items-center justify-center capitalize text-left leading-4 px-4 first:pl-0"
                >
                  {item}
                </motion.p>
              </>
            ))}
          </div>
        </div>
        <div className="img grow self-start">
          <motion.img
            initial={scaleIn.out}
            src="/images/map-of-africa.svg"
            alt="Image of map of Africa"
            className="hero-img"
          />
        </div>
      </div>
      <div className="img-bg absolute right-0 bottom-0 -z-10 w-[387px] h-20 md:h-[186px] bg-[url(/images/circuit-2.svg)] bg-cover bg-no-repeat bg-right" />
    </section>
  );
};

export default HeroSection;
