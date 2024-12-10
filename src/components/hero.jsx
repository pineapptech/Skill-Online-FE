import React, { useEffect } from "react";
import { motion, useAnimate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const h1BgRotate = useMotionValue(0);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const h1BgRotateControl = animate(h1BgRotate, 360, {
      duration: 180,
      repeat: Infinity,
    });

    return () => {
      h1BgRotateControl.stop();
    };
  });

  return (
    <section
      ref={scope}
      className={cn(
        "hero relative bg-primary-foreground",
        "md:bg-[url(/images/circuit.svg)] bg-no-repeat bg-[length:200px_200px] bg-[left_-50px_top_10px]"
      )}
    >
      <div className="container mx-auto py-8 px-4 flex justify-between gap-4">
        <div className="info w-2/3 leading-10">
          <h1
            className={cn(
              "relative overflow-hidden font-extrabold text-4xl md:text-6xl 2xl:text-8xl py-4 "
            )}
          >
            Emerging tech skills for{" "}
            <span className="text-secondary">Africa</span> Program
            <motion.div
              className="img-bg absolute top-0 right-0 bottom-0 w-[296px] h-[296px] bg-[url(/images/circuit.svg)] bg-cover bg-no-repeat bg-right"
              style={{ rotate: h1BgRotate }}
            />
          </h1>

          <p className="text-gray-500  my-4 text-lg">
            A transformative initiative hosted by
          </p>
          <div className="flex divide-x-2 font-bold tracking-wider">
            {["SkillOnline", "ACCREDIA", "intertek", "CIRPS"].map(
              (item, index) => (
                <p key={index} className="px-4 first:pl-0 last:pr-0">
                  {item}
                </p>
              )
            )}
          </div>
          <p className="text-xs xl:text-base font-medium">
            A European consortium supported by the EU
          </p>

          <p className="text-gray-500  my-4 text-lg">In partnership with</p>
          <div className="flex divide-x-2 font-bold tracking-wider">
            {[
              "University of Malta in Southern Europe",
              "International ",
              "Bio-research institute",
              "Enugu State TECH HUB - Enugu state GOVERNMENT, NIGERIA",
            ].map((item, index) => (
              <p
                key={index}
                className="flex items-center justify-center text-left text-xs px-4 first:pl-0"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="img w-1/3">
          <img
            src="/images/individual-standing-with-a-laptop.png"
            alt="individual standing with a laptop on a yellow background"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="img-bg absolute right-0 bottom-0 -z-10 w-[387px] h-20 md:h-[186px] bg-[url(/images/circuit-2.svg)] bg-cover bg-no-repeat bg-right" />
    </section>
  );
};

export default HeroSection;
