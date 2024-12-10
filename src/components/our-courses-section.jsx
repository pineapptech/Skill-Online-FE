import { ScrollArea, ScrollBar } from "@/components/ui/sroll-area";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";

const courses = [
  {
    name: "Cyber security",
    description:
      "Gain essential skills to protect systems and networks from cyber threats, focusing on risk management and security protocols.",
    src: "/images/courses/cyber-security.png ",
    alt: "Cyber Security Image",
  },
  {
    name: "Virtual Reality, Augmented Reality, and Mixed Reality",
    description:
      "Explore immersive technologies that merge digital and physical worlds to create engaging user experiences",
    src: "/images/courses/virtual-reality.png",
  },
  {
    name: "CGI Animation",
    description:
      "Dive into computer-generated imagery to master techniques for creating stunning visual effects and animations for film and games",
    src: "/images/courses/cgi.png",
  },
  {
    name: "3D Animation",
    description:
      "Learn the fundamentals of 3D modeling and animation, bringing characters and environments to life with dynamic storytelling.",
    src: "/images/courses/3d-animation.png",
  },
  {
    name: "2D Animation",
    description:
      "Discover the art of 2D animation, focusing on traditional and digital techniques to create captivating animated sequences.",
    src: "/images/courses/2d-animation.png",
  },
  {
    name: "Business Intelligence Analysis",
    description:
      "Learn to analyze data and generate insights that drive strategic decision-making within organizations.",
    src: "/images/courses/business.png",
  },
  {
    name: "Agile Scrum Product Management",
    description:
      "Master Agile and Scrum framework to manage product development and boost team collaboration",
    src: "/images/courses/agile.png",
  },
  {
    name: "Product Design for Agile and Kanban Environments",
    description:
      "Discover best practices for designing products in Agile and Kanban settings, focusing on user-centered design.",
    src: "/images/courses/product-design.png",
  },
];

const OurCoursesSection = () => {
  const scrollRef = useRef(null);

  const scrollCourses = (direction = 1) => {
    const scrollarea = scrollRef.current;
    scrollarea.querySelector("[data-radix-scroll-area-viewport]").scrollBy({
      left: scrollarea.clientWidth * direction - 40,
      behaviour: "smooth",
    });
  };

  return (
    <section className="our-courses py-8">
      <div className="container mx-auto">
        <h2>Our Courses</h2>

        <div className="controls flex justify-end gap-2 my-2">
          <button
            className="prev bg-gray-300 hover:bg-gray-400 active:bg-gray-500 disabled:bg-gray-200 rounded-full size-8 flex justify-center items-center p-1.5"
            onClick={(e) => scrollCourses(-1)}
          >
            <IconChevronLeft />
          </button>
          <button
            className="next bg-gray-300 hover:bg-gray-400 active:bg-gray-500 disabled:bg-gray-200 rounded-full size-8 flex justify-center items-center p-1.5"
            onClick={(e) => scrollCourses(1)}
          >
            <IconChevronRight />
          </button>
        </div>

        <ScrollArea ref={scrollRef} className="container ">
          <div className="flex *:shrink-0 gap-6">
            {courses.map((course) => (
              <CourseCard {...course} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

const CourseCard = ({ name, description, src, alt, href }) => {
  return (
    <div className="card p-4 rounded-xl bg-neutral-100 max-w-80 w-fit flex flex-col">
      <img
        src={src}
        alt={alt || `${name} image`}
        className="rounded-xl w-full max-h-64 object-cover"
      />
      <div className="info ">
        <h3 className="capitalize">{name}</h3>
        <p className="description">{description}</p>
      </div>
      <div className="footer pt-2 mt-auto">
        <motion.div
          initial="hide"
          whileHover="show"
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-fit"
        >
          <Link
            to={href}
            className="relative inline-flex items-center gap-0 border-current group"
          >
            Apply Now <IconChevronRight className="size-5 transition-all" />
            <motion.div
              variants={{
                hide: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.3 } },
              }}
              className="absolute top-full left-0 w-full h-0.5 bg-current "
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OurCoursesSection;
