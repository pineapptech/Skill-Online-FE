import React from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import LogosSection from "@/components/logos-section";
import OurGoalSection from "@/components/our-goal-section";
import GetStartedSection from "@/components/get-started-section";
import OurCoursesSection from "@/components/our-courses-section";
import ApplicationProcessSection from "@/components/application-process-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Newsletter from "@/components/newsletter";

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
      <AboutSection />
      <ContactSection />
      <Newsletter />
    </>
  );
};

export default Homepage;
