import { motion, useInView } from "motion/react";
import { useRef } from "react";

const transition = {
  duration: 0.4,
  staggerChildren: 0.2,
  delayChildren: 0.5,
  when: "beforeChildren",
};

const fadeBottom = {
  out: { y: 50, opacity: 0, transition: { duration: 0.4 } },
  in: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const OurGoalSection = () => {
  return (
    <motion.section
      className="our-goal bg-neutral-200 p-8 py-12 overflow-hidden"
      initial="out"
      whileInView="in"
      transition={transition}
    >
      <div className="container mx-auto flex justify-between items-stretch *:basis-0 *:grow gap-4">
        <motion.div
          variants={{
            out: { x: -50, opacity: 0 },
            in: { x: 0, opacity: 1 },
          }}
          transition={transition}
          className="img-wrapper"
        >
          <img
            src="/images/our-goal.png"
            alt="A woman holding a tablet with a smile"
            className="rounded-xl w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          variants={{
            in: { x: 0, opacity: 1 },
            out: { x: 50, opacity: 0 },
          }}
          transition={transition}
          initial="out"
          whileInView="in"
          className="info rounded-xl bg-neutral-300 p-8 text-sm leading-6 *:mb-4 "
        >
          <motion.h2 variants={fadeBottom} className="font-bold text-3xl">
            Our Goal
          </motion.h2>
          <motion.p variants={fadeBottom}>
            We seek to create a robust framework for delivering tuition-free
            Tech Professional Certification programs, specifically in the
            Emerging Technology space.
          </motion.p>
          <motion.p variants={fadeBottom}>
            The learning platform will be powered by Skillonline - INTERTEK -
            CIRPS, three of the foremost partners of this initiative.
            Participants will be awarded Globally accredited Diploma
            certifications from another prime partner of this upskilling
            initiative, The University of Malta.
          </motion.p>
          <motion.p variants={fadeBottom}>
            Our objectives is to enroll One Million beneficiaries from Nigeria
            and other African countries across ten(10) widely sought emerging
            technology skills, bridging the gap of a lean ecosystem of talents
            and startups with these skills in Nigeria and Africa as a continent.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurGoalSection;
