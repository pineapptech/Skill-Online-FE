import React, { useEffect } from "react";
import { motion, stagger, useAnimate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const Test = () => {
  const [scope, animate] = useAnimate();

  const animateFunc = async () => {
    await animate([
      [".seq", { opacity: [0, 1], y: [50, 0] }, { delay: stagger(1) }],
    ]);
  };
  useEffect(() => {
    animateFunc();
  });
  return (
    <div ref={scope} onClick={animateFunc}>
      <p className={cn("seq")}>One</p>
      <p className={cn("seq")}>Two</p>
      <div>
        <p className={cn("seq")}>Three</p>
      </div>
    </div>
  );
};

export default Test;
