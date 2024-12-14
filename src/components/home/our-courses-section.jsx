"use client";
import { useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "motion/react";
import Link from "next/link";

import courses from "@/data/courses";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const OurCoursesSection = () => {
  const scrollRef = useRef(null);
  const [scrollEdge, setScrollEdge] = useState({ start: false, end: false });

  const scrollCourses = (direction) => {
    const scrollarea = scrollRef.current;
    scrollarea.querySelector("[data-radix-scroll-area-viewport]").scrollBy({
      left: scrollarea.clientWidth * direction * 0.5,
      behaviour: "smooth",
    });
  };

  return (
    <motion.section
      initial="initial"
      whileInView="whileInView"
      transition={{ staggerChildren: 0.1 }}
      viewport={{ once: true }}
      className="our-courses"
      id="courses"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            variants={{ initial: { opacity: 0 }, whileInView: { opacity: 1 } }}
            className=""
          >
            Our Courses
          </motion.h2>
          <div className="controls flex justify-end gap-4">
            <Button
              size="icon"
              variant="outline"
              className="prev rounded-full"
              onClick={(e) => scrollCourses(-1)}
              disabled={scrollEdge.start}
            >
              <ChevronLeft className="text-primary" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="next rounded-full"
              onClick={(e) => scrollCourses(1)}
              disabled={scrollEdge.end}
            >
              <ChevronRight className="text-primary" />
            </Button>
          </div>
        </div>

        <ScrollArea
          ref={scrollRef}
          className="rounded-xl shadow-[0_0_5px_5px_rgb(0_0_0_/_0.05)] p-4"
          onScroll={(e) => {
            const sl = e.target.scrollLeft;
            const sw = e.target.scrollWidth;
            const cw = e.target.clientWidth;

            if (sl <= 0 && !scrollEdge.start) {
              setScrollEdge((se) => ({ ...se, start: true }));
            } else if (sl > 0 && scrollEdge.start) {
              setScrollEdge((se) => ({ ...se, start: false }));
            }

            if (sl + cw >= sw && !scrollEdge.end) {
              setScrollEdge((se) => ({ ...se, end: true }));
            } else if (sl + cw < sw && scrollEdge.end) {
              setScrollEdge((se) => ({ ...se, end: false }));
            }
          }}
        >
          <motion.div
            initial="initial"
            whileInView="whileInView"
            transition={{ staggerChildren: 0.1 }}
            viewport={{ amount: 0.2, once: true }}
            className="flex *:shrink-0 gap-12"
          >
            {courses.map((course, index) => (
              <CourseCard key={course.name + index} {...course} />
            ))}
          </motion.div>
          {/* <ScrollBar orientation="horizontal" /> */}
        </ScrollArea>
      </div>
    </motion.section>
  );
};

const CourseCard = ({ name, description, src, alt, href }) => {
  return (
    <motion.div
      variants={{
        initial: { y: 100, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
      }}
      transition={{ duration: 0.3 }}
      className="card p-4 rounded-xl text-sm bg-neutral-100 max-w-72 w-fit flex flex-col"
    >
      <img
        src={src}
        alt={alt || `${name} image`}
        className="rounded-xl w-full max-h-48 object-cover"
      />
      <div className="info">
        <h3 className="capitalize">{name}</h3>
        <p className="description ">{description}</p>
      </div>
      <div className="footer mt-auto">
        <motion.div
          initial="hide"
          whileHover="show"
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-fit"
        >
          <Link
            href={`/register?course=${name.toLowerCase().replaceAll(" ", "-")}`}
            className="relative inline-flex items-center gap-0 border-current group"
          >
            Apply Now
            <ChevronRight className="size-5 transition-all" />
            <motion.div
              variants={{
                hide: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.3 } },
              }}
              className="absolute top-full left-0 w-full h-0.5 bg-current"
            />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OurCoursesSection;
