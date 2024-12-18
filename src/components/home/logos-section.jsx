"use client";
import { Fragment, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const LogosSection = () => {
  const [logos, setLogos] = useState([
    {
      src: "/images/logos/skillonline.svg",
      alt: "SkillOnline Logo",
      height: "20px",
    },
    [
      {
        src: "/images/logos/accredia.svg",
        alt: "Accredia Logo",
        height: "100%",
      },
      {
        src: "/images/logos/intertek.svg",
        alt: "Intertek Logo",
        height: "100%",
      },
    ],
    { src: "/images/logos/cirps.svg", alt: "CIRPS Logos", height: "100%" },
    { src: "/images/logos/ibi.jpg", alt: "IBI Logo", height: "60px" },
    [
      {
        src: "/images/logos/enugu-state.png",
        alt: "Enugu State Government Logo",
        height: "100%",
      },
      {
        src: "/images/logos/esthub.svg",
        alt: "Enugu State Tech Hub Logo",
        height: "100%",
      },
    ],
  ]);

  return (
    <section className="logos revert p-8 md:px-24 mx-auto container ">
      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{ amount: 1, once: true, margin: "-60px 0px" }}
        className="logos-wrapper flex flex-wrap gap-4 items-center justify-center md:justify-between"
      >
        {logos.map((item, index) => {
          return (
            <Fragment key={Array.isArray(item) ? item[0].src : item.src}>
              {index !== 0 && (
                <motion.div
                  variants={{
                    initial: { opacity: 0 },
                    whileInView: { opacity: 1 },
                  }}
                  className="divider w-0.5 h-8 shrink-0 bg-primary/50"
                />
              )}
              {Array.isArray(item) ? (
                <div className="flex gap-2">
                  {item.map((logo) => (
                    <MovingImage key={logo.src} {...logo} />
                  ))}
                </div>
              ) : (
                <MovingImage key={item.src} {...item} />
              )}
            </Fragment>
          );
        })}
      </motion.div>
    </section>
  );
};

const MovingImage = ({ src, alt, width, height, className }) => {
  return (
    <motion.img
      variants={{
        initial: { y: 60, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
      }}
      transition={{
        duration: 0.4,
      }}
      src={src}
      alt={alt}
      style={{
        width,
        height,
      }}
      className={cn("logo max-h-12", className)}
    />
  );
};
export default LogosSection;
