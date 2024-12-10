import {
  IconAccessPoint,
  IconCalendarX,
  IconClock,
  IconMedal2,
  IconRocket,
  IconSquareRoundedCheck,
  IconTimeDuration10,
} from "@tabler/icons-react";
import { motion } from "motion/react";

const list = [
  { content: "10 emerging technology courses", icon: <IconMedal2 /> },
  {
    content: "2 learning sessions per week (1 and half hours per session)",
    icon: <IconTimeDuration10 />,
  },
  {
    content: "Fully virtual classes",
    icon: <IconAccessPoint />,
  },
  {
    content: "Weekly hands-on task + Capstone project",
    icon: <IconSquareRoundedCheck />,
  },
  { content: "6 months duration (26 weeks)", icon: <IconClock /> },
  {
    content:
      "Application form registration closes Midnight (WAT), January 31st 2025 ",
    icon: <IconCalendarX />,
  },
  {
    content: "Online course sessions starts on Monday, February 3rd 2025",
    icon: <IconRocket />,
  },
];

const GetStartedSection = () => {
  return (
    <section className="get-started bg-secondary-foreground text-primary-foreground py-12 p-8">
      <div className="container mx-auto leading-6 font-normal">
        <div className="flex gap-4">
          <div className="info basis-2/3">
            <h2 className="font-medium  text-3xl mb-4">Get started today!</h2>
            <p>
              To participate in this groundbreaking program, candidates are
              required to apply for any of the courses and pay a one-time
              application fee of 5,000 Naira (or its dollar equivalent). The
              application is processed instantly and candidate receives an
              admission letter and onboarding credentials into their desired
              course
            </p>
            <h3 className="font-medium text-xl my-4">
              Full tuition-free scholarship
            </h3>
            <p>
              The program offers a full tuition-free scholarship on ALL ten
              emerging technology courses offered for one million beneficiaries
              from Nigeria and other African countries
            </p>
            <h3 className="font-medium text-xl my-4">
              The program dynamics are:
            </h3>

            <ul>
              {list.map(({ content, icon }, index) => (
                <li
                  key={content + index}
                  className="flex items-center gap-2 mb-3"
                >
                  {icon}
                  {content}
                </li>
              ))}
            </ul>
          </div>

          <motion.div className="img-wrapper basis-1/3">
            <img
              src="/images/our-goal.png"
              alt="A woman holding a tablet with a smile"
              className="rounded-xl w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
