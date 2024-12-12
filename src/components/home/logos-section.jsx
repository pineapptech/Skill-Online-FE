"use client";
import { useState } from "react";
import { motion, useAnimate } from "motion/react";

const LogosSection = () => {
  const [logos, setLogos] = useState([
    { src: "/images/logos/skillonline.svg", alt: "SkillOnline Logo" },
    { src: "/images/logos/aic.svg", alt: "Accredia, Intertek, CIRPS Logos" },
    { src: "/images/logos/malta.svg", alt: "Malta University Logo" },
    { src: "/images/logos/ibi.jpg", alt: "IBI Logo" },
    {
      src: "/images/logos/enugu-state.png",
      alt: "Enugu State Government Logo",
    },
    { src: "/images/logos/esthub.svg", alt: "Enugu State Tech Hub Logo" },
  ]);
  const [scope, animate] = useAnimate();

  return (
    <section
      ref={scope}
      className="logos bg-primary-foreground relative py-8 px-4 overflow-x-hidden"
    >
      {logos.map(({ src, alt }, index) => (
        <MovingImage
          key={src + index}
          src={src}
          alt={alt}
          delay={(10 / logos.length) * index}
        />
      ))}
    </section>
  );
};

const MovingImage = ({ src, alt, delay }) => {
  return (
    <motion.img
      initial={{ left: "-100%" }}
      animate={{ left: "100vw" }}
      transition={{ duration: 10, ease: "linear", repeat: Infinity, delay }}
      src={src}
      alt={alt}
      className="absolute top-0 left-0 h-8"
    />
  );
};
export default LogosSection;
