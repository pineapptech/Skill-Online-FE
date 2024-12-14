"use client";
import React, { useEffect } from "react";
import { Clock5, FileX, Rocket, SquareCheckBig } from "lucide-react";
import {
  motion,
  useAnimate,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";

const list = [
  {
    content: "10 emerging technology courses",
    icon: (
      <svg
        width={17}
        height={28}
        viewBox="0 0 17 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.9474 12.1269V1.43854C16.9474 0.647344 16.1847 0 15.2526 0H1.69474C0.762632 0 0 0.647344 0 1.43854V12.1269C0 12.6304 0.305052 13.1051 0.830421 13.3641L7.91442 16.9748L6.23663 20.341L2.47432 20.6143C1.69474 20.6718 1.38968 21.463 1.96589 21.8802L4.83 23.9805L3.96568 27.1165C3.79621 27.7351 4.59274 28.2242 5.23674 27.8933L8.47368 26.2246L11.7106 27.8789C12.3546 28.2098 13.1512 27.7207 12.9817 27.1021L12.1174 23.9661L14.9815 21.8658C15.5407 21.4487 15.2526 20.6575 14.49 20.5999L10.7277 20.3266L9.0499 16.9604L16.1339 13.3497C16.6423 13.1051 16.9474 12.6448 16.9474 12.1269ZM10.1684 14.7163L8.47368 15.5794L6.77895 14.7163V1.43854H10.1684V14.7163Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    content: "2 learning sessions per week (1 and half hours per session)",
    icon: (
      <svg
        width={29}
        height={29}
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.3333 10.3287V18.6574M2 14.4931V14.5069M27 14.4931V14.5069M14.5 26.9861V27M8.25 3.66574V3.67962M20.75 25.3204V25.3343M8.25 25.3204V25.3343M3.66667 20.7396V20.7535M25.3333 20.7396V20.7535M3.66667 8.24653V8.26041M25.3472 8.28401C24.253 6.37463 22.6737 4.78795 20.7689 3.68449C18.8642 2.58103 16.7016 1.99994 14.5 2M14.5 13.1049V15.8812C14.5 16.6175 14.7927 17.3236 15.3136 17.8443C15.8345 18.3649 16.5411 18.6574 17.2778 18.6574C18.0145 18.6574 18.721 18.3649 19.242 17.8443C19.7629 17.3236 20.0556 16.6175 20.0556 15.8812V13.1049C20.0556 12.3686 19.7629 11.6625 19.242 11.1418C18.721 10.6212 18.0145 10.3287 17.2778 10.3287C16.5411 10.3287 15.8345 10.6212 15.3136 11.1418C14.7927 11.6625 14.5 12.3686 14.5 13.1049Z"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    content: "Fully virtual classes",
    icon: (
      <svg
        width={28}
        height={20}
        viewBox="0 0 28 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.72795 19C3.54605 17.8181 2.60851 16.415 1.96886 14.8708C1.32922 13.3265 1 11.6715 1 10C1 8.32854 1.32922 6.67345 1.96886 5.12923C2.60851 3.585 3.54605 2.18189 4.72795 1M22.728 1C23.9099 2.18189 24.8474 3.585 25.487 5.12923C26.1267 6.67345 26.4559 8.32854 26.4559 10C26.4559 11.6715 26.1267 13.3265 25.487 14.8708C24.8474 16.415 23.9099 17.8181 22.728 19M8.72733 15.0006C8.07052 14.344 7.54951 13.5644 7.19404 12.7064C6.83857 11.8484 6.65561 10.9287 6.65561 10C6.65561 9.07126 6.83857 8.15162 7.19404 7.2936C7.54951 6.43559 8.07052 5.656 8.72733 4.99937M18.7286 4.99937C19.3854 5.656 19.9064 6.43559 20.2619 7.2936C20.6173 8.15162 20.8003 9.07126 20.8003 10C20.8003 10.9287 20.6173 11.8484 20.2619 12.7064C19.9064 13.5644 19.3854 14.344 18.7286 15.0006M15.1422 10C15.1422 10.3751 14.9932 10.7348 14.7279 11C14.4627 11.2652 14.103 11.4142 13.728 11.4142C13.3529 11.4142 12.9932 11.2652 12.728 11C12.4627 10.7348 12.3137 10.3751 12.3137 10C12.3137 9.62493 12.4627 9.26522 12.728 9.00001C12.9932 8.73479 13.3529 8.58579 13.728 8.58579C14.103 8.58579 14.4627 8.73479 14.7279 9.00001C14.9932 9.26522 15.1422 9.62493 15.1422 10Z"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    content: "Weekly hands-on task + Capstone project",
    icon: <SquareCheckBig />,
  },
  { content: "6 months duration (26 weeks)", icon: <Clock5 /> },
  {
    content:
      "Application form registration closes Midnight (WAT), January 31st 2025 ",
    icon: <FileX />,
  },
  {
    content: "Online course sessions starts on Monday, February 3rd 2025",
    icon: <Rocket />,
  },
];

const GetStartedSection = () => {
  const [scope, animate] = useAnimate();
  const scrollHalf = useScroll({
    target: scope,
    offset: ["start end", "end end"],
  });
  const radientScale = useTransform(
    scrollHalf.scrollYProgress,
    [0.75, 1],
    [1, 15]
  );
  const lightDrop = useTransform(
    scrollHalf.scrollYProgress,
    [0.4, 0.8],
    ["-50%", "0%"]
  );
  const glassSlide = useTransform(
    scrollHalf.scrollYProgress,
    [0.4, 0.8],
    ["0%", "33%"]
  );

  return (
    <section
      ref={scope}
      className="get-started relative max-w-[100vw] overflow-hidden text-primary-foreground bg-transparent"
    >
      <div className="container mx-auto">
        <div className="flex gap-4">
          <div className="info basis-2/3">
            <h2 className="">Get started today!</h2>
            <p>
              To participate in this groundbreaking program, candidates are
              required to apply for any of the courses and pay a one-time
              application fee of 5,000 Naira (or its dollar equivalent). The
              application is processed instantly and candidate receives an
              admission letter and onboarding credentials into their desired
              course
            </p>
            <h3>Full tuition-free scholarship</h3>
            <p>
              The program offers a full tuition-free scholarship on ALL ten
              emerging technology courses offered for one million beneficiaries
              from Nigeria and other African countries
            </p>
            <h3>The program dynamics are:</h3>

            <motion.ul
              className="space-y-6 relative pl-6 py-px"
              initial="initial"
              whileInView="whileInView"
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.div
                className="line absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-secondary to-[#3333]"
                variants={{
                  initial: { height: 0 },
                  whileInView: { height: "100%" },
                }}
                transition={{ duration: 0.3 * list.length, type: "spring" }}
              />
              {list.map(({ content, icon }, index) => (
                <motion.li
                  key={content + index}
                  className="flex items-center gap-2 mb-3"
                  variants={{
                    initial: { opacity: 0, x: -50 },
                    whileInView: { opacity: 1, x: 0 },
                  }}
                >
                  {icon}
                  {content}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div className="img-wrapper relative basis-1/3 -mt-8 md:-mt-12">
            <motion.img
              src="/images/string-light.svg"
              alt="A light bulb"
              className="h-2/3 mx-auto relative z-10"
              style={{
                top: lightDrop,
              }}
            />
            <motion.div
              style={{
                width: 40,
                height: 40,
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(46, 88, 255, 0.3) 77.5%, rgba(11, 19, 51, 0) 100%)",
                y: "-50%",
                scale: radientScale,
              }}
              className="radient mx-auto blur-sm pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      <div className="bg-wrapper absolute inset-0 bg-primary -z-30">
        <motion.div
          className="glass-bg absolute inset-0 backdrop-blur-3xl"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            right: glassSlide,
          }}
          transition={{ duration: 3 }}
          viewport={{ once: true }}
        >
          <StarLight />
          <StarLight />
        </motion.div>
      </div>
    </section>
  );
};

const StarLight = () => {
  const [scope, animate] = useAnimate();
  const dimension = useMotionValue("100px");
  const x = useMotionValue("70%");
  const y = useMotionValue("100%");

  const transition = (func) => ({
    duration: Math.random() * 4 + 4,
    onComplete: func,
  });

  const aD = () =>
    animate(dimension, `${Math.random() * 300 + 50}px`, transition(aD));
  const aX = () => animate(x, `${Math.random() * 100}%`, transition(aX));
  const aY = () => animate(y, `${Math.random() * 100}%`, transition(aY));

  useEffect(() => {
    const animations = [aD, aX, aY].map((anime) => anime());
    return () => animations.map((anime) => anime.cancel());
  });

  return (
    <motion.div
      ref={scope}
      className="gradient-ball absolute blur-lg"
      style={{
        width: dimension,
        height: dimension,
        left: x,
        top: y,
        background:
          // rgba(46, 88, 255, 0.1)
          "radial-gradient(50% 50% at 50% 50%,  hsl(var(--secondary) / 0.3) 77.5%, rgba(11, 19, 51, 0) 100%)",
      }}
    />
  );
};

export default GetStartedSection;
