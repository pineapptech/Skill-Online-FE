import React from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import LogosSection from "@/components/logos-section";
import OurGoalSection from "@/components/our-goal-section";
import GetStartedSection from "@/components/get-started-section";
import OurCoursesSection from "@/components/our-courses-section";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LogosSection />
      <OurGoalSection />
      <GetStartedSection />
      <OurCoursesSection />
    </>
  );
};

export default Homepage;
