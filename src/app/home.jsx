import React from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import LogosSection from "@/components/logos-section";
import OurGoalSection from "@/components/our-goal-section";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LogosSection />
      <OurGoalSection />
    </>
  );
};

export default Homepage;
