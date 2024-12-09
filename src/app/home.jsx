import React, { useEffect } from "react";
import { motion, useAnimate } from "motion/react";

const Homepage = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const anime = async () => {
      await animate(scope.current, { x: 0 }, { duration: 0.5 });
      await animate(".motion-text", { y: 0 });
    };

    anime();
  });

  return (
    <motion.div
      initial={{ x: -1000 }}
      ref={scope}
      className="container w-fit mx-auto mt-48 text-5xl text-center text-blue-500"
    >
      Bootstrapped with tailwindcss, react-router and{" "}
      <motion.span initial={{ y: -1000 }} className="motion-text inline-block">
        motion
      </motion.span>
    </motion.div>
  );
};

export default Homepage;
