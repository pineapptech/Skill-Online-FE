"use client";
import { inView, motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";

const OurGoalSection = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    inView(
      "#goals",
      (info) => {
        const el = (selector) => info.target.querySelectorAll(`${selector}`);
        animate([
          [el(".img-wrapper"), { x: 0, opacity: 1 }],
          [el(".info"), { x: 0, opacity: 1 }],
          [el(".info *"), { y: 0, opacity: 1 }, { delay: stagger(0.2) }],
        ]);
      },
      { amount: 0.3 }
    );
  });

  return (
    <motion.section
      ref={scope}
      id="goals"
      className="our-goal bg-neutral-200 p-8 md:px-24 overflow-hidden"
    >
      <div className="container mx-auto flex justify-between items-stretch *:basis-0 *:grow gap-4">
        <motion.div initial={{ x: -75, opacity: 0 }} className="img-wrapper">
          <img
            src="/images/our-goal.png"
            alt="A woman holding a tablet with a smile"
            className="rounded-xl w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ x: 75, opacity: 0 }}
          className="info rounded-xl bg-neutral-300 p-8 leading-6 *:mb-4"
        >
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            className="font-bold text-3xl"
          >
            Our Goal
          </motion.h2>

          <motion.p initial={{ y: 50, opacity: 0 }}>
            We seek to create a robust framework for delivering tuition-free
            Tech Professional Certification programs, specifically in the
            Emerging Technology space.
          </motion.p>
          <motion.p initial={{ y: 50, opacity: 0 }}>
            The learning platform will be powered by Skillonline - INTERTEK -
            CIRPS, three of the foremost partners of this initiative.
            Participants will be awarded Globally accredited Diploma
            certifications from over 170 international universities under the
            umbrella of Skillonline.
          </motion.p>
          <motion.p initial={{ y: 50, opacity: 0 }}>
            Skillonline is an international online education provider,
            partnering with over 170 universities across Europe, Asia, America
            and Canada, to deliver specialized distance learning, digital
            education and upskilling, offering certifications, professional
            development, and e-learning tools tailored to modern educational
            needs and are proudly supported by the European Union(EU). They are
            certified by ACCREDIA, an international Accreditation body,
            responsible for accrediting organizations involved in testing,
            inspection, educational and technology upskilling and certification
            across Europe, America, Asia and Canada.
          </motion.p>
          <motion.p initial={{ y: 50, opacity: 0 }}>
            We aim to enroll One Million beneficiaries from Nigeria and other
            African countries across ten(10) widely sought emerging technology
            skills, bridging the gap of a lean ecosystem of talents and startups
            with these skills in Nigeria and Africa as a continent.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurGoalSection;
