import React from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import LogosSection from "@/components/logos-section";
import OurGoalSection from "@/components/our-goal-section";
import GetStartedSection from "@/components/get-started-section";
import OurCoursesSection from "@/components/our-courses-section";
import ApplicationProcessSection from "@/components/application-process-section";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LogosSection />
      <OurGoalSection />
      <GetStartedSection />
      <OurCoursesSection />
      <ApplicationProcessSection />
    </>
  );
};

export default Homepage;
