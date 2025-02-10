import React from "react";
import HeroSection from "@/components/home/hero-section";
import LogosSection from "@/components/home/logos-section";
import OurGoalSection from "@/components/home/our-goal-section";
import OurCoursesSection from "@/components/home/our-courses-section";
import ApplicationProcessSection from "@/components/home/application-process-section";
import AboutSection from "@/components/home/about-section";
import ContactSection from "@/components/home/contact-section";
import Newsletter from "@/components/home/newsletter";
import GetStartedSection from "@/components/home/get-started-section";
import Footer from "@/components/footer";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <LogosSection />
      <OurGoalSection />
      <GetStartedSection />
      <OurCoursesSection />
      <ApplicationProcessSection />
      <AboutSection />
      <ContactSection />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Homepage;
