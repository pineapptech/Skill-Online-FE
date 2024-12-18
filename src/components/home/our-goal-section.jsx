"use client";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const textVariants = {
  initial: { y: 50, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
};

const viewMoreVariants = {
  exit: { y: 50, opacity: 0, height: 0 },
  initial: { y: 50, opacity: 0, height: 0 },
  appear: { y: 0, opacity: 1, transition: { delay: 0.3 } },
  slideIn: { height: "auto" },
};

const OurGoalSection = () => {
  const [moreInfo, setMoreInfo] = useState(false);

  return (
    <MotionConfig
      transition={{
        duration: 0.4,
      }}
    >
      <section id="goals" className="our-goal bg-neutral-100 overflow-hidden">
        <div className="container mx-auto grid sm:grid-cols-2 flex-wrap justify-between items-stretch *:basis-0 *:grow gap-4">
          <motion.div
            initial={{ x: -75, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.3, once: true }}
            className="img-wrapper h-64 min-h-full"
          >
            <img
              src="/images/our-goal.png"
              alt="A group of people interacting while working on a laptop"
              className="rounded-xl object-cover w-full h-full"
            />
          </motion.div>
          <motion.div
            initial="initial"
            whileInView="whileInView"
            variants={{
              initial: { x: 75, opacity: 0 },
              whileInView: { x: 0, opacity: 1 },
            }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              staggerChildren: 0.2,
              when: "beforeChildren",
            }}
            viewport={{ amount: 0.3, once: true }}
            className="info rounded-xl bg-neutral-200 p-8 sm:text-justify"
          >
            <motion.h2 variants={textVariants} className="font-bold text-3xl">
              Our Goal
            </motion.h2>
            <motion.p variants={textVariants}>
              We seek to create a robust framework for delivering tuition-free
              Tech Professional Certification programs, specifically in the
              Emerging Technology space.
            </motion.p>
            <motion.p variants={textVariants}>
              The learning platform will be powered by Skillonline - INTERTEK -
              CIRPS, three of the foremost partners of this initiative.
              Participants will be awarded Globally accredited Diploma
              certifications from over 170 international universities under the
              umbrella of Skillonline.
            </motion.p>
            <AnimatePresence>
              {moreInfo && (
                <motion.div
                  initial="initial"
                  exit="exit"
                  animate={["slideIn", "appear"]}
                  variants={viewMoreVariants}
                >
                  <p>
                    Skillonline is an international online education provider,
                    partnering with over 170 universities across Europe, Asia,
                    America and Canada, to deliver specialized distance
                    learning, digital education and upskilling, offering
                    certifications, professional development, and e-learning
                    tools tailored to modern educational needs, in line with the
                    European commission digital framework. They are certified by
                    ACCREDIA, an international Accreditation body, responsible
                    for accrediting organizations involved in testing,
                    inspection, educational and technology upskilling and
                    certification across Europe, America, Asia and Canada.
                  </p>
                  <p>
                    We aim to enroll One Million beneficiaries from Nigeria and
                    other African countries across ten(10) widely sought
                    emerging technology skills, bridging the gap of a lean
                    ecosystem of talents and startups with these skills in
                    Nigeria and Africa as a continent.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              className="text-secondary hover:underline"
              onClick={() => setMoreInfo(!moreInfo)}
            >
              View {moreInfo ? "less" : "more"}
              {moreInfo ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default OurGoalSection;
